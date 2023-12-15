import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { SideMenuStatus } from "../../../types/SideMenuType";

const PortfolioPage = () => {
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.portfolio ? '' : ' section-active'}`

    return (
        <section data-id="portfolio" className={sectionClassName}>
            <div className="section-content">
                
            </div>
        </section>
    )
};

export default PortfolioPage;