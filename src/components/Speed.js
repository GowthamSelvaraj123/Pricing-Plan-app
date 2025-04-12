import React from 'react';
import { usePlans } from '../PlansContext';

export default function Speed() {
  const { planOptions: { speeds, pricing }, activeTab, setActiveTab, activeNestedTab, setActiveNestedTab, setCheckCondition, setActiveChannel, setActiveOtts } = usePlans();

  return (
    <>
      <h3 style={{ marginTop: "0px" }}>Pick Your Perfect BandWidth</h3>
      <div className="wrapforplans">
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
