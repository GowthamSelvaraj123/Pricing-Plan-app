import React from 'react';
import { usePlans } from '../PlansContext';

export default function Ott() {
    const { planOptions: { ottOptions, pricing }, activeTab, activeNestedTab, activeOtts, setActiveOtts, activeChannel } = usePlans();

    const isDisabled = (option) => {
        const activePricing = pricing[activeTab][activeNestedTab].ott;
        return (
            ["12+ OTTs", "25+ OTTs"].includes(activePricing) &&
            ((activePricing === "12+ OTTs" && ["Don't Want OTT's"].includes(option)) ||
            (activePricing === "25+ OTTs" && ["12+ OTTs", "Don't Want OTT's"].includes(option)))
        );
    };
    const getLabel = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.ott;
        if (isDisabled(option)) {
            return ""; 
        }
        return activePricing === option ? " (Included)" : " (Addon)";
    };
    return (
        activeOtts && (
            <div>
                <h3 style={{ margin: "10px 0" }}>Exclusive OTT Access</h3>
                <div className="plans-tabs">
                    {ottOptions.map((option) => (
                        <div
                            key={option}
                            className={`plan-tab ${activeOtts === option ? "plan-active" : ""} ${isDisabled(option) ? "disabled" : ""}`}
                            onClick={() => {
                                if (!isDisabled(option) && option !== "Don't Want OTT's") {
                                    setActiveOtts(option);
                                }
                            }}
                        >
                            {option}{getLabel(option)}
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}