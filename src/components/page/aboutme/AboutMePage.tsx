/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ABOUT_ME } from "../../../serverApi";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setTechStack } from "../../../redux/reducer/UserReducer";

import AboutMeTitle from "./AboutMeTitle";
import AboutMeTechStack from "./AboutMeTechStack";

import { SideMenuStatus } from "../../../types/SideMenuType";

const AboutMePage = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id);
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const [title, setTitle] = useState('');

    useEffect(() => {
        getAboutMe();
    }, []);

    const getAboutMe = async () => {
        try {
            await fetch(
                `${ABOUT_ME}/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(resopnse => {
                    const { success, data } = resopnse;

                    if (success) {
                        const { title, tech_stack } = data;

                        const techStack = tech_stack.split(',');

                        setTitle(title);
                        dispatch(setTechStack(techStack));
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
            </div>
        </section>
    )
};

export default AboutMePage;