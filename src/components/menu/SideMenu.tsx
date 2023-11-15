import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SideMenuStatus } from "../../types/SideMenuType";

import { setSideMenuClick } from "../../redux/reducer/SideMenuReducer";

const SideMenu = () => {
    const dispatch = useDispatch();

    const login = useSelector((state: RootState) => state.user.login);

    const menuBtnClick = (state: SideMenuStatus) => {
        dispatch(setSideMenuClick(state));
    };

    return (
        <ul className="main-menu">
            <li className="active" onClick={() => menuBtnClick(SideMenuStatus.home)}>
                <a href="#home" className="nav-anim active">
                    <span className="menu-icon lnr lnr-home"></span>
                    <span className="link-text">Home</span>
                </a>
            </li>
            {
                login &&
                <>
                    <li className="active">
                        <a href="#about-me" className="nav-anim">
                            <span className="menu-icon lnr lnr-user"></span>
                            <span className="link-text">About Me</span>
                        </a>
                    </li>
                    <li className="active">
                        <a href="#resume" className="nav-anim">
                            <span className="menu-icon lnr lnr-graduation-hat"></span>
                            <span className="link-text">Resume</span>
                        </a>
                    </li>
                    <li className="active">
                        <a href="#portfolio" className="nav-anim">
                            <span className="menu-icon lnr lnr-briefcase"></span>
                            <span className="link-text">Portfolio</span>
                        </a>
                    </li>
                    <li className="active">
                        <a href="#blog" className="nav-anim">
                            <span className="menu-icon lnr lnr-book"></span>
                            <span className="link-text">Blog</span>
                        </a>
                    </li>
                    <li className="active">
                        <a href="#contact" className="nav-anim">
                            <span className="menu-icon lnr lnr-envelope"></span>
                            <span className="link-text">Contact</span>
                        </a>
                    </li>
                </>
            }
        </ul>
    )
};

export default SideMenu;