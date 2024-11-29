import { processImage } from "@api/index";

export const extractBytesFromFile = async (file: File) : Promise<ArrayBuffer> =>  {
    const reader = new FileReader();
    return new Promise ((res) => {
        reader.onloadend = () => {
            res(reader.result as ArrayBuffer);
        }
        reader.readAsArrayBuffer(file);
    })
} 

export const processImageAndDraw = async (formObj: { formData: FormData, url: string }): Promise<RequestsResponse> => {
  const res = await processImage(formObj);
  const blob = res.data;

  if (blob instanceof Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(",")[1];
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => { drawImageOnSlide(base64data, img) };
    };
    reader.readAsDataURL(blob);

    return {
      success: true,
      msg: "Image successfulyy fetched",
      data: blob 
    };

  } 
  return res;
};

export const drawImageFromUrlOnSlide = async (imageUrl: string) : Promise<void> => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error();

        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = (reader.result as string).split(',')[1];

            const img = new Image();
            img.src = URL.createObjectURL(blob);

            img.onload = () => {
                drawImageOnSlide(base64data, img);
            }
        }

        reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error drawing image from URL on PowerPoint slide:", error);
    }
}

export const drawImageOnSlide = (base64data : string, img : HTMLImageElement) => {
    Office.context.document.setSelectedDataAsync(base64data, {
        coercionType: Office.CoercionType.Image,
        imageWidth: img.width / 3,
        imageHeight: img.height / 3,
    }, (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.error("Error inserting image into PowerPoint:", asyncResult.error.message);
        }
    });
}


