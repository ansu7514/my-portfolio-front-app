/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { RESUME } from "../../../serverApi";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setExperienceList, setSchoolFromList, setSchoolList, setSchoolToList } from "../../../redux/reducer/ResumeReducer";

import ResumeEducation from "./ResumeEducation";
import ResumeExperience from "./ResumeExperience";

import { schoolApiType } from "../../../types/ResumeType";
import { SideMenuStatus } from "../../../types/SideMenuType";
import { ResumeEducationTableType } from "../../../types/DB/ResumeTableType";

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

                    if (success) {
                        const educationData = data as Array<ResumeEducationTableType>;

                        const schoolList = educationData.map(({ school }) => JSON.parse(school) as schoolApiType);
                        const schoolFromList = educationData.map(({ school_from }) => school_from);
                        const schoolToList = educationData.map(({ school_to }) => school_to);

                        dispatch(setSchoolList(schoolList));
                        dispatch(setSchoolFromList(schoolFromList));
                        dispatch(setSchoolToList(schoolToList));
                    }
                });
        } catch (error) {
            console.error(error);
        }

        try {
            await fetch(
                `${RESUME}/experience/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success) dispatch(setExperienceList(data));
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
                <div className="row">
                    <div className="col-xs-12 col-sm-7">
                        <ResumeEducation />
                        <div className="white-space-50" />
                        <ResumeExperience />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ResumePage;