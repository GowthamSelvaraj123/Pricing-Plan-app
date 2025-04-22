import React from 'react';
import { usePlans } from '../PlansContext';

export default function Speed() {
  const { planOptions: { speeds, pricing }, activeTab, setActiveTab, activeNestedTab, setActiveNestedTab, setActiveChannel, setActiveOtts } = usePlans();

  return (
    <>
      <h3 style={{ marginTop: "0px" }}>Choose Your BandWidth</h3>
      <div className="wrapforplans blue">
        <div className="mbps-wrap">
          {speeds.map((speed) => (
            <div
              key={speed}
              className={`mpbstab ${speed === activeTab ? 'mbps-active' : ''}`}
              onClick={() => {
                setActiveTab(speed);
                setActiveNestedTab(activeNestedTab);
                setActiveChannel(prevChannel => pricing[speed]?.[activeNestedTab]?.tv || prevChannel);
                setActiveOtts(prevOTT => pricing[speed]?.[activeNestedTab]?.ott || prevOTT);
              }}
            >
              {speed}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
