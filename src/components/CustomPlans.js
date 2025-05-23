import React, { act } from "react";
import { usePlans } from "../PlansContext";
import CurrentChannel from "./CurrentChannel";
import CurrentOTT from "./CurrentOTT";

export default function CustomPlans() {
    const {
        planOptions: { ottOptions, pricing },
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

    const installationCost = isEligibleForInstallCost ? activeTab === "30 Mbps" ? 1500 : 1000 : 0;

    const channelPrices = {
        "550+ Channels": 149,
        "650+ Channels": 249,
        "950+ Channels": 399,
    };

    const ottPrices = {
        "21+ OTTs": 0,
        "22+ OTTs": 149,
        "29+ OTTs": 249,
        "30+ OTTs": 349,
    };
    const getOttPrice = (activeott) => {
        const basePrice = pricing[activeTab]?.[activeNestedTab]?.ott === activeott ? 0 : ottPrices[activeott];

        if (basePrice === 0) return 0;
    
        if (billingAddonCycleMultiplier === 6) {
            return basePrice * 0.925;
        } else if (billingAddonCycleMultiplier === 12) {
            return basePrice * 0.85; 
        }
    
        return basePrice;
    };
    const getChannelPrice = (activeChannel) => {
        const basePrice = pricing[activeTab]?.[activeNestedTab]?.tv === activeChannel ? 0 : channelPrices[activeChannel];
        if (basePrice === 0) return 0;
    
        let finalPrice = basePrice;
    
        if (billingAddonCycleMultiplier === 6) {
            finalPrice = basePrice * 0.925;
        } else if (billingAddonCycleMultiplier === 12) {
            finalPrice = basePrice * 0.85;
        }
    
        return finalPrice;
    };
    const getOriginalPrice = () => {
        if (basePrice === 0) return 0;
        let finalPrice = basePrice;
        if (billingAddonCycleMultiplier === 6) {
            finalPrice = basePrice / 0.925;
        } else if (billingAddonCycleMultiplier === 12) {
            finalPrice = basePrice / 0.85;
        }
        return Math.round(finalPrice);
    };
    const getDiscountAmount = () => {
        if (basePrice === 0) return 0;
        if (billingAddonCycleMultiplier === 6) {
            return Math.round((basePrice / 0.925 - basePrice));
        } else if (billingAddonCycleMultiplier === 12) {
            return Math.round((basePrice / 0.85 - basePrice));
        }
        return 0;
    };
    const isDisabled = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.ott;
        const activeIndex = ottOptions.indexOf(activePricing);
        const optionIndex = ottOptions.indexOf(option);
        return optionIndex !== -1 && optionIndex < activeIndex;
    };
    const isDisabledChannel = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.tv;
        return (
            (activePricing === "550+ Channels" && option === "350+ Channels") ||
            (activePricing === "650+ Channels" && ["550+ Channels", "350+ Channels"].includes(option)) ||
            (activePricing === "950+ Channels" && option !== "950+ Channels")
        );
    };
    const getLabel = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.ott;
        if (isDisabled(option)) return "";
        if (ottPrices[option] === 0) {
            return "0";
        }
        return activePricing === option ? "0" : ` ${ottPrices[option]}`;
    };
    const getLabelChannel = (option) => {
        const activePricing = pricing[activeTab]?.[activeNestedTab]?.tv;
        if (isDisabledChannel(option)) return "";
        return activePricing === option ? "0" : `${channelPrices[option]}`;
    };
    const channelPrice = (getChannelPrice(activeChannel) || 0) * billingAddonCycleMultiplier;
    
    const ottPrice = (getOttPrice(activeOtts) || 0) * billingAddonCycleMultiplier;

    const totalPrice = Number(basePrice) + installationCost + channelPrice + ottPrice;
    const gstAmount = Math.round(totalPrice * 0.18);
    const withGst = totalPrice + gstAmount;
    let installationMessage = "";
    if (["Monthly", "Quarterly"].includes(activeNestedTab)) {
        if (activeTab === "30 Mbps") {
            installationMessage = "Installation charges Rs 1500 applicable";
        } else if (activeTab !== "30 Mbps") {
            installationMessage = "Installation charges Rs 1000 applicable";
        }
    }
    else if (
        ["100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1000 Mbps"].includes(activeTab) &&
        activeNestedTab === "Monthly"
    ) {
        installationMessage = "Installation charges Rs 1000 applicable";
    }
    const planMessages = {
        Monthly:
            activeTab === "30 Mbps"
                ? "Installation charges Rs 1500 applicable"
                : activeTab === "50 Mbps"
                    ? "Installation charges Rs 1000 applicable"
                    : ["100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1000 Mbps"].includes(activeTab)
                        ? "Installation charges Rs 1000 applicable"
                        : "",
        
        Quarterly:
            activeTab === "30 Mbps"
                ? "Installation charges Rs 1500 applicable"
                : activeTab === "50 Mbps"
                    ? "Installation charges Rs 1000 applicable"
                    : "",
    
        "Half Yearly": "Our half-yearly plan offers a 7.5% discount.",
        Yearly: "Our yearly plan offers a 15% discount.",
    };

    const planMessage = planMessages[activeNestedTab] || "";

    return (
        <div className="custom-plan-inner-wrap">
            <div className="firstset">
            <h1 style={{ fontSize: "24px" }}>Selected Plan Details</h1>
            <div className="plan-details-features">
                <span className="plan-details-feature-list">
                    <span className="feature-list-head">Speed</span> <span className="feature-list-ans">{activeTab}</span>
                </span>
                <span className="plan-details-feature-list">
                    <span className="feature-list-head">Billing Cycle</span> <span className="feature-list-ans">₹{staticBasePrice} * {billingCycleMultiplier}</span>
                </span>
                <span className="plan-details-feature-list">
                    <span className="feature-list-head">Installation</span> <span className="feature-list-ans">₹{installationCost}</span>
                </span>
                <div className="addon-price-wrap">
                    <h3>
                        <div className="tv-channel-title">TV Channels - {activeChannel || pricing?.[activeTab]?.[activeNestedTab]?.tv} <span className="hd-mention-text">{activeChannel === "650+ Channels" ? "(94+ HD)" : activeChannel === "950+ Channels" ? "(ALL HD)" : ""}
                        </span></div>
                        <span className="feature-list-ans">
                        <span className="addon-price">
                            <i style={{ fontSize: "10px" }} className="fas fa-rupee-sign"></i> {getLabelChannel(activeChannel) || 0} * {billingAddonCycleMultiplier}
                        </span>
                        </span>
                    </h3>
                    <div className="tv-channels" style={{"display":"none"}}><CurrentChannel activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
                        <a href={`https://skylink.net.in/wp-content/uploads/pdf/${activeChannel === "350+ Channels" ? "skylink-mini.pdf" : activeChannel === "550+ Channels" ? "skylink-pro.pdf" : activeChannel === "650+ Channels" ? "skylink-pro.pdf" : "skylink-pro.pdf"}`} target="_blank" > Download Brochure </a>
                    </div>
                </div>
                <div className="addon-price-wrap">
                    <h3>
                        OTT List - {activeOtts || pricing?.[activeTab]?.[activeNestedTab]?.ott}
                        <span className="feature-list-ans">
                        <span className="addon-price">
                            <i style={{ fontSize: "10px" }} className="fas fa-rupee-sign"></i> {getLabel(activeOtts) || 0} * {billingAddonCycleMultiplier}
                        </span>
                        </span>
                    </h3>  
                    <div style={{"display":"none"}}>
                    <CurrentOTT activeOtts={String(pricing[activeTab]?.[activeNestedTab]?.ott)?.trim()} activeTab={activeTab} activeNestedTab={activeNestedTab} />
                    </div>
                </div>
            </div>
            </div>
            <div className="pricing-features">
            <div className="plan-details-features">
            <span className="plan-details-feature-list">
                    <span className="feature-list-head">Actula Price</span> <span className="feature-list-ans">₹{getOriginalPrice()}</span>
            </span>
            <span className="plan-details-feature-list">
                    <span className="feature-list-head">Discount Amount</span> <span className="feature-list-ans">- ₹{getDiscountAmount()}</span>
            </span>
            <span className="plan-details-feature-list">
                    <span className="feature-list-head">GST Inclusive</span> <span className="feature-list-ans">+ ₹{gstAmount}</span>
            </span>
            </div>
                <span className="price" style={{"margin-top":"20px"}}>
                    Price: <i className="fas fa-rupee-sign"></i> {withGst}.00
                    {planMessage && (
                        <span
                            style={{
                                fontSize: "11px",
                                color: "black",
                                display: "block",
                                marginTop: "10px",
                            }}
                        >
                            {planMessage} * Include GST 18%
                        </span>
                    )}
                </span>
                <div className="subscribe-wrap">
                    <button className="subscribe" data-price={withGst}
                        data-active-tab={activeTab}
                        data-active-nested-tab={activeNestedTab}
                        data-active-channel={activeChannel}
                        data-active-otts={activeOtts}>Subscribe Now</button>
                    <img  style={{"width":"100%", "display":"block", "height": "360px", "object-fit": "cover", "object-position": "top"}}
                        src="https://skylink.net.in/wp-content/uploads/2025/03/plan-webupdates.jpg"
                        alt="Plan Update"
                    />
                </div>
            </div>
        </div>
    );
}
