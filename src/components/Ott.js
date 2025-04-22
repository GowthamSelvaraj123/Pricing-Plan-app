import React from 'react';
import { usePlans } from '../PlansContext';

export default function Ott() {
    const { planOptions: { ottOptions, pricing }, activeTab, activeNestedTab, activeOtts, setActiveOtts} = usePlans();

    const isDisabled = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.ott;
        
        // Get index of the activePricing and the option in the ottOptions array
        const activeIndex = ottOptions.indexOf(activePricing);
        const optionIndex = ottOptions.indexOf(option);
        
        // Disable option if it is lesser than the active plan
        return optionIndex !== -1 && optionIndex < activeIndex;
    };
    const getLabel = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.ott;
        if (isDisabled(option)) return "";
        return activePricing === option ? " (Free)" : " (Add-on)";
    };
    return (
        activeOtts && (
            <>
            <h3>Choose Your OTT's</h3>
            <div className="wrapforplans green">
            <div>
                <div className="plans-tabs">
                    {ottOptions.map((option) => (
                        <div
                            key={option}
                            className={`plan-tab ${activeOtts === option ? "plan-active" : ""} ${isDisabled(option) ? "disabled" : ""}`}
                            onClick={() => {
                                if (!isDisabled(option)) {
                                    setActiveOtts(option);
                                }
                            }}
                        >
                            {option}{getLabel(option)}
                        </div>
                    ))}
                </div>
            </div>
            </div>
            </>
        )
    );
}