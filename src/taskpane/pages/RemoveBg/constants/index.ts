// Action Names
export const MAKE_TRANSPARENT_ACTION_NAME: string = 'transparent';
export const BACKGROUND_COLOR_ACTION_NAME: string = 'bg_color';

// Shadow
export const SHADOW_ACTION_NAME: string = 'shadow';
export const SHADOW_OPACITY_ACTION_NAME: string = 'shadow_opacity';
export const SHADOW_BLUR_ACTION_NAME: string = 'shadow_blur';

// Stroke
export const STROKE_SIZE_ACTION_NAME: string = 'stroke_size';
export const STROKE_COLOR_ACTION_NAME: string = 'stroke_color';
export const STROKE_OPACITY_ACTION_NAME: string = 'stroke_opacity';

export const OUTPUT_TYPE_ACTION_NAME: string = 'output_type';
export const FORMAT_ACTION_NAME: string = 'format';

// Text Labels
export const OUTPUT_TYPE_TEXT: string = 'Output Type';
export const FORMAT_TEXT: string = 'File Format';
  
// Options
export const FACTOR_OPTIONS: string[] = ['mask','cutout',];
export const FORMAT_OPTIONS: string[] = ['PNG', 'JPG', 'WEBP'];
  
// Selector Objects
export const SELECTORS: SelectorConfig[] = [
    {
      actionName: OUTPUT_TYPE_ACTION_NAME,
      text: OUTPUT_TYPE_TEXT,
      options: FACTOR_OPTIONS,
    },
    {
      actionName: FORMAT_ACTION_NAME,
      text: FORMAT_TEXT,
      options: FORMAT_OPTIONS,
    },
];
  