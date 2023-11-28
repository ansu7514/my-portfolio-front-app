import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import AboutMeTitle from "./AboutMeTitle";
import AboutMeTechStack from "./AboutMeTechStack";

import { SideMenuStatus } from "../../../types/SideMenuType";

const AboutMePage = () => {
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.aboutMe ? '' : ' section-active'}`

    return (
        <section data-id="about-me" className={sectionClassName}>
            <div className="section-content">
                <AboutMeTitle />
                <div className="white-space-50"></div>
                <AboutMeTechStack />
            </div>
        </section>
    )
};

export default AboutMePage;