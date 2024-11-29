import { isValidKeyRequest } from "@api/index";

export function saveApiKey(apiKey: string) {
    try {
      localStorage.setItem("apiKey", apiKey);
    } catch (error) {
      console.log("Error saving API key: " + error);
    }
  }
  
export function getApiKey() {
    try {
        return  localStorage.getItem("apiKey");
    } catch (error) {
        return null;
    }
}

export const isValidKey = async (key : string) : Promise<boolean> => {
    return isValidKeyRequest(key);
};
  
export const isLocalKeyValid = async () : Promise<boolean> => {
    if (!getApiKey()) return false;
    return isValidKeyRequest(getApiKey());
};
