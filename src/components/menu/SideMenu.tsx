import { RootState } from "../../redux/store";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setJoinState } from "../../redux/reducer/UserReducer";
import { setSideMenuClick } from "../../redux/reducer/SideMenuReducer";
import { resetLoading, setLoading } from "../../redux/reducer/LoadingReducer";

import Alert from "../Alert";

import { SideMenuStatus } from "../../types/SideMenuType";

const SideMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useSelector((state: RootState) => state.user.login);
    const userInfo = useSelector((state: RootState) => state.user.info);
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const menuBtnClick = (state: SideMenuStatus) => {
        dispatch(setLoading());

        if (userInfo && !(userInfo.name && userInfo.email && userInfo.job)) {
            navigate('/setting');
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 유저 정보 작성이 필요합니다', position: "bottom-center" });
            return false;
        }

        dispatch(setSideMenuClick(state));

        if (state === SideMenuStatus.home) {
            dispatch(setJoinState(false));
        }

        dispatch(resetLoading());
    };

    return (
        <ul className="main-menu">
            <li onClick={() => menuBtnClick(SideMenuStatus.home)}>
                <Link to={!login ? "/" : "/home"} className={`nav-anim${sideMenuStatus === SideMenuStatus.home ? ' active' : ''}`}>
                    <span className="menu-icon lnr lnr-home"></span>
                    <span className="link-text">Home</span>
                </Link>
            </li>
            {
                login &&
                <>
                    <li onClick={() => menuBtnClick(SideMenuStatus.aboutMe)}>
                        <Link to="aboutme" className={`nav-anim${sideMenuStatus === SideMenuStatus.aboutMe ? ' active' : ''}`}>
                            <span className="menu-icon lnr lnr-user"></span>
                            <span className="link-text">About Me</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#resume" className="nav-anim">
                            <span className="menu-icon lnr lnr-graduation-hat"></span>
                            <span className="link-text">Resume</span>
                        </a>
                    </li>
                    <li>
                        <a href="#portfolio" className="nav-anim">
                            <span className="menu-icon lnr lnr-briefcase"></span>
                            <span className="link-text">Portfolio</span>
                        </a>
                    </li>
                    <li>
                        <a href="#blog" className="nav-anim">
                            <span className="menu-icon lnr lnr-book"></span>
                            <span className="link-text">Blog</span>
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="nav-anim">
                            <span className="menu-icon lnr lnr-envelope"></span>
                            <span className="link-text">Contact</span>
                        </a>
                    </li>
                    <li onClick={() => menuBtnClick(SideMenuStatus.setting)}>
                        <Link to="/setting" className={`nav-anim${sideMenuStatus === SideMenuStatus.setting ? ' active' : ''}`}>
                            <span className="menu-icon lnr lnr-cog"></span>
                            <span className="link-text">Setting</span>
                        </Link>
                    </li>
                </>
            }
        </ul>
    )
};

export default SideMenu;