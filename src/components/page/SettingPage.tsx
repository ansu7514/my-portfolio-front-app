/* eslint-disable no-useless-escape */
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPostPopup } from "../../redux/reducer/PopupReducer";

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
                                    <input id="name" type="text" name="name" className="form-control" placeholder="" value={name} onChange={nameChange} />
                                    <label>NAME</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${email ? ' form-group-focus' : ''}`}>
                                    <input id="email" type="text" name="email" className={`form-control${!checkEmail ? ' has-error' : ''}`} placeholder="" value={email} onChange={emailChange} />
                                    <label>E-MAIL</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${phone ? ' form-group-focus' : ''}`}>
                                    <input id="phone" type="text" name="phone" className="form-control" placeholder="" value={phone} onChange={phoneChange} />
                                    <label>PHONE NUMBER</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${birth ? ' form-group-focus' : ''}`}>
                                    <Calendar locale="en" className="form-control setting-calendar" value={birth} onChange={birthChange} />
                                    <label>BIRTH</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon${address ? ' form-group-focus' : ''}`}>
                                    <input id="address" type="text" name="address" className="form-control" placeholder="" value={address} onChange={addressChange} onFocus={addressFocus} />
                                    <label>ADDRESS</label>
                                    <div className="form-control-border"></div>
                                </div>
                            </div>
                            <div className="right-column">
                                <div className="header-content">
                                    <div className="header-photo setting-photo">
                                        <img src="img/main_photo.jpg" alt="user_img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-center">
                        <button className="button btn-send">Save</button>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SettingPage;