import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

const ResumeEducation = () => {
    const dispatch = useDispatch();

    const schoolList = useSelector((state: RootState) => state.resume.schoolList) || [];
    const schoolFromList = useSelector((state: RootState) => state.resume.schoolFromList) || [];
    const schoolToList = useSelector((state: RootState) => state.resume.schoolToList) || [];

    const addBtnClick = () => {
        dispatch(setPopuup(['educationPopup', true]));
    };

    const educationDataList = schoolList.map((school, schoolIdx) => {
        const { schoolName, campusName, schoolGubun, adres, link, seq } = school;

        return (
            <div key={`${schoolName}_${seq}`} className="timeline-item clearfix resume-education">
                <div className="left-part">
                    <h5 className="item-period">{schoolToList[schoolIdx]}</h5>
                    <h5 className="item-period">~ {schoolFromList[schoolIdx]}</h5>
                    <span className="item-company">{schoolGubun}</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                    <h4 className="item-title">{schoolName} {campusName}</h4>
                    <p>{adres}</p>
                    <a href={link} target="_blank" rel="noreferrer">{link}</a>
                </div>
            </div>
        )
    });

    return (
        <>
            <div className="edit-title">
                <div className="block-title">
                    <h3>Education</h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={addBtnClick}>ADD</button>
            </div>
            <div className="timeline timeline-second-style clearfix">
                {educationDataList}
            </div>
        </>
    )
};

export default ResumeEducation;