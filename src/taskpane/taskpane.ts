/* global PowerPoint console */
export const getSelectedText = async () => {
  try {
    let res : {text: string, status: boolean};
    await PowerPoint.run(async (context) => {
      const selectedShapes = context.presentation.getSelectedShapes();
      selectedShapes.load("items");
      await context.sync();

      if (selectedShapes.items.length > 0) {
        const shape = selectedShapes.items[0];
        shape.load("textFrame/hasText");
        await context.sync();

        if (shape.textFrame && shape.textFrame.hasText) {
          shape.textFrame.textRange.load("text");
          await context.sync();

          res = {
            text : shape.textFrame.textRange.text,
            status: true,
          }
        } else {
          res = {
            text : "No text found in the selected shape.",
            status: false,
          }
        }
      } else {
        res = {
          text : "No selected Node.",
          status: false,
        }
      }
    });
    return res;
  } catch (error) {
    return {
      text: error,
      status: false
    }
  }
};



