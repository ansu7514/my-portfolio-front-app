import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import PostPopup from "../components/popup/PostPopup";

const PopupList = () => {
    const popup = useSelector((state: RootState) => state.popup);
    const { postPopup } = useSelector((state: RootState) => state.popup);

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
        </>

    )
};

export default PopupList;