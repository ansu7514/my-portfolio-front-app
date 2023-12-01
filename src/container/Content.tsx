import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../components/page/home/HomePage";
import AboutMePage from "../components/page/aboutme/AboutMePage";
import SettingPage from "../components/page/setting/SettingPage";
import ResumePage from "../components/page/resume/ResumePage";

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
                            <Route path="/home" element={<HomePage />}></Route>
                            <Route path="/aboutme" element={<AboutMePage />}></Route>
                            <Route path="/resume" element={<ResumePage />}></Route>
                            <Route path="/setting" element={<SettingPage />}></Route>
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