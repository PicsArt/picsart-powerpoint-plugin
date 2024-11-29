import { PICSART_URL, REMOVEBG_ENDP, UPSCALE_ENDP } from "@constants/url";

export const makeFormAndURLForUpscale = async (imageBytes : ArrayBuffer, params) => {
    const { scaleFactor, format } = params;
    const imageBinary = new Blob([new Uint8Array(imageBytes)], { type: "image/jpeg"});
  
    const formData = new FormData();
    formData.append("upscale_factor", scaleFactor || "2");
    formData.append("format", format || "PNG");
    formData.append("image", imageBinary);
  
    return {
      formData,
      url : PICSART_URL + UPSCALE_ENDP
    }
}

export const makeFormAndURLForRemoveBackground = async (actions: Action[], imageBytes : ArrayBuffer ) => {
  const imageBinary = new Blob([new Uint8Array(imageBytes)], { type: "image/jpeg"});
  const formData = new FormData();

  actions.forEach(element => {
    if (element.value) {
      formData.append(element.actionName, element.value);
    }
  });
  formData.append("size", "auto");
  formData.append("image", imageBinary);

  return {
    formData,
    url : PICSART_URL + REMOVEBG_ENDP
  }
}
