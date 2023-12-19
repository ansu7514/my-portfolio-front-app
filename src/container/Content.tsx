import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../components/page/home/HomePage";
import AboutMePage from "../components/page/aboutme/AboutMePage";
import ResumePage from "../components/page/resume/ResumePage";
import PortfolioPage from "../components/page/portfolio/PortfolioPage";
import BlogPage from "../components/page/blog/BlogPage";
import BlogWrite from "../components/page/blog/BlogWrite";
import SettingPage from "../components/page/setting/SettingPage";

const Content = () => {
    const login = useSelector((state: RootState) => state.user.login);

    return (
        <div className="content-area">
            <div className="animated-sections">
                <Routes>
                    {
                        login &&
                        <>
                            <Route path="/" element={<Navigate replace to="/home" />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/aboutme" element={<AboutMePage />} />
                            <Route path="/resume" element={<ResumePage />} />
                            <Route path="/portfolio" element={<PortfolioPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/write" element={<BlogWrite />} />
                            <Route path="/setting" element={<SettingPage />} />
                        </>
                    }
                    {
                        !login &&
                        <Route path="/" element={
                            <section className="animated-section start-page section-active">
                                <div className="section-content vcentered">
                                </div>
                            </section>
                        }>
                        </Route>
                    }
                </Routes>
            </div>
        </div>
    )
};

export default Content;