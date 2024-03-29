import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import TechStackPopup from "../components/popup/TechStackPopup";
import FunFactPopup from "../components/popup/FunFactsPopup";
import EducationPopup from "../components/popup/EducationPopup";
import ExperiencePopup from "../components/popup/ExperiencePopup";
import CertificatePopup from "../components/popup/CertificatePopup";
import PortfolioPopup from "../components/popup/PortfolioPopup";
import PostPopup from "../components/popup/PostPopup";

const PopupList = () => {
    const popup = useSelector((state: RootState) => state.popup);

    const [backGround, setBackGround] = useState(false);

    useEffect(() => {
        const keyList = Object.keys(popup);

        let checkFlag = false;
        keyList.forEach(key => {
            if (popup[key]) checkFlag = true;
        });

        setBackGround(checkFlag);
    }, [popup]);

    return (
        <>
            {backGround && <div className="mfp-bg mfp-fade mfp-ready"></div>}
            {popup.techStackPopup && <TechStackPopup />}
            {popup.funFactPopup && <FunFactPopup />}
            {popup.educationPopup && <EducationPopup />}
            {popup.experiencePopup && <ExperiencePopup />}
            {popup.certificatePopup && <CertificatePopup />}
            {popup.portfolioPopup && <PortfolioPopup />}
            {popup.postPopup && <PostPopup />}
        </>

    )
};

export default PopupList;