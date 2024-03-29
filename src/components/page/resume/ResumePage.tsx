/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import { ABOUT_ME, RESUME } from "../../../serverApi";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";
import { setTechStacks } from "../../../redux/reducer/AboutMeReducer";
import { setCertificateList, setExperienceList, setSchoolFromList, setSchoolList, setSchoolToList, setSkillPercentList } from "../../../redux/reducer/ResumeReducer";

import ResumeEducation from "./ResumeEducation";
import ResumeExperience from "./ResumeExperience";
import ResumeCodingSkills from "./ResumeCodingSkills";
import ResumeCertificates from "./ResumeCertificates";

import { jobList } from "../setting/SettingPage";
import { backTechs, designTechs, frontTechs } from "../../popup/TechStackPopup";

import { schoolApiType } from "../../../types/ResumeType";
import { SideMenuStatus } from "../../../types/SideMenuType";
import { UserTableType } from "../../../types/DB/UserTableType";
import { ResumeEducationTableType } from "../../../types/DB/ResumeTableType";

const ResumePage = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id) || '';
    const userInfo = useSelector((state: RootState) => state.user.info) as UserTableType;
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.resume ? '' : ' section-active'}`;

    useEffect(() => {
        getResume();
        getAboutMe();
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

        try {
            await fetch(
                `${RESUME}/skill/:${user_id}`,
                { method: 'get', headers: { 'Context-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success) dispatch(setSkillPercentList(data));
                });
        } catch (error) {
            console.error(error);
        }

        try {
            await fetch(
                `${RESUME}/certificate/:${user_id}`,
                { method: 'get', headers: { 'Context-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;
                    
                    if (success) dispatch(setCertificateList(data));
                });
        } catch (error) {
            console.error(error);
        }
    };

    const getAboutMe = async () => {
        try {
            await fetch(
                `${ABOUT_ME}/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(resopnse => {
                    const { success, data } = resopnse;

                    if (success) {
                        const { tech_stacks } = data;

                        let techList: Array<string> = [];
                        if (userInfo.job === jobList[1]) techList = frontTechs;
                        else if (userInfo.job === jobList[2]) techList = backTechs;
                        else if (userInfo.job === jobList[3]) techList = designTechs;

                        const techStacks = tech_stacks.split(',');

                        if (techList.includes(techStacks[0])) {
                            dispatch(setTechStacks(techStacks));
                        } else {
                            dispatch(setTechStacks([]));
                        }
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    const certificateAddBtnClick = () => {
        dispatch(setPopuup(['certificatePopup', true]));
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
                    <div className="col-xs-12 col-sm-5">
                        <ResumeCodingSkills />
                    </div>
                </div>
                <div className="white-space-50"></div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <div className="edit-title">
                            <div className="block-title">
                                <h3>Certificates</h3>
                            </div>
                            <button className="button btn-sm btn-secondary" onClick={certificateAddBtnClick}>ADD</button>
                        </div>
                    </div>
                </div>
                <ResumeCertificates />
            </div>
        </section>
    )
};

export default ResumePage;