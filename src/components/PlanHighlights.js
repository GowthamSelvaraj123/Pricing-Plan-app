import React, { useEffect, useMemo, useState } from "react";
import { usePlans } from "../PlansContext";
import CurrentChannel from "./CurrentChannel";
import CurrentOTT from "./CurrentOTT";

export default function PlanHighlights() {
    const { 
        planOptions: { pricing }, 
        activeTab, 
        activeNestedTab, 
        activeChannel, 
        setActiveChannel, 
        activeOtts, 
        price 
    } = usePlans();
    const calculateAddonPrice = (type, quantity) => {
        const pricingMap = {
            "550+ Channels": 149,
            "650+ Channels": 249,
            "950+ Channels": 399,
            "12+ OTTs": 149,
            "25+ OTTs": 259
        };
        return pricingMap[type] ? pricingMap[type] * quantity : 0;
    };
    const [colSpan, setColSpan] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setColSpan(window.innerWidth <= 1024 ? 2 : 1);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    const calculatePlanPrice = useMemo(() => {
        const basePrice = pricing[activeTab]?.[activeNestedTab]?.price || price;
        const installationCharge =
            (["30 Mbps", "50 Mbps"].includes(activeTab) && ["Monthly", "Quarterly"].includes(activeNestedTab)) ||
            (["100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1000 Mbps"].includes(activeTab) && activeNestedTab === "Monthly")
                ? 1000
                : 0;
        const isAddonChannel = (channel) => {
            return pricing[activeTab]?.[activeNestedTab]?.tv !== channel;
        };
        const channelPrice = calculateAddonPrice( activeChannel, activeNestedTab === "Monthly" ? 1 : activeNestedTab === "Quarterly" ? 3 : activeNestedTab === "Half Yearly" ? 6 : activeNestedTab === "Yearly" ? 12 : 0 );
        const ottPrice = calculateAddonPrice(activeOtts, 
            activeNestedTab === "Monthly" ? 1 :
            activeNestedTab === "Quarterly" ? 3 :
            activeNestedTab === "Half Yearly" ? 6 :
            activeNestedTab === "Yearly" ? 12 : 0
        );
        return Number(basePrice) + installationCharge + channelPrice + ottPrice;
    }, [activeTab, activeNestedTab, activeChannel, activeOtts, price, pricing]);
    const getPlanMessage = () => {
        if((["30 Mbps"].includes(activeTab) && ["Monthly", "Quarterly"].includes(activeNestedTab)) || 
        activeNestedTab === "Monthly")
        {
            return "Installation charges Rs 1500 applicable";
        }
        if ((["50 Mbps"].includes(activeTab) && ["Monthly", "Quarterly"].includes(activeNestedTab)) || 
            activeNestedTab === "Monthly") {
            return "Installation charges Rs 1000 applicable";
        }
        if (activeNestedTab === "Half Yearly") {
            return "Our half-yearly plan offers a 7.5% discount.";
        }
        if (activeNestedTab === "Yearly") {
            return "Our yearly plan offers a 15% discount.";
        }
        return "";
    };
    return (
        <>
            <tr className="benefitswrap">
                <td colSpan="2">
                    <div className="benifts-tabs">
                        <h3>Plan Highlights</h3>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Speed</td>
                <td>{activeTab}</td>
            </tr>
            {pricing[activeTab]?.[activeNestedTab]?.benefits.map((benefit, index) => (
                <tr key={`${activeTab}-benefit-${index}`}>
                    <td>
                        <div className="table-channel">
                            {benefit.name}
                            {benefit.name === "TV Channels" && (
                                 <div className="tv-channels"><CurrentChannel benefit={benefit} activeChannel={activeChannel} setActiveChannel={setActiveChannel} /></div>
                            )}
                            {benefit.name.startsWith("OTT") && ["12+ OTTs", "25+ OTTs"].includes(String(pricing[activeTab]?.[activeNestedTab]?.ott)?.trim()) && (
                                <CurrentOTT activeOtts={String(pricing[activeTab]?.[activeNestedTab]?.ott)?.trim()} activeTab={activeTab} activeNestedTab={activeNestedTab} />
                            )}
                        </div>
                    </td>
                    <td>{benefit.lite}</td>
                </tr>
            ))}
            {[
                { title: "Channels Addon Pack", price: calculateAddonPrice(activeChannel, 1) },
                { title: "OTT's Addon Pack", price: calculateAddonPrice(activeOtts, 1) }
            ].map((item, index) => (
                <tr key={index}>
                    <td>{item.title}</td>
                    <td>
                        <i className="fas fa-rupee-sign" style={{ fontSize: "10px" }}></i> {item.price}
                    </td>
                </tr>
            ))}
            <tr>
                <td className="padding-0 highlights-page-image">
                    <img width="100%" src="https://beta1.skylink.net.in/wp-content/uploads/2025/03/dummy-banner.png" alt="Plan Banner" />
                </td>
                <td className="pricing-features-wrap" colSpan={colSpan}>
                    <div className="pricing-features">
                        <span className="price">
                            Price: <i className="fas fa-rupee-sign"></i> {calculatePlanPrice}
                            <span
                                style={{
                                    fontSize: "14px",
                                    color: "black",
                                    display: "block",
                                    marginTop: "10px"
                                }}
                            >
                                {getPlanMessage()}
                            </span>
                        </span>
                    </div>
                    <button className="subscribe new"  data-price={calculatePlanPrice} data-active-tab={activeTab} data-active-nested-tab={activeNestedTab} data-active-channel={activeChannel} data-active-otts={activeOtts}>Subscribe Now</button>
                </td>
            </tr>
        </>
    );
}
