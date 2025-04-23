import React, { useEffect, useState } from "react";
const ottPackages = {
    "21+ OTTs": [
        "https://skylink.net.in/wp-content/uploads/2025/02/jio-hotstrar.webp",
        "https://skylink.net.in/wp-content/uploads/2023/07/sun-nxt-new.svg",
        "https://skylink.net.in/wp-content/uploads/2023/07/ZEE5.svg",
        "https://skylink.net.in/wp-content/uploads/2023/07/sonyliv.svg",
        "https://skylink.net.in/wp-content/uploads/2023/07/aha.svg",
    ],
    "29+ OTTs": [
        "https://skylink.net.in/wp-content/uploads/2025/02/jio-hotstrar.webp",
        "https://skylink.net.in/wp-content/uploads/2023/07/sun-nxt-new.svg",
        "https://skylink.net.in/wp-content/uploads/2023/07/ZEE5.svg",
        "https://skylink.net.in/wp-content/uploads/2023/07/sonyliv.svg",
        "https://skylink.net.in/wp-content/uploads/2023/07/aha.svg",
        "https://www.skylink.net.in/wp-content/uploads/2025/02/Amazon_Prime_Video_logo_2024.svg.png"
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
    if (!["21+ OTTs", "22+ OTTs", "29+ OTTs", "30+ OTTs"].includes(activeOtts)) return null;

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
