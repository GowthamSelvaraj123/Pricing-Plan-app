import React from 'react'
import Speed from '../components/Speed'
import BilledCycle from '../components/BilledCycle'
import Channel from '../components/Channel'
import Ott from '../components/Ott'
import PlanHighlights from '../components/PlanHighlights'
import CustomPlans from '../components/CustomPlans'
import CustomPlansMobile from '../components/CustomPlansMobile'

export default function Tab() {
    return (
        <>
                    <h1 style={{ textAlign: "left" }}>Get Customize Plans</h1>
            <div className="tab-wrap" style={{ display: "flex" }}>
                <div className="table-wrap">
                    <table>
                        <tbody>
                            <tr className="speed-tabs-wrapper">
                                <td colSpan="2">
                                    <Speed></Speed>
                                    <BilledCycle></BilledCycle>
                                    <Channel></Channel>
                                    <Ott></Ott>
                                </td>
                            </tr>
                            <PlanHighlights></PlanHighlights>
                        </tbody>
                    </table>
                </div>
                <div className="custom-plans">
                <CustomPlans></CustomPlans>
                </div>
            </div>
            <CustomPlansMobile></CustomPlansMobile>
        </>
    )
}