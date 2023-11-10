import HeaderInfo from "../components/HeaderInfo";
import SideMenu from "../components/menu/SideMenu";

const Header = () => {
    return (
        <header id="site_header" className="header mobile-menu-hide">
            <SideMenu />
            <HeaderInfo />
        </header>
    )
};

export default Header;