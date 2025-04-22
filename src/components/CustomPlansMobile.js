import React, { useState } from 'react'
import Speed from './Speed'
import BilledCycle from './BilledCycle'
import Channel from './Channel'
import Ott from './Ott'
import PlanHighlights from './PlanHighlights'
import CustomPlans from './CustomPlans'
export default function CustomPlansMobile() {
  const [activePlan, setActivePlan] = useState("fixed");
  return (
    <>
      <div className="mobile-wrap" style={{ display: "none" }}>
        <div className="fixedPlan">
          <div className="mpbs-tabs">
            <Speed></Speed>
            <BilledCycle></BilledCycle>
            <Channel></Channel>
            <Ott></Ott>
          </div>
          <table>
            <thead></thead>
            <tbody>
              <PlanHighlights></PlanHighlights>
            </tbody>
          </table>
          <CustomPlans></CustomPlans>
        </div>
      </div>
    </>
  )
}
