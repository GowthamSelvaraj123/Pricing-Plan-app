import React from 'react';
import { usePlans } from '../PlansContext';

export default function BilledCycle() {
    const { planOptions: { billedCycle, pricing }, activeTab, activeNestedTab, setActiveNestedTab, checkCondition, setActiveChannel } = usePlans();

    return (
        checkCondition && (
            <div>
                <h3 style={{ margin: "10px 0" }}>Pick your Flexible Billing Cycle</h3>
                <div className="plans-tabs">
                    {billedCycle.map((option) => (
                        <div
                            key={option}
                            className={`plan-tab ${option === activeNestedTab ? "plan-active" : ""}`}
                            onClick={() => {
                                setActiveNestedTab(option);
                            }}
                        >
                            {option}  <span className="Installation-fee">{((["30 Mbps", "50 Mbps"].includes(activeTab) && ["Monthly", "Quarterly"].includes(activeNestedTab) && activeNestedTab === option) || (["100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1000 Mbps"].includes(activeTab) && activeNestedTab === "Monthly" && option === "Monthly")) ? " (Installation charges Rs 1000 applicable) " : ""}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}