import { createContext, useContext, useState } from "react";

const PlansContext = createContext();
export const PlanProvider = ({ children }) => {
    const [planOptions, setPlanOptions] = useState({
        benefitOptions: [
            { name: "TV Channels", lite: "350+" },
            { name: "OTT", lite: "Yes" },
            { name: "Billing Cycle", lite: "1" },
            { name: "24/7 Elite Support", lite: "Yes" },
            { name: "Installation", lite: "1000" }
        ],
        speeds: ["30 Mbps", "50 Mbps", "100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1000 Mbps", "2000 Mbps"],
        ottOptions: ["21+ OTTs", "22+ OTTs", "29+ OTTs", "30+ OTTs"],
        tvChannel: ["350+ Channels", "550+ Channels", "650+ Channels", "950+ Channels"],
        billedCycle: ["Monthly", "Quarterly", "Half Yearly", "Yearly"],
        pricing: {
            "30 Mbps": generatePricing(399, "1500GB", "350+ Channels", "21+ OTTs", "30 Mbps"),
            "50 Mbps": generatePricing(499, "Unlimited", "350+ Channels", "22+ OTTs", "50 Mbps"),
            "100 Mbps": generatePricing(699, "Unlimited", "350+ Channels", "29+ OTTs", "100 Mbps"),
            "200 Mbps": generatePricing(999, "Unlimited", "550+ Channels", "29+ OTTs", "200 Mbps"),
            "300 Mbps": generatePricing(1299, "Unlimited", "550+ Channels", "29+ OTTs", "300 Mbps"),
            "500 Mbps": generatePricing(1499, "Unlimited", "650+ Channels", "29+ OTTs", "500 Mbps"),
            "1000 Mbps": generatePricing(1999, "Unlimited", "650+ Channels", "29+ OTTs", "1000 Mbps"),
            "2000 Mbps": generatePricing(1999, "Unlimited", "650+ Channels", "29+ OTTs", "1000 Mbps"),
        }
    });
    function generatePricing(basePrice, data, tv, ott, speed) {
        const isLowSpeed = ["30 Mbps", "50 Mbps"].includes(speed);
        const isHighSpeed = ["100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1000 Mbps"].includes(speed);
        const halfDiscount = Math.round(basePrice * 6 * (1 - 0.075));
        const fullDiscount = Math.round(basePrice * 12 * (1 - 0.15));
        return {
            Monthly: createPlan(basePrice, data, tv, ott, "Monthly", "1000"),
            Quarterly: createPlan(basePrice * 3, "Unlimited", tv, ott, "Quarterly",  isLowSpeed ? "1000" : "Free"),
            "Half Yearly": createPlan(halfDiscount, "Unlimited", tv, ott, "Half Yearly", "Free"),
            Yearly: createPlan(fullDiscount, "Unlimited", tv, ott, "Yearly", "Free")
        };
    }
    function createPlan(price, data, tv, ott, billingCycle, installation) {
        return {
            price: price.toString(),
            data,
            tv,
            ott,
            benefits: [
                { name: "TV Channels", lite: tv },
                { name: "OTT", lite: ott},
                { name: "Billing Cycle", lite: billingCycle},
                { name: "24/7 Elite Support", lite: "Yes" },
                { name: "Installation", lite: installation },
            ]
        };
    }
    const [activeTab, setActiveTab] = useState(planOptions.speeds[0]);
    const [checkCondition, setCheckCondition] = useState(true);
    const [activeNestedTab, setActiveNestedTab] = useState(planOptions.billedCycle[0]);
    const [activeChannel, setActiveChannel] = useState(planOptions.tvChannel[0]);
    const [activeOtts, setActiveOtts] = useState(planOptions.ottOptions[0]);
    const [price, setPrice] = useState( planOptions.pricing?.["30 Mbps"]?.["Monthly"]?.price || 0 );
    return (
        <PlansContext.Provider value={{ planOptions, setPlanOptions, activeTab, setActiveTab, checkCondition, setCheckCondition, activeNestedTab, setActiveNestedTab, activeChannel, setActiveChannel, activeOtts, setActiveOtts, price, setPrice }}>
            {children}
        </PlansContext.Provider>
    );
};
export const usePlans = () => useContext(PlansContext);
export default PlansContext;