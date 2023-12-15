import { useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";
import { format } from "date-fns";
import Calendar from "react-calendar";

import { Value } from "react-calendar/dist/cjs/shared/types";
import { RESUME_CERTIFICATE_CREATE } from "../../serverApi";

const CertificatePopup = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id);

    const [name, setName] = useState('');
    const [authority, setAuthority] = useState('');
    const [date, setDate] = useState<Value>(new Date());

    const closePopup = () => {
        dispatch(setPopuup(['certificatePopup', false]));
    };

    const closeBtnClick = () => {
        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '자격증 정보가 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
    };


    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const authorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthority(e.target.value);
    };

    const dateChange = (value: Value) => {
        setDate(value);
    };

    const saveBtnClick = async () => {
        const insertDate = format(date as Date, 'yyyy-MM-dd');
        const insertData = { user_id, name, authority, date: insertDate };

        try {
            await fetch(
                RESUME_CERTIFICATE_CREATE,
                { method: 'post', body: JSON.stringify(insertData), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        closePopup();
                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 자격증 저장에 성공                                                                                                                                                                                                                 했습니다', position: "bottom-center" });
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 자격증 저장에 실패했습니다', position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 자격증 저장에 실패했습니다', position: "bottom-center" });
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
                            <div className="fun-fact gray-default certificate-div">
                                <div className={`form-group form-group-with-icon certificate-input${name ? ' form-group-focus' : ''}`}>
                                    <input id="name" type="text" name="name" className="form-control" value={name || ""} onChange={nameChange} />
                                    <label>NAME</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className={`form-group form-group-with-icon certificate-input${authority ? ' form-group-focus' : ''}`}>
                                    <input id="authority" type="text" name="authority" className="form-control" value={authority || ""} onChange={authorityChange} />
                                    <label>ISSUING AUTHORITY</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className="form-group form-group-with-icon form-group-focus">
                                    <Calendar locale="en" className="form-control setting-calendar" value={date} onChange={dateChange} />
                                    <label>ACQUISITION DATE</label>
                                    <div className="form-control-border"></div>
                                </div>
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

export default CertificatePopup;