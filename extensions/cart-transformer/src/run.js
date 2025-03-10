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
    // Read the metafield value
    const transforms = input.cartTransform.metafield?.jsonValue || {};
    const checkboxSelected = transforms.requestedFreeGift === "yes";
    
    if (checkboxSelected) {
      return {
        operations: input.cart.lines.map(line => ({
          update: {
            cartLineId: line.id,
            price: {
              adjustment: {
                fixedPricePerUnit: {
                  amount: line.cost.amountPerQuantity.amount + 10
                }
              }
            }
          }
        }))
      };
    }

    return NO_CHANGES;
  } catch (error) {
    console.error("Error in run function:", error);
    return NO_CHANGES;
  }
}

