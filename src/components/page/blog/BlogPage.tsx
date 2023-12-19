import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

import { SideMenuStatus } from "../../../types/SideMenuType";

const BlogPage = () => {
    const navigate = useNavigate();

    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const writeBtnClick = () => {
        navigate("/blog/write");
    };

    const sectionClassName = `animated-section start-page${sideMenuStatus !== SideMenuStatus.blog ? '' : ' section-active'}`;

    return (
        <section data-id="blog" className={sectionClassName}>
            <div className="section-content">
                <div className="edit-title">
                    <div className="page-title">
                        <h2>Blog</h2>
                    </div>
                    <button className="button btn-sm btn-secondary" onClick={writeBtnClick}>WRITE</button>
                </div>
            </div>
        </section>
    )
};

export default BlogPage;