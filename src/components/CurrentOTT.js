import React, { useEffect, useState } from "react";
const ottPackages = {
    "12+ OTTs": [
        "https://beta1.skylink.net.in/wp-content/uploads/2025/02/jio-hotstrar.webp",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/sun-nxt-new.svg",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/ZEE5.svg",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/sonyliv.svg",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/aha.svg",
    ],
    "25+ OTTs": [
        "https://beta1.skylink.net.in/wp-content/uploads/2025/02/jio-hotstrar.webp",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/sun-nxt-new.svg",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/ZEE5.svg",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/sonyliv.svg",
        "https://beta1.skylink.net.in/wp-content/uploads/2023/07/aha.svg",
    ],
};
export default function CurrentOTT({ activeOtts, activeTab, activeNestedTab }) {
    const [selectedOTT, setSelectedOTT] = useState([]);
    useEffect(() => {
        const trimmedOtts = String(activeOtts).trim();
        if (ottPackages.hasOwnProperty(trimmedOtts)) {
            setSelectedOTT(ottPackages[trimmedOtts]);
        } else {
            setSelectedOTT([]);
        }
    }, [activeOtts, activeTab, activeNestedTab]);
    if (!["12+ OTTs", "25+ OTTs"].includes(activeOtts)) return null;

    return (
        <div className="ott-section">
            <div className="ott-list">
                <div className="ott-channel-image-wrap">
                    {selectedOTT.length > 0 ? (
                        selectedOTT.map((src, index) => <img key={index} src={src} alt="OTT Platform" />)
                    ) : (
                        <p>No OTTs available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
