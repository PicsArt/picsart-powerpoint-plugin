// Action Names
export const FACTOR_ACTION_NAME: string = 'factor';
export const FORMAT_ACTION_NAME: string = 'format';
  
// Text Labels
export const FACTOR_TEXT: string = 'Upscale Factor';
export const FORMAT_TEXT: string = 'File Format';
  
// Options
export const FACTOR_OPTIONS: string[] = ['2', '4', '6', '8'];
export const FORMAT_OPTIONS: string[] = ['PNG', 'JPG', 'WEBP'];
  
// Selector Objects
export const SELECTORS : SelectorConfig[] = [
    {
      actionName: FACTOR_ACTION_NAME,
      text: FACTOR_TEXT,
      options: FACTOR_OPTIONS,
    },
    {
      actionName: FORMAT_ACTION_NAME,
      text: FORMAT_TEXT,
      options: FORMAT_OPTIONS,
    },
];
  