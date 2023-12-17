import { FILE_LOAD } from "../serverApi";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../redux/reducer/UserReducer";
import { resetPopup } from "../redux/reducer/PopupReducer";
import { resetResume } from "../redux/reducer/ResumeReducer";
import { resetAboutMe } from "../redux/reducer/AboutMeReducer";
import { resetPopupData } from "../redux/reducer/PopupDataReducer";
import { resetPortfolio } from "../redux/reducer/PortfolioReducer";
import { setSideMenuClick } from "../redux/reducer/SideMenuReducer";
import { resetLoading, setLoading } from "../redux/reducer/LoadingReducer";

import LoginForm from "./LoginForm";

import { SideMenuStatus } from "../types/SideMenuType";

const HeaderInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useSelector((state: RootState) => state.user.login);
    const userInfo = useSelector((state: RootState) => state.user.info);

    const [imgSrc, setImgSrc] = useState('');

    useLayoutEffect(() => {
        if (!login) setImgSrc('img/main_login.jpg');
        else {
            if (userInfo && userInfo.image_path !== "null") setImgSrc(`${FILE_LOAD}/${userInfo.image_path}`);
            else setImgSrc('img/testimonials/testimonial-1.jpg');
        }
    }, [userInfo, login]);

    const logoutBtnClick = () => {
        dispatch(setLoading());

        dispatch(resetAboutMe());
        dispatch(resetPopupData());
        dispatch(resetPopup());
        dispatch(resetPortfolio());
        dispatch(resetResume());
        dispatch(setSideMenuClick(SideMenuStatus.home));
        dispatch(resetUser());

        navigate('/');

        dispatch(resetLoading());
    };

    return (
        <>
            <div className="header-content">
                <div className="header-photo">
                    <img src={imgSrc} alt="user_img" />
                </div>
                <div className="header-titles">
                    {!login && <LoginForm />}
                    {
                        login &&
                        <>
                            <h2>{userInfo?.name}</h2>
                            <h4>{userInfo?.job}</h4>
                        </>
                    }
                </div>
            </div>
            {
                login &&
                <div className="header-buttons">
                    <button className="btn btn-primary" onClick={logoutBtnClick}>LOGOUT</button>
                </div>
            }
        </>
    )
};

export default HeaderInfo;