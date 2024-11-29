import { INCOMPATIBLE_FIELDS, TOKEN_ERR } from "@constants/index";

export const validateResponse = (res : any ) : RequestsResponse => {
    if (res.message == TOKEN_ERR) {
        return {
            success : false,
            msg : res.detail,
            errorCode : TOKEN_ERR,
        };
      }
    if (res.message == INCOMPATIBLE_FIELDS) {
        return {
            success : false,
            msg : res.detail,
            errorCode : INCOMPATIBLE_FIELDS,
        };
    }
    
    return {
        success: true,
        msg : "OK"
    }
}