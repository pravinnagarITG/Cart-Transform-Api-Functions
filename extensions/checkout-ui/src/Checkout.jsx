import {
  reactExtension,
  BlockStack,
  Stepper,
  Checkbox,
  useApplyCartLinesChange,
  useCartLineTarget,
  useCartLines,
  Button,
  Link,
  Modal,
  TextBlock,
  useApi,
  Image,
} from "@shopify/ui-extensions-react/checkout";

import { useState } from "react";
// 1. Choose an extension target
export default reactExtension("purchase.checkout.cart-line-item.render-after", () => (
  <Extension />
));

function Extension() {
  const applyCartLinesChange = useApplyCartLinesChange()
  const line = useCartLineTarget();
  const isGiftWrapSelected = line.attributes?.some(attr => attr.key === "giftWrap" && attr.value === "true");
  const [localQuantity, setLocalQuantity] = useState(line.quantity);
  const cartLines = useCartLines();
  console.log(cartLines)
  const {ui} = useApi();
  return (  
    <BlockStack padding="base">
      <Checkbox checked={isGiftWrapSelected} onChange={onCheckboxChange}>Gift Wrap</Checkbox>
      <Stepper onChange={quantityUpdate} min={1} step={1} label="Quantity" value={line.quantity} />
            <Link
              overlay={
                <Modal
                  id="my-modal"
                  padding
                  title="Product Details"
                >            
                  <TextBlock key={line.id}>
                   <Image aspectRatio="" source={line.merchandise.image.url} />
                   <TextBlock> {line.merchandise.title}</TextBlock>
                   <TextBlock>Price: {line.cost.totalAmount.amount} {line.cost.totalAmount.currencyCode}</TextBlock> 
                   <TextBlock>Quantity: {line.quantity}</TextBlock> 
                  </TextBlock>      
                  <Button
                    onPress={() =>
                      ui.overlay.close('my-modal')
                    }
                  >
                    Close
                  </Button>
                </Modal>
              }
            >
               View Product Details
            </Link>
     </BlockStack>
  );

  async function onCheckboxChange(isChecked) {
    try {
      await applyCartLinesChange({
        type: "updateCartLine",
        id: line.id,
        merchandiseId: line.merchandise.id,
        attributes: isChecked 
          ? [{ key: "giftWrap", value: "true" }] 
          : [{ key: "giftWrap", value: "" }]
      });

    } catch (error) {
      console.error("Error updating gift wrap:", error);
    }
  }

  async function quantityUpdate(value) {
    setLocalQuantity(value);
    try {
      await applyCartLinesChange({
        type: "updateCartLine",
        id: line.id,
        quantity:value,
      });

    } catch (error) {
      console.error("Error updating Quantity:", error);
    }
  }
}