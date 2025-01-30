export  const deliveryOption = [
    {
        id:'1',
        deliveryDay:7,
        priceCents:0,
    }, {
        id:'2',
        deliveryDay:3,
        priceCents:499,
    }, {
        id:'3',
        deliveryDay:1,
        priceCents:799,
    },
];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOptions;
    deliveryOption.forEach((deliveryOption) =>{ 
        if(deliveryOption.id === deliveryOptionId){
            deliveryOptions = deliveryOption;
        }
    });
    return deliveryOptions;
    
}