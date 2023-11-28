import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import PostPopup from "../components/popup/PostPopup";
import TechStackPopup from "../components/popup/TechStackPopup";

const PopupList = () => {
    const popup = useSelector((state: RootState) => state.popup);
    const { techStackPopup, postPopup } = useSelector((state: RootState) => state.popup);

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
            {postPopup && <PostPopup />}
            {techStackPopup && <TechStackPopup />}
        </>

    )
};

export default PopupList;