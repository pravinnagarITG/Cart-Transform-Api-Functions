import {
  reactExtension,
  Checkbox,
  useApi,
  useApplyAttributeChange,
  useApplyCartLineChange,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.cart-line-item.render-after", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();
  const applyCartLineChange = useApplyCartLineChange();


  // 3. Render a UI
  return (
   
      <Checkbox onChange={onCheckboxChange}>
        Gift Wrap   </Checkbox>
    
  );

  async function onCheckboxChange(isChecked) {
     await applyAttributeChange({
      key: "functions-configurations",
      namespace: "$app:cart-transforms",
      type: "updateMetafield",
      value: JSON.stringify({ requestedFreeGift: isChecked ? "yes" : "no" }),
    });
      await applyCartLineChange({
      type: "updateCartLine",
      updates: [
        {
          id: target.id,
          attributes: [
            { key: "giftwrap", value: isChecked ? "true" : "false" }
          ]
        }
      ]
    });
  }
  
}