// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const hasBulkyVariant = input.cart.lines.some(line => {
    if (line.merchandise.__typename === 'ProductVariant') {
      return line.merchandise.product.hasAnyTag;
    } 
    return false;
  });

  const cost = hasBulkyVariant ? 400.99 : 0.00;
  const pickupInstruction = hasBulkyVariant
    ? "Ready for pickup next business day."
    : "Ready for pickup now!";

  return {
    operations: input.locations.map(location => ({
      add: {
        title: location.name,
        cost: cost,
        pickupLocation: {
          locationHandle: location.handle,
          pickupInstruction: pickupInstruction
        }
      }
    }))
  };
}