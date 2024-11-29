export {};

declare global {
    export interface Action {
        actionName: string;
        value: string;
    }

    export interface RemoveAction {
        actionName: string;
    }
    
    export interface SelectorConfig {
        actionName: string;
        text: string;
        options: string[];
    }

    export interface PageProps {
        handleUpdateBalance: () => void;
    }

    export interface RequestsResponse {
        success: boolean;
        msg: string; 
        data?: string | number | Blob;
        errorCode?: string;
    }
}