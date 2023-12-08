import { useState } from "react";
import { useDispatch } from "react-redux";
import { GET_SEARCH_SCHOOL } from "../../serverApi";
import { setPopuup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";

export const schoolList = [
    { label: 'SHCOOL', value: '' },
    { label: '대학교', value: 'univ_list' },
    { label: '고등학교', value: 'high_list' },
    { label: '중학교', value: 'midd_list' },
    { label: '초등학교', value: 'elem_list' },
];

const EducationPopup = () => {
    const dispatch = useDispatch();

    const [gubun, setGubun] = useState('');
    const [search, setSearch] = useState('');
    const [school, setSchool] = useState({});
    const [searchList, setSearchList] = useState([]);

    const closeBtnClick = () => {
        dispatch(setPopuup(['educationPopup', false]));
    };

    const gubunChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSchool({});
        setSearchList([]);
        setGubun(e.target.value);
    };

    const schoolOptions = schoolList.map((school, schoolIdx) => {
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
            setSchool(seq);
        };

        const schoolClassName = `certificate-item clearfix${school === seq ? ' active' : ''}`;

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

    const saveBtnClick = () => {

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
                                <div className="fun-fact gray-default school-ul-div">
                                    {schoolDataList}
                                </div>
                            }
                            <div className="col-xs-12 col-sm-12 col-center">
                                <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default EducationPopup;