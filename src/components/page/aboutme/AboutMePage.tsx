import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { SideMenuStatus } from "../../../types/SideMenuType";
import AboutMeTitle from "./AboutMeTitle";

const AboutMePage = () => {
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.aboutMe ? '' : ' section-active'}`

    return (
        <section data-id="about-me" className={sectionClassName}>
            <div className="section-content">
                <div className="page-title">
                    <h2>About <span>Me</span></h2>
                </div>
                <AboutMeTitle />
                <div className="white-space-50"></div>
            </div>
        </section>
    )
};

export default AboutMePage;