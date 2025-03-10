// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Operation} Operation
*/

// The configured entrypoint for the 'purchase.delivery-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  const message = "May be delayed due to weather conditions";

  let toRename = input.cart.deliveryGroups
    .filter(group => group.deliveryAddress?.provinceCode &&
      group.deliveryAddress.provinceCode == "MP")
    .flatMap(group => group.deliveryOptions).map(option => ({
      rename: {
        deliveryOptionHandle: option.handle,
        title: option.title ? `${option.title} - ${message}` : message
      }
    })
  );


  return {
    operations: toRename
  };
};