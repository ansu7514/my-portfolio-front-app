import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RESUME_EXPERIENCE_CREATE } from "../../serverApi";
import { setPopuup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";
import { format } from "date-fns";
import Calendar from "react-calendar";

import { Value } from "react-calendar/dist/cjs/shared/types";
import { setPostData } from "../../redux/reducer/PopupDataReducer";

const ExperiencePopup = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id);
    const postPopup = useSelector((state: RootState) => state.popup.postPopup);
    const postData = useSelector((state: RootState) => state.popupData.postData);

    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [showCal, setShowCal] = useState('');
    const [calDate, setCalDate] = useState<Value>(new Date());

    useEffect(() => {
        if (showCal === 'from' && from !== '') setCalDate(new Date(from));
        else if (showCal === 'to' && to !== '') setCalDate(new Date(to));
        else setCalDate(new Date());
    }, [from, showCal, to]);

    useEffect(() => {
        setAddress(postData);
    }, [postData]);

    const closePopup = () => {
        dispatch(setPostData(''));
        dispatch(setPopuup(['experiencePopup', false]));
    };

    const closeBtnClick = () => {
        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '이력 정보가 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
    };

    const companyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value);
    };

    const addressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        if (!e.target.value) dispatch(setPopuup(['postPopup', true]));
    };

    const addressFocus = () => {
        if (address === '' && !postPopup) {
            dispatch(setPopuup(['postPopup', true]));
        }
    };

    const setFocus = (type: string) => {
        setShowCal(type);
    };

    const dateChange = (value: Value) => {
        const date = format(value as Date, 'yyyy-MM-dd');

        if (showCal === 'from') setFrom(date);
        else if (showCal === 'to') setTo(date);

        setShowCal('');
    };

    const saveBtnClick = async () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const experience_to = today <= to ? 'Current' : to;

        const insertData = {
            user_id, company, address,
            experience_from: from, experience_to
        };

        try {
            await fetch(
                RESUME_EXPERIENCE_CREATE,
                { method: 'post', body: JSON.stringify(insertData), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 이력 정보 생성에 성공했습니다', position: "bottom-center" });

                        closePopup();
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 이력 정보 생성에 실패했습니다.', checkClick: closePopup, position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 이력 정보 생성에 실패했습니다.', checkClick: closePopup, position: "bottom-center" });
        }
    };

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <div className="row resume-popup-con">
                        <div className="col-xs-12 col-sm-12">
                            <div className="fun-fact gray-default experience-cal-div">
                                <div className={`form-group form-group-with-icon experience-input${company ? ' form-group-focus' : ''}`}>
                                    <input id="company" type="text" name="company" className="form-control" value={company || ""} onChange={companyChange} />
                                    <label>COMPANY</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon experience-input${address ? ' form-group-focus' : ''}`}>
                                    <input id="address" type="text" name="address" className="form-control" value={address || ""} onChange={addressChange} onFocus={addressFocus} />
                                    <label>ADDRESS</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className="experience-cal-input">
                                    <div className={`form-group form-group-with-icon experience-input${from ? ' form-group-focus' : ''}`} onFocus={() => setFocus('from')}>
                                        <input id="from" type="text" name="from" className="form-control" defaultValue={from || ""} />
                                        <label>FROM</label>
                                        <div className="form-control-border"></div>
                                    </div>
                                    <div className={`form-group form-group-with-icon experience-input${to ? ' form-group-focus' : ''}`} onFocus={() => setFocus('to')}>
                                        <input id="to" type="text" name="to" className="form-control" defaultValue={to || ""} />
                                        <label>TO</label>
                                        <div className="form-control-border"></div>
                                    </div>
                                </div>
                                {
                                    showCal &&
                                    <div className="form-group form-group-with-icon form-group-focus">
                                        <Calendar locale="en" className="form-control setting-calendar" defaultValue={calDate} onChange={dateChange} />
                                        <label>CALENDAR</label>
                                        <div className="form-control-border"></div>
                                    </div>
                                }
                            </div>
                            <div className="col-xs-12 col-sm-12 col-center">
                                <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ExperiencePopup;