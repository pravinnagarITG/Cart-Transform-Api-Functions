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
// export function run(input) {
//   const operations = input.cart.lines.filter((line) => line.fabricLength?.value === "true")
//     .map((line) => {
//       let currentPrice = parseFloat(line.cost.totalAmount.amount);
//       let newTotalPrice = currentPrice + 10;
//       return {
//         update: {
//           cartLineId: line.id,
//           price: {
//             adjustment: {
//               fixedPricePerUnit: {
//                 amount: newTotalPrice / line.quantity,
//               },
//             },
//           },
//         },
//       };
//     });

//   return operations.length > 0 ? { operations } : NO_CHANGES;
// }

// merge

// export function run(input) {
//   try {
//     const cartLines = input.cart.lines;

//     const burgerLine = cartLines.find(line => 
//       line.merchandise.__typename === "ProductVariant" && 
//       line.merchandise.id === "gid://shopify/ProductVariant/50887025066168"
//     );
//     const friesLine = cartLines.find(line => 
//       line.merchandise.__typename === "ProductVariant" && 
//       line.merchandise.id === "gid://shopify/ProductVariant/50887032176824" 
//     );

//     if (burgerLine && friesLine) {
//       return {
//         operations: [
//           {
//             merge: {
//               parentVariantId : "gid://shopify/ProductVariant/50680004378808", 
//               cartLines: [
//                 { cartLineId: burgerLine.id,
//                   quantity:burgerLine.quantity
//                  },
//                 { cartLineId: friesLine.id,
//                   quantity:friesLine.quantity
//                  }
//               ],
//               title: "Burger Combo",
//             }
//           }
//         ]
//       };
//     }

//     return NO_CHANGES;
//   } catch (error) {
//     console.error("Error in merge function:", error);
//     return NO_CHANGES;
//   }
// }

// expand

export function run(input) {
  try {
    const targetLineItem = input.cart.lines.find(line => 
      line.merchandise.__typename === "ProductVariant" && 
      line.merchandise.id === "gid://shopify/ProductVariant/50887025066168"
    );

    if (targetLineItem) {
      return {
        operations: [
          {
            expand: {
              cartLineId: targetLineItem.id,
              expandedCartItems: [
                {
                  merchandiseId: "gid://shopify/ProductVariant/50887032176824",
                  quantity: 1
                },
                {
                  merchandiseId: "gid://shopify/ProductVariant/50680004378808",
                  quantity: 1,
                }
              ]
            }
          }
        ]
      };
    }

    return NO_CHANGES;
  } catch (error) {
    console.error("Error in expand function:", error);
    return NO_CHANGES;
  }
}

