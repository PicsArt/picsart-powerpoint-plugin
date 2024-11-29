import { TOKEN_ERR, BALANACE_ENDP, GENERATE_IMAGES_ENDP, HEADER_API_KEY_NAME, INFERENCES_ENDP, PICSART_URL, PICSART_URL_GENERAL } from "@constants/index";
import { getApiKey } from "@helpers/index";
import { validateResponse } from "@utils/Validation";

export const processImage = async (formObj: { formData: FormData; url: string }): Promise<RequestsResponse> => {
    try {
      let { formData, url } = formObj;
      const response = await fetch(url, {
        method: "POST",
        headers: { [HEADER_API_KEY_NAME]: getApiKey() },
        body: formData,
      });
  
      const res = await response.json();
      const validatedRes = validateResponse(res)
      if (!validatedRes.success)  {
        console.log(validatedRes);
        return validatedRes;
      }
  
      const imageResponse = await fetch(res.data.url);
      const blob = await imageResponse.blob();
      
      return {
        success: true,
        msg: 'OK',
        data: blob
      };

    } catch (error) {
      return {
        success : false,
        msg: error
      };
    }
};



export const getBalance = async () => {
    try {
      if (!getApiKey()) {
        return {
          success: false,
          msg : TOKEN_ERR
        }
      }
      const response = await fetch(PICSART_URL + BALANACE_ENDP, {
        headers: { [HEADER_API_KEY_NAME]: getApiKey() }
      });
      
      const data = await response.json();
      
      return {
        success: true,
        msg: data.credits
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || 'An error occurred'
      };
    }
};


export const isValidKeyRequest = async (key : string) : Promise<boolean> => {
    try {
      const response = await fetch(PICSART_URL + BALANACE_ENDP, {
        headers: { [HEADER_API_KEY_NAME]: key }
      });
      const res = await response.json();
  
      if (res.message === TOKEN_ERR) {
        return false;
      }
      return true;
    } catch (error) {
      return error;
    }
}

export async function getImagesFromText(text : string) {
    const negative_prompt = ""; // just for now
  
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        [HEADER_API_KEY_NAME] : getApiKey(),
      },
      body: JSON.stringify({prompt: text, negative_prompt})
    };
  
    try {
      const responseOfId = await fetch(PICSART_URL_GENERAL + GENERATE_IMAGES_ENDP, options)
      const res = await responseOfId.json();
      if (res.status == "ACCEPTED")  {
        const headers = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            [HEADER_API_KEY_NAME] : getApiKey(),
          },
        }
  
        const { inference_id } = res;
        return new Promise((resolve, reject) =>  {
          setTimeout(() => { 
            const intervalId = setInterval(async () => {
              try {
                    const responseOfImages = await fetch(PICSART_URL_GENERAL + GENERATE_IMAGES_ENDP + "/" + INFERENCES_ENDP + `/${inference_id}`,  headers);
                    const resOfImages = await responseOfImages.json();
                    if (resOfImages?.status == "FINISHED") {
                      clearInterval(intervalId);
                      resolve(resOfImages.data)
                    } else {
                      console.log("fail", resOfImages.status);
                    }
              } catch (error) {
                  reject(error);
                }
            }, 1000)
          }, 4000)
        });
        
      } else {
        return {
          success: false,
          msg : res.detail
        };
      } 
    } catch(error) {
      return {
        sucess: false,
        msg : error
      };
    }
}