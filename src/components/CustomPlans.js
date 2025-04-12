import React from "react";
import { usePlans } from "../PlansContext";
import CurrentChannel from "./CurrentChannel";
import CurrentOTT from "./CurrentOTT";

export default function CustomPlans() {
    const {
        planOptions: { pricing },
        activeTab,
        activeNestedTab,
        price,
        activeChannel,
        setActiveChannel,
        activeOtts,
    } = usePlans();
    
    const billingCycleMultipliers = {
        Monthly: 1,
        Quarterly: 3,
        "Half Yearly": 6,
        Yearly: 12,
    };
    
    const billingAddonMultipliers = {
        Monthly: 1,
        Quarterly: 3,
        "Half Yearly": 6,
        Yearly: 12,
    };
    
    const billingCycleMultiplier = billingCycleMultipliers[activeNestedTab] || 1;
    const billingAddonCycleMultiplier = billingAddonMultipliers[activeNestedTab] || 1;
    const staticBasePrice = pricing?.[activeTab]?.["Monthly"]?.price || price;
    const basePrice = pricing?.[activeTab]?.[activeNestedTab]?.price || price;
    
    const isLowSpeed = ["30 Mbps", "50 Mbps"].includes(activeTab);
    const isHighSpeed = ["100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1000 Mbps"].includes(activeTab);
    
    const isEligibleForInstallCost = 
        (isLowSpeed && ["Monthly", "Quarterly"].includes(activeNestedTab)) || 
        (isHighSpeed && activeNestedTab === "Monthly");
    
    const installationCost = isEligibleForInstallCost ? 1000 : 0;
    
    const channelPrices = {
        "550+ Channels": 149,
        "650+ Channels": 249,
        "950+ Channels": 399,
    };
    
    const ottPrices = {
        "12+ OTTs": 149,
        "25+ OTTs": 259,
    };
    
    const channelPrice = (channelPrices[activeChannel] || 0) * billingAddonCycleMultiplier;
    const ottPrice = (ottPrices[activeOtts] || 0) * billingAddonCycleMultiplier;
    
    const totalPrice = Number(basePrice) + installationCost + channelPrice + ottPrice;
    
    const planMessages = {
        Monthly: isLowSpeed && ["Monthly", "Quarterly"].includes(activeNestedTab) ? "Installation charges Rs 1000 applicable" : "",
        "Half Yearly": "Our half-yearly plan offers a 7.5% discount.",
        Yearly: "Our yearly plan offers a 15% discount.",
    };
    
    const planMessage = planMessages[activeNestedTab] || "";
    
    return (
        <div className="custom-plan-inner-wrap">
            <div className="plan-details-features">
                <span className="plan-details-feature-list">
                    <span className="feature-list-head">Speed</span> {activeTab}
                </span>
                <span className="plan-details-feature-list">
                    <span className="feature-list-head">Billing Cycle</span> {staticBasePrice} * {billingCycleMultiplier}
                </span>
                <span className="plan-details-feature-list">
                    <span className="feature-list-head">Installation</span> {installationCost}
                </span>
                <div className="addon-price-wrap">
                    <h3>
                        <div className="tv-channel-title">TV Channels - {activeChannel || pricing?.[activeTab]?.[activeNestedTab]?.tv} <span className="hd-mention-text">{activeChannel === "650+ Channels" ? "(94+ HD)" : activeChannel === "950+ Channels" ? "(ALL HD)" : ""}
                        </span></div>
                        <span className="addon-price">
                            <i style={{ fontSize: "10px" }} className="fas fa-rupee-sign"></i> {channelPrices[activeChannel] || 0} * {billingAddonCycleMultiplier }
                        </span>
                    </h3>
                    <div className="tv-channels"><CurrentChannel activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
                    <a href={`https://beta1.skylink.net.in/wp-content/uploads/pdf/${activeChannel === "350+ Channels" ? "skylink-mini.pdf" : activeChannel === "550+ Channels" ? "skylink-pro.pdf" : activeChannel === "650+ Channels" ? "skylink-pro.pdf" : "skylink-pro.pdf"}`} target="_blank" > Download Brochure </a>
                    </div>
                </div>
                <div className="addon-price-wrap">
                    <h3>
                        OTT List - {pricing?.[activeTab]?.[activeNestedTab]?.ott}
                        <span className="addon-price">
                            <i style={{ fontSize: "10px" }} className="fas fa-rupee-sign"></i> {ottPrices[activeOtts] || 0} * {billingAddonCycleMultiplier }
                        </span>
                    </h3>
                    <CurrentOTT activeOtts={String(pricing[activeTab]?.[activeNestedTab]?.ott)?.trim()} activeTab={activeTab} activeNestedTab={activeNestedTab} />
                </div>
            </div>
            <div className="pricing-features">
                <span className="price">
                    Price: <i className="fas fa-rupee-sign"></i> {totalPrice}
                    {planMessage && (
                        <span
                            style={{
                                fontSize: "14px",
                                color: "black",
                                display: "block",
                                marginTop: "10px",
                            }}
                        >
                            {planMessage}
                        </span>
                    )}
                </span>
                <div className="subscribe-wrap">
                    <button className="subscribe"  data-price={totalPrice}
    data-active-tab={activeTab}
    data-active-nested-tab={activeNestedTab}
    data-active-channel={activeChannel}
    data-active-otts={activeOtts}>Subscribe Now</button>
                    <img
                        src="https://beta1.skylink.net.in/wp-content/uploads/2025/03/plan-webupdates.jpg"
                        alt="Plan Update"
                    />
                </div>
            </div>
        </div>
    );
}
