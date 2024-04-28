import React, { useEffect, useState } from "react";
declare global {
    interface Window {
        paypal:any;
    }
}

let paypal = window.paypal; 
const PayPal = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if PayPal SDK is already loaded
    if (window.paypal) {
      setLoaded(true);
    } else {
      // Add event listener to load PayPal SDK script
      window.addEventListener("load", () => {
        setLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      // Render PayPal button
      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any, err: any) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "CAD",
                    value: 650.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            console.log(order);
            // You can perform further actions after successful payment here
          },
          onError: (err: any) => {
            console.log(err);
            // Handle errors here if needed
          },
        })
        .render("#paypal-button-container");
    }
  }, [loaded]);

  return (
    <div>
      {/* Container for PayPal button */}
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPal;
