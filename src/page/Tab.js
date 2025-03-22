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
            <div className="tab-wrap" style={{ display: "flex" }}>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr className="main-title">
                                <td colSpan="2"><h1 style={{ textAlign: "left" }}>Our Affordable Internet Deals for Everyone</h1></td>
                            </tr>
                        </thead>
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
                <h1 style={{ fontSize: "24px" }}>Plan Details</h1>
                <CustomPlans></CustomPlans>
                </div>
            </div>
            <CustomPlansMobile></CustomPlansMobile>
        </>
    )
}