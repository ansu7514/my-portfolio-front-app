/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ABOUT_ME } from "../../../serverApi";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setTechStack } from "../../../redux/reducer/UserReducer";

import AboutMeTitle from "./AboutMeTitle";
import AboutMeFunFact from "./AboutMeFunFacts";
import AboutMeTechStack from "./AboutMeTechStack";

import { jobList } from "../setting/SettingPage";
import { backTechs, designTechs, frontTechs } from "../../popup/TechStackPopup";

import { SideMenuStatus } from "../../../types/SideMenuType";
import { UserTableType } from "../../../types/DB/UserTableType";

const AboutMePage = () => {
    const dispatch = useDispatch();

    const userInfo = useSelector((state: RootState) => state.user.info) as UserTableType;
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const [title, setTitle] = useState('');

    useEffect(() => {
        getAboutMe();
    }, [userInfo]);

    const getAboutMe = async () => {
        try {
            await fetch(
                `${ABOUT_ME}/:${userInfo.user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(resopnse => {
                    const { success, data } = resopnse;

                    if (success) {
                        const { title, tech_stack } = data;

                        setTitle(title);

                        let techList: Array<string> = [];
                        if (userInfo.job === jobList[1]) techList = frontTechs;
                        else if (userInfo.job === jobList[2]) techList = backTechs;
                        else if (userInfo.job === jobList[3]) techList = designTechs;

                        const techStack = tech_stack.split(',');

                        if (techList.includes(techStack[0])) {
                            dispatch(setTechStack(techStack));
                        } else {
                            dispatch(setTechStack([]));
                        }
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.aboutMe ? '' : ' section-active'}`;

    return (
        <section data-id="about-me" className={sectionClassName}>
            <div className="section-content">
                <AboutMeTitle title={title} setTitle={setTitle} />
                <div className="white-space-50"></div>
                <AboutMeTechStack />
                <div className="white-space-50"></div>
                <AboutMeFunFact />
            </div>
        </section>
    )
};

export default AboutMePage;