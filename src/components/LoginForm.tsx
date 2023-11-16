import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJoinState } from "../redux/reducer/UserReducer";
import Alert from "./Alert";

const LoginForm = () => {
    const dispatch = useDispatch();

    const { joinState } = useSelector((state: RootState) => state.user);

    const [title, setTitle] = useState('LOGIN');

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    useEffect(() => {
        setId('');
        setPw('');

        if (joinState) {
            setTitle('JOIN US');
        } else {
            setTitle('LOGIN');
        }
    }, [joinState]);

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;

        switch (type) {
            case 'id':
                return setId(value);
            case 'pw':
                return setPw(value);
            case 'confirmPw':
                return setConfirmPw(value);
            default:
                break;
        }
    };

    const loginBtnClick = () => {
        dispatch(setJoinState(false));
    };

    const joinBtnClick = () => {
        dispatch(setJoinState(true));
    };

    const accountBtnClick = async () => {
    };

    return (
        <div className="login-form">
            <h2>{title}</h2>
            <div className="login-input-container">
                <div className="form-group form-group-with-icon">
                    <input id="login_id" type="text" name="id" className="form-control login-input" placeholder="ID" required value={id} onChange={(e) => inputChange(e, 'id')} />
                    <input id="login_pw" type="password" name="pw" className="form-control login-input" placeholder="Password" required value={pw} onChange={(e) => inputChange(e, 'pw')} />
                    {
                        joinState &&
                        <input id="login_pw_check" type="password" name="pw_check" className="form-control login-input" placeholder="Confirm Password" required value={confirmPw} onChange={(e) => inputChange(e, 'confirmPw')} />
                    }
                </div>
            </div>
            <div className="header-buttons">
                {
                    !joinState &&
                    <>
                        <button className="btn btn-primary login-btn" onClick={loginBtnClick}>login</button>
                        <button className="btn btn-primary login-btn" onClick={joinBtnClick}>join</button>
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