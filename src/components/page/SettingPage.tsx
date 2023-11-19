/* eslint-disable no-useless-escape */
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { USER_UPDATE } from "../../serverApi";
import { useDispatch, useSelector } from "react-redux";
import { setPostPopup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";
import Calendar from "react-calendar";

import { SideMenuStatus } from "../../types/SideMenuType";
import { Value } from "react-calendar/dist/cjs/shared/types";

const SettingPage = () => {
    const dispatch = useDispatch();

    const postPopup = useSelector((state: RootState) => state.popup.postPopup);
    const postData = useSelector((state: RootState) => state.popupData.postData);
    const sideMenuStatus = useSelector((state: RootState) => state.sideMenu.sideMenuStatus);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState<Value>(new Date());
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('img/main_photo.jpg');
    const [inputFile, setInputFile] = useState<File | null>(null);

    const [checkEmail, setCheckEmail] = useState(false);

    useEffect(() => {
        if (email) {
            const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            setCheckEmail(regEmail.test(email));
        } else setCheckEmail(true);
    }, [email]);

    useEffect(() => {
        setAddress(postData);
    }, [postData]);

    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
        setPhone(value);
    };

    const birthChange = (value: Value) => {
        setBirth(value);
    };

    const addressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        if (!e.target.value) dispatch(setPostPopup(true));
    };

    const addressFocus = () => {
        if (address === '' && !postPopup) {
            dispatch(setPostPopup(true));
        }
    };

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        setInputFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<void>((resolve) => {
            reader.onload = () => {
                setImage(reader.result as string);
                resolve();
            };
        });
    };

    const saveBtnClick = async () => {
        if (!name && !email && !phone && !address) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 정보를 모두 입력해주세요', position: "bottom-center" });
            return false;
        }

        const formData = new FormData();

        const offset = (birth as Date).getTimezoneOffset();
        const reBrith = new Date((birth as Date).getTime() - (offset * 60 * 1000));
        const birthDate = reBrith.toISOString().split('T')[0];

        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('birth', birthDate);
        formData.append('address', address);
        if (inputFile) formData.append('input_file', inputFile);

        try {
            await fetch(
                USER_UPDATE,
                { method: 'post', body: formData }
            ).then(res => res.json())
                .then(response => {
                    console.log(response);
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 정보 수정에 실패했습니다', position: "bottom-center" });
        }
    };

    const sectionClassName = `animated-section${sideMenuStatus !== SideMenuStatus.setting ? '' : ' section-active'}`;

    return (
        <section className={sectionClassName}>
            <div className="section-content">
                <div className="page-title">
                    <h2>Setting</h2>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <div className="controls two-columns">
                            <div className="left-column">
                                <div className={`form-group form-group-with-icon${name ? ' form-group-focus' : ''}`}>
                                    <input id="name" type="text" name="name" className="form-control" value={name} onChange={nameChange} />
                                    <label>NAME</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${email ? ' form-group-focus' : ''}`}>
                                    <input id="email" type="text" name="email" className={`form-control${!checkEmail ? ' has-error' : ''}`} value={email} onChange={emailChange} />
                                    <label>E-MAIL</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${phone ? ' form-group-focus' : ''}`}>
                                    <input id="phone" type="text" name="phone" className="form-control" value={phone} onChange={phoneChange} />
                                    <label>PHONE NUMBER</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${birth ? ' form-group-focus' : ''}`}>
                                    <Calendar locale="en" className="form-control setting-calendar" value={birth} onChange={birthChange} />
                                    <label>BIRTH</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${address ? ' form-group-focus' : ''}`}>
                                    <input id="address" type="text" name="address" className="form-control" value={address} onChange={addressChange} onFocus={addressFocus} />
                                    <label>ADDRESS</label>
                                    <div className="form-control-border"></div>
                                </div>
                            </div>
                            <div className="right-column">
                                <div className="setting-photo-group">
                                    <div className="header-photo setting-photo">
                                        <img src={image} alt="user_img" />
                                    </div>
                                    <input id="photo-img" type="file" className="button btn-primary" accept="image/jpeg, image/gif, image/png" onChange={imageChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-center">
                        <button className="button btn-send" onClick={saveBtnClick}>Save</button>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SettingPage;