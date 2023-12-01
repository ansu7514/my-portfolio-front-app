import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHECK, USER_CREATE, USER_LOGIN } from "../serverApi";
import { setSideMenuClick } from "../redux/reducer/SideMenuReducer";
import { setJoinState, setLogin, setUserInfo } from "../redux/reducer/UserReducer";

import Alert from "./Alert";

import { SideMenuStatus } from "../types/SideMenuType";

let debounce: null | NodeJS.Timeout = null;

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { joinState } = useSelector((state: RootState) => state.user);

    const [title, setTitle] = useState('LOGIN');

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const [checkID, setCheckId] = useState(false);
    const [checkPw, setCheckPW] = useState(true);

    useEffect(() => {
        setId('');
        setPw('');
        setConfirmPw('');

        if (joinState) {
            setTitle('JOIN US');
        } else {
            setTitle('LOGIN');
        }
    }, [joinState]);

    const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setId(value);

        if (joinState) {
            if (debounce) clearTimeout(debounce);
            if (value) {
                debounce = setTimeout(async () => {
                    try {
                        await fetch(
                            USER_CHECK,
                            { method: 'post', body: JSON.stringify({ user_id: value }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
                        ).then(res => res.json())
                            .then(response => {
                                const { success, data } = response;

                                if (success) {
                                    if (data !== 0) {
                                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 동일한 아이디가 있습니다', position: "bottom-center" });
                                        setCheckId(true);
                                    } else setCheckId(false);
                                }
                            });
                    } catch (e) {
                        console.error(e);
                    }
                }, 500);
            } else setCheckId(false);
        }
    };

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;

        if (type === 'pw') {
            setPw(value);

            if (value) {
                debounce = setTimeout(async () => {
                    if (value === confirmPw) setCheckPW(true);
                    else setCheckPW(false);
                }, 500);
            } else setCheckPW(true);
        } else {
            setConfirmPw(value);

            if (value) {
                debounce = setTimeout(async () => {
                    if (value === pw) setCheckPW(true);
                    else setCheckPW(false);
                }, 500);
            } else setCheckPW(true);
        }
    };

    const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') loginBtnClick();
    };

    const loginBtnClick = async () => {
        if (!id && id !== '') {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 아이디를 입력해주세요', position: "bottom-center" });
            return false;
        }

        if (!pw && pw !== '') {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 비밀번호를 입력해주세요', position: "bottom-center" });
            return false;
        }

        try {
            await fetch(
                USER_LOGIN,
                { method: 'post', body: JSON.stringify({ user_id: id, password: pw }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success) {
                        const { name, email, phone, job, birth, address, image_path } = data;

                        const imagePath = encodeURIComponent(image_path);

                        dispatch(setLogin(true));
                        dispatch(setJoinState(false));
                        dispatch(setJoinState(true));
                        dispatch(setUserInfo({ user_id: id, name, email, phone, job, birth, address, image_path: imagePath }));

                        if (!(name && email && job)) {
                            navigate('/setting');
                            dispatch(setSideMenuClick(SideMenuStatus.setting));
                        } else {
                            navigate('/home');
                            dispatch(setSideMenuClick(SideMenuStatus.home));
                        }
                    }
                });
        } catch (error) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 로그인에 실패했습니다', position: "bottom-center" });
            console.error(error);
        }
    };

    const joinBtnClick = () => {
        dispatch(setJoinState(true));
    };

    const accountBtnClick = async () => {
        if (checkID) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 동일한 아이디가 있습니다', position: "bottom-center" });
            return false;
        }

        try {
            await fetch(
                USER_CREATE,
                { method: 'post', body: JSON.stringify({ user_id: id, password: pw }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        dispatch(setLogin(true));
                        dispatch(setJoinState(true));
                        dispatch(setSideMenuClick(SideMenuStatus.setting));
                        dispatch(setUserInfo({ user_id: id, image_path: 'null' }));

                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 계정이 생성되었습니다', position: "bottom-center" });
                    }
                });
        } catch (error) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 계정 생성에 실패했습니다', position: "bottom-center" });
            console.error(error);
        }
    };

    return (
        <div className="login-form">
            <h2>{title}</h2>
            <div className="login-input-container">
                <div className="form-group form-group-with-icon">
                    <input id="login_id" type="text" name="id" className={`form-control login-input${checkID ? ' has-error' : ''}`} placeholder="ID" value={id} onChange={idChange} onKeyDown={enterPress} />
                    <input id="login_pw" type="password" name="pw" className="form-control login-input" placeholder="Password" value={pw} onChange={(e) => inputChange(e, 'pw')} onKeyDown={enterPress} />
                    {
                        joinState &&
                        <input id="login_pw_check" type="password" name="pw_check" className={`form-control login-input${!checkPw ? ' has-error' : ''}`} placeholder="Confirm Password" value={confirmPw} onChange={(e) => inputChange(e, 'confirmPw')} />
                    }
                </div>
            </div>
            <div className="header-buttons">
                {
                    !joinState &&
                    <>
                        <button className="btn btn-primary login-btn" onClick={loginBtnClick}>LOGIN</button>
                        <button className="btn btn-primary login-btn" onClick={joinBtnClick}>JOIN</button>
                    </>
                }
                {
                    joinState &&
                    <button className="btn btn-primary account-btn" onClick={accountBtnClick}>create account</button>
                }
            </div>
        </div>
    )
};

export default LoginForm;