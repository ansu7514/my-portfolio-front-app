import { FILE_LOAD } from "../serverApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLayoutEffect, useState } from "react";

import LoginForm from "./LoginForm";

const HeaderInfo = () => {
    const info = useSelector((state: RootState) => state.user.info);
    const login = useSelector((state: RootState) => state.user.login);

    const [imgSrc, setImgSrc] = useState('');

    useLayoutEffect(() => {
        if (!login) setImgSrc('img/main_login.jpg');
        else {
            if (info?.image_path) setImgSrc(`${FILE_LOAD}/${info.image_path}`);
        }
    }, [info, login]);

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