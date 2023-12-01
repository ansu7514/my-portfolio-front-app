import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { SideMenuStatus } from "../../../types/SideMenuType";

const ResumePage = () => {
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.resume ? '' : ' section-active'}`;

    return (
        <section data-id="about-me" className={sectionClassName}>
            <div className="section-content">
                <div className="page-title">
                    <h2>Resume</h2>
                </div>
            </div>
        </section>
    )
};

export default ResumePage;