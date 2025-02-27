// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: []
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  try {
    // Safely access transforms
    const transforms = input.cartTransform.metafield?.jsonValue?.transforms || [];

    // Find the target line item
    const targetLineItem = input.cart.lines.find(line => {
      return transforms.some(transform => {
        if (line.merchandise.__typename === "ProductVariant") {
          return line.merchandise.id === transform.targetVariantId;
        }
        return false;
      });
    });

    // Find the corresponding transform
    const targetTransform = transforms.find(transform => {
      if (targetLineItem?.merchandise.__typename === "ProductVariant") {
        return targetLineItem?.merchandise.id === transform.targetVariantId;
      }
      return false;
    });

    // Apply the transform if valid
    if (
      targetLineItem &&
      targetTransform &&
      targetLineItem.merchandise.__typename === "ProductVariant"
    ) {
      return {
        operations: [
          {
            expand: {
              cartLineId: targetLineItem.id,
              title:"pravin app extension",
              expandedCartItems: [
                {
                  merchandiseId: targetTransform.addOnVariantId,
                  quantity: targetLineItem.quantity,
                  price: {
                    adjustment: {
                      fixedPricePerUnit: {
                        amount: targetTransform.addOnPrice
                      }
                    }
                  }
                }
              ]
            }
          }
        ]
      };
    }

    // Return no changes if no valid transform is found
    return NO_CHANGES;
  } catch (error) {
    console.error("Error in run function:", error);
    return NO_CHANGES;
  }
}