import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";
import { format } from "date-fns";
import Calendar from "react-calendar";

import { Value } from "react-calendar/dist/cjs/shared/types";

const ExperiencePopup = () => {
    const dispatch = useDispatch();

    const [company, setCompany] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [showCal, setShowCal] = useState('');
    const [calDate, setCalDate] = useState<Value>(new Date());

    useEffect(() => {
        if (showCal === 'from' && from !== '') setCalDate(new Date(from));
        else if (showCal === 'to' && to !== '') setCalDate(new Date(to));
        else setCalDate(new Date());
    }, [from, showCal, to]);

    const closePopup = () => {
        dispatch(setPopuup(['experiencePopup', false]));
    };

    const closeBtnClick = () => {
        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '이력 정보가 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
    };

    const companyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value);
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ExperiencePopup;