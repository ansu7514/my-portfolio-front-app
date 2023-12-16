import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import { SideMenuStatus } from "../../../types/SideMenuType";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

const PortfolioPage = () => {
    const dispatch = useDispatch();

    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const addBtnClick = () => {
        dispatch(setPopuup(['portfolioPopup', true]));
    };
    
    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.portfolio ? '' : ' section-active'}`;

    return (
        <section data-id="portfolio" className={sectionClassName}>
            <div className="section-content">
                <div className="edit-title">
                    <div className="page-title">
                        <h3>Portfolio</h3>
                    </div>
                    <button className="button btn-sm btn-secondary" onClick={addBtnClick}>ADD</button>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <div className="portfolio-content">
                            <div className="portfolio-grid three-columns">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default PortfolioPage;