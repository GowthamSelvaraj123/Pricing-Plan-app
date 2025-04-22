import React from 'react';
import { usePlans } from '../PlansContext';

export default function Channel() {
    const { planOptions: { tvChannel, pricing }, activeTab, activeNestedTab, setActiveOtts, activeChannel, setActiveChannel } = usePlans();

    const isDisabled = (option) => {
        const activePricing = pricing[activeTab][activeNestedTab].tv;
        return (
            (activePricing === "550+ Channels" && option === "350+ Channels") ||
            (activePricing === "650+ Channels" && ["550+ Channels", "350+ Channels"].includes(option)) ||
            (activePricing === "950+ Channels" && option !== "950+ Channels")
        );
    };
    const getLabel = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.tv;
        if (isDisabled(option)) {
            return "";
        }
        return activePricing === option ? " (Free)" : " (Add-on)";
    };
    return (
        activeChannel && (
            <>
            <div className="yellowWrap">
                <h3 className='yellowFont'>Choose Your TV Channels</h3>
                <div className="wrapforplans yellow">
                    <div>
                        <div className="plans-tabs">
                            {tvChannel.map((option) => (
                                <div
                                    key={option}
                                    className={`plan-tab ${activeChannel === option ? "plan-active" : ""} ${isDisabled(option) ? "disabled" : ""}`}
                                    onClick={() => {
                                        if (!isDisabled(option)) {
                                            setActiveChannel(option);
                                        }
                                    }}
                                >
                                    {option}<span className='include-wrap'>{getLabel(option)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    );
}