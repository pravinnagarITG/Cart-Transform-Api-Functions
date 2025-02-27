/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const deliveryOptions = [];

  for (const deliveryGroup of input.cart.deliveryGroups) {
    for (const option of deliveryGroup.deliveryOptions) {
      deliveryOptions.push({
        deliveryOption: {
          handle: option.handle
        }
      });
    }
  }

  return {
    discounts: [
      {
        targets: deliveryOptions,
        value: {
          fixedAmount: {
            amount: 5
          }
        }
      }
    ]
  };
}
