import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { SideMenuStatus } from "../../../types/SideMenuType";
import { UserTableType } from "../../../types/DB/UserTableType";

const HomePage = () => {
    const { name, job } = useSelector((state: RootState) => state.user.info) as UserTableType;
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.home ? '' : ' section-active'}`

    return (
        <section data-id="home" className={sectionClassName}>
            <div className="section-content vcentered">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="title-block">
                            <h2>{name}</h2>
                            <div className="owl-carousel text-rotation">
                                <div className="item">
                                    <div className="sp-subtitle">{job}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default HomePage;