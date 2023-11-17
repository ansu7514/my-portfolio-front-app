import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HomePage from "../components/page/HomePage";
import SettingPage from "../components/page/SettingPage";

const Content = () => {
    const login = useSelector((state: RootState) => state.user.login);

    return (
        <div className="content-area">
            <div className="animated-sections">
                {
                    login &&
                    <>
                        <HomePage />
                        <SettingPage />
                    </>
                }
                {
                    !login &&
                    <section className="animated-section start-page section-active">
                        <div className="section-content vcentered">
                        </div>
                    </section>
                }
            </div>
        </div>
    )
};

export default Content;