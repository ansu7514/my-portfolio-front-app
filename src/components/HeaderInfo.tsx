import { FILE_LOAD } from "../serverApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLayoutEffect, useState } from "react";

import LoginForm from "./LoginForm";

const HeaderInfo = () => {
    const login = useSelector((state: RootState) => state.user.login);
    const userInfo = useSelector((state: RootState) => state.user.info);

    const [imgSrc, setImgSrc] = useState('');

    useLayoutEffect(() => {
        if (!login) setImgSrc('img/main_login.jpg');
        else {
            if (userInfo && userInfo.image_path !== "null") setImgSrc(`${FILE_LOAD}/${userInfo.image_path}`);
            else setImgSrc('img/main_photo.jpg');
        }
    }, [userInfo, login]);

    return (
        <div className="header-content">
            <div className="header-photo">
                <img src={imgSrc} alt="user_img" />
            </div>
            <div className="header-titles">
                {!login && <LoginForm />}
            </div>
        </div>
    )
};

export default HeaderInfo;