import React from 'react';
import { usePlans } from '../PlansContext';

export default function BilledCycle() {
    const { planOptions: { billedCycle }, activeNestedTab, setActiveNestedTab, checkCondition, setActiveChannel } = usePlans();

    return (
        checkCondition && (
            <>
                <h3>Pick your Flexible Billing Cycle</h3>
                <div className="wrapforplans">
                    <div>
                        <div className="plans-tabs">
                            {billedCycle.map((option) => (
                                <div
                                    key={option}
                                    className={`plan-tab ${option === activeNestedTab ? "plan-active" : ""}`}
                                    onClick={() => {
                                        setActiveNestedTab(option);
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    );
}