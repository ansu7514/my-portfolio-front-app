/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { RESUME } from "../../../serverApi";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import ResumeEducation from "./ResumeEducation";

import { SideMenuStatus } from "../../../types/SideMenuType";

const ResumePage = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id) || '';
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.resume ? '' : ' section-active'}`;

    useEffect(() => {
        getResume();
    }, []);

    const getResume = async () => {
        try {
            await fetch(
                `${RESUME}/education/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success && data.length) {
                        const { school, school_from, school_to } = data;

                        // dispatch(setSchools(shcool));
                        // dispatch(setSchoolFromList(from));
                        // dispatch(setSchoolFromList(to));
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section data-id="about-me" className={sectionClassName}>
            <div className="section-content">
                <div className="page-title">
                    <h2>Resume</h2>
                </div>
                <ResumeEducation />
            </div>
        </section>
    )
};

export default ResumePage;