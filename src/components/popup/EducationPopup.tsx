import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";
import { GET_SEARCH_SCHOOL, RESUME, RESUME_EDUCATION_CREATE } from "../../serverApi";
import { setSchoolFromList, setSchoolList, setSchoolToList } from "../../redux/reducer/ResumeReducer";

import Alert from "../Alert";
import { format } from 'date-fns';
import Calendar from "react-calendar";

import { schoolApiType } from "../../types/ResumeType";
import { Value } from "react-calendar/dist/cjs/shared/types";

export const schoolTypeList = [
    { label: 'SHCOOL', value: '' },
    { label: '대학교', value: 'univ_list' },
    { label: '고등학교', value: 'high_list' },
    { label: '중학교', value: 'midd_list' },
    { label: '초등학교', value: 'elem_list' },
];

const EducationPopup = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id);

    const [step, setStep] = useState(1);

    const [gubun, setGubun] = useState('');
    const [search, setSearch] = useState('');
    const [school, setSchool] = useState<schoolApiType>({});
    const [searchList, setSearchList] = useState([]);

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
        dispatch(setPopuup(['educationPopup', false]));
    };

    const closeBtnClick = () => {
        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '재학 정보가 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
    };

    const gubunChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSchool({});
        setSearchList([]);
        setGubun(e.target.value);
    };

    const schoolOptions = schoolTypeList.map((school, schoolIdx) => {
        const { label, value } = school;

        return (
            <option key={`${value}_${schoolIdx}`} value={value}>{label}</option>
        )
    });

    const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const searchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') serachSchool();
    };

    const serachSchool = async () => {
        if (!gubun) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 학교 구분을 선택해주세요', position: "bottom-center" });
            return false;
        }

        if (!search) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 검색명을 입력해주세요', position: "bottom-center" });
            return false;
        }

        try {
            await fetch(
                GET_SEARCH_SCHOOL,
                { method: 'post', body: JSON.stringify({ gubun, searchSchulNm: search }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { sucess, data } = response;

                    if (sucess) {
                        if (data.length) setSearchList(data);
                        else {
                            setSearchList([]);
                            Alert({ toast: true, confirm: false, error: false, title: '', desc: '🔍 검색 결과가 없습니다.', position: "bottom-center" });
                        }
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    const schoolDataList = searchList.map(search => {
        const { schoolName, campusName, adres, link, seq } = search;

        const schoolClick = () => {
            if (school.seq !== seq) setSchool(search);
            else setSchool({});
        };

        const schoolClassName = `certificate-item clearfix${school.seq === seq ? ' active' : ''}`;

        return (
            <div key={`${schoolName}_${campusName}_${seq}`} className={schoolClassName} onClick={schoolClick}>
                <div className="certi-content">
                    <div className="certi-title">
                        <h4>{schoolName} {campusName}</h4>
                    </div>
                    <div className="certi-id">
                        <span>{adres}</span>
                    </div>
                    <div className="certi-date">
                        <a href={link} target="_blank" rel="noreferrer">{link}</a>
                    </div>
                    <div className="certi-company">
                        <span></span>
                    </div>
                </div>
            </div>
        )
    });

    const nextBtnClick = () => {
        if (!school.seq) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 학교를 선택해주세요.', position: "bottom-center" });
            return false;
        }

        setStep(2);
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

    const beforeBtnClick = () => {
        setStep(1);
        setGubun('');
        setSearch('');
        setSchool({});
        setSearchList([]);
        setFrom('');
        setTo('');
        setShowCal('');
        setCalDate(new Date());
    };

    const saveBtnClick = async () => {
        const insertData = {
            user_id, school: JSON.stringify(school),
            school_from: from, school_to: to
        };

        try {
            await fetch(
                RESUME_EDUCATION_CREATE,
                { method: 'post', body: JSON.stringify(insertData), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 재학 정보 수정에 성공했습니다', position: "bottom-center" });

                        getResumeEducation();
                        closePopup();
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 재학 정보 수정에 실패했습니다', position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 재학 정보 수정에 실패했습니다', position: "bottom-center" });
        }
    };

    const getResumeEducation = async () => {
        try {
            await fetch(
                `${RESUME}/education/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success && data.length) {
                        const { school, school_from, school_to } = data;

                        dispatch(setSchoolList(school));
                        dispatch(setSchoolFromList(school_from));
                        dispatch(setSchoolToList(school_to));
                    }
                });
        } catch (error) {
            console.error(error);
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
                            {
                                step === 1 &&
                                <>
                                    <div className="fun-fact gray-default school-input-div">
                                        <div className="form-group form-group-with-icon form-group-focus school-select">
                                            <select id="gubun" name="gubun" className="form-control" value={gubun || ""} onChange={gubunChange}>
                                                {schoolOptions}
                                            </select>
                                            <label>SCHOOL</label>
                                            <div className="form-control-border"></div>
                                        </div>
                                        <div className={`form-group form-group-with-icon school-input${search ? ' form-group-focus' : ''}`}>
                                            <input id="search" type="text" name="search" className="form-control" value={search || ""} onChange={searchChange} onKeyDown={searchEnter} />
                                            <label>SEARCH</label>
                                            <div className="form-control-border"></div>
                                        </div>
                                        <button className="button btn-sm btn-primary" onClick={serachSchool}>ENTER</button>
                                    </div>
                                    {
                                        searchList.length !== 0 &&
                                        <div className="fun-fact gray-default school-ul-div scroll">
                                            {schoolDataList}
                                        </div>
                                    }
                                    <div className="col-xs-12 col-sm-12 col-center">
                                        <button className="button btn-send" onClick={nextBtnClick}>NEXT</button>
                                    </div>
                                </>
                            }
                            {
                                step === 2 &&
                                <>
                                    <div className="fun-fact gray-default school-ul-div">
                                        <div className="certificate-item clearfix">
                                            <div className="certi-content">
                                                <div className="certi-title">
                                                    <h4>{school.schoolName} {school.campusName}</h4>
                                                </div>
                                                <div className="certi-id">
                                                    <span>{school.adres}</span>
                                                </div>
                                                <div className="certi-date">
                                                    <a href={school.link} target="_blank" rel="noreferrer">{school.link}</a>
                                                </div>
                                                <div className="certi-company">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fun-fact gray-default school-cal-div">
                                        <div className="school-cal-input">
                                            <div className={`form-group form-group-with-icon school-input${from ? ' form-group-focus' : ''}`} onFocus={() => setFocus('from')}>
                                                <input id="from" type="text" name="from" className="form-control" defaultValue={from || ""} />
                                                <label>FROM</label>
                                                <div className="form-control-border"></div>
                                            </div>
                                            <div className={`form-group form-group-with-icon school-input${to ? ' form-group-focus' : ''}`} onFocus={() => setFocus('to')}>
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
                                        <button className="button btn-send" onClick={beforeBtnClick}>BEFORE</button>
                                        <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default EducationPopup;