import {
  reactExtension,
  useShippingAddress,
  useBuyerJourneyIntercept,
  DateField,
  BlockStack,
  Text,
} from "@shopify/ui-extensions-react/checkout";

import { useState } from "react";
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension(){
const [error, setError] = useState(null);
const [isBlocking, setIsBlocking] = useState(false);
const shippingAddress = useShippingAddress();

useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (error) {
      return {
        behavior: canBlockProgress ? "block" : "allow",
        reason: error,
      };
    }
    return {
      behavior: "allow",
    };
  });

function checkValidBirth(value){
    const birthDate = new Date(value);
    const today = new Date();
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    if (birthDate > eighteenYearsAgo) {
        setError("You must be at least 18 years old to proceed.");
      } else {
        setError(null);
      }
}

if(shippingAddress.provinceCode == 'RJ'){
    return (  
      <BlockStack>
        <DateField onChange={checkValidBirth} label="Select a date" />
        {error && <Text appearance="critical">{error}</Text>}
       </BlockStack>
    );
  }
  return null
  
}