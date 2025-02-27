// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
const MIN_UNIQUE_PRODUCT = 2;
const DISCOUNT_PER_PRODUCT = 5;
const MAX_DISCOUNT = 15;

export function run(input) {
  const uniqueProducts = input.cart.lines.reduce((productTitles, line) => {
    productTitles.add(line.merchandise.product.title);
    return productTitles;
  }, new Set());

  if (uniqueProducts.size < MIN_UNIQUE_PRODUCT) {
    return EMPTY_DISCOUNT;
  } else {
    const discount = Math.min(uniqueProducts.size * DISCOUNT_PER_PRODUCT, MAX_DISCOUNT);
    const uniqueDiscountProducts = discount / DISCOUNT_PER_PRODUCT;
    
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [
        {
          message: `${discount}% off for buying ${uniqueDiscountProducts} unique products`,
          value: {
            percentage: {
              value: discount.toString(),
            },
          },
          targets: [
            {
              orderSubtotal: {
                excludedVariantIds: []
              }
            },
          ],
        },
      ],
    };
  }
}
