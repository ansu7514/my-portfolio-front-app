import { useState } from "react";
import { useDispatch } from "react-redux";
import { GET_SEARCH_SCHOOL } from "../../serverApi";
import { setPopuup } from "../../redux/reducer/PopupReducer";

const EducationPopup = () => {
    const dispatch = useDispatch();

    const [highSchool, setHighSchool] = useState('');

    const closeBtnClick = () => {
        dispatch(setPopuup(['educationPopup', false]));
    };

    const highSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHighSchool(e.target.value);
    };

    const serachSchool = async () => {
        try {
            await fetch(
                GET_SEARCH_SCHOOL,
                { method: 'post', body: JSON.stringify({ SCHUL_NM: highSchool }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    console.log(response);
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
                        <div className={`form-group form-group-with-icon${highSchool ? ' form-group-focus' : ''}`}>
                            <input id="highSchool" type="text" name="highSchool" className="form-control" value={highSchool || ""} onChange={highSchoolChange} />
                            <label>HIGH SCHOOL</label>
                            <div className="form-control-border"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EducationPopup;