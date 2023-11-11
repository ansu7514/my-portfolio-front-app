import HeaderInfo from "../components/HeaderInfo";
import SideMenu from "../components/menu/SideMenu";

const Header = () => {
    return (
        <header id="site_header" className="header mobile-menu-hide">
            <SideMenu />
            <HeaderInfo />
            <div className="copyrights">© 2023 All rights reserved.</div>
        </header>
    )
};

export default Header;