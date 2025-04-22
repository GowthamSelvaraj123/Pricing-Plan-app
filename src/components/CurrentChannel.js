import React, { useEffect, useState } from "react";

// ✅ Move tvPackages outside the component to avoid re-renders
const tvPackages = [
    { label: "350+ Channels", additional: 347 },
    { label: "550+ Channels", additional: 544 },
    { label: "650+ Channels", additional: 644 },
    { label: "950+ Channels", additional: 944, suffix: "(HD Channels)" },
];

export default function CurrentChannel({ activeChannel }) {
    const baseImages = [
        "https://skylink.net.in/wp-content/uploads/2025/02/sun-tv.svg",
        "https://skylink.net.in/wp-content/uploads/2025/02/vijay-tv.webp",
        "https://skylink.net.in/wp-content/uploads/2025/02/zee-tamil.png",
    ];

    const extendedImages = [
        "https://skylink.net.in/wp-content/uploads/2025/02/colors-tv-channel.png",
        "https://skylink.net.in/wp-content/uploads/2025/03/Discovery_HD_World.png",
        "https://skylink.net.in/wp-content/uploads/2025/03/National_Geographic_Channel.svg.png",
        "https://www.skylink.net.in/wp-content/uploads/2025/02/star-sports-logo-channel.png"
    ];

    // ✅ Set default package to "350+ Channels"
    const [selectedPackage, setSelectedPackage] = useState(tvPackages[0]);

    useEffect(() => {

        const foundPackage = tvPackages.find((pkg) => pkg.label === activeChannel);

        if (foundPackage) {
            setSelectedPackage(foundPackage);
        }
    }, [activeChannel]); // ✅ No more warnings!

    return (
            <div className="tv-channel-image-wrap">
                {baseImages.map((src, index) => (
                    <img key={index} src={src} alt="TV Channel" />
                ))}
                {selectedPackage.label !== "350+ Channels" &&
                    extendedImages.map((src, index) => (
                        <img key={index} src={src} alt="TV Channel" />
                    ))}
                <p>
                    {/* + {selectedPackage.additional} Channels {selectedPackage.suffix || ""} */}
                </p>
            </div>
    );
}
