/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FILE_LOAD, PORTFOLIO } from "../../../serverApi";
import { setPopuup } from "../../../redux/reducer/PopupReducer";
import { setPortfolioList, setPortfolioId, setPortfolioUpload } from "../../../redux/reducer/PortfolioReducer";

import { SideMenuStatus } from "../../../types/SideMenuType";

const PortfolioPage = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id) || '';
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);
    const portfolioList = useSelector((state: RootState) => state.portfolio.portfolioList) || [];

    useEffect(() => {
        getPortfolio();
    }, []);

    const getPortfolio = async () => {
        try {
            await fetch(
                `${PORTFOLIO}/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success) dispatch(setPortfolioList(data));
                });
        } catch (error) {
            console.error(error);
        }
    };

    const addBtnClick = () => {
        dispatch(setPortfolioId(0));
        dispatch(setPortfolioUpload(false));
        dispatch(setPopuup(['portfolioPopup', true]));
    };

    const portfolioDataList = portfolioList.map(portfolio => {
        const { portfolio_id, title, image, image_path } = portfolio;

        const showPortfolioPopup = () => {
            dispatch(setPortfolioId(portfolio_id));
            dispatch(setPortfolioUpload(true));
            dispatch(setPopuup(['portfolioPopup', true]));
        };

        let imageSrc = 'img/portfolio/1.jpg';
        if (image && image_path) {
            const imagePath = encodeURIComponent(image_path);
            imageSrc = FILE_LOAD + `/${imagePath}`;
        }

        const editBtnClick = () => {
            dispatch(setPortfolioId(portfolio_id));
            dispatch(setPortfolioUpload(false));
            dispatch(setPopuup(['portfolioPopup', true]));
        };

        return (
            <figure key={`${portfolio_id}_${title}`} className="item standard protfolio-div">
                <div className="portfolio-item-img" onClick={showPortfolioPopup}>
                    <img src={imageSrc} alt={image} />
                </div>
                <i className="fa fa-edit" onClick={editBtnClick}></i>
                <h4 className="name">{title}</h4>
            </figure>
        )
    });

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
                                {portfolioDataList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default PortfolioPage;