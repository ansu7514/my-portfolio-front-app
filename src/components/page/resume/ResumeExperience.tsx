import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

const ResumeExperience = () => {
    const dispatch = useDispatch();

    const experienceList = useSelector((state: RootState) => state.resume.experienceList) || [];

    const addBtnClick = () => {
        dispatch(setPopuup(['experiencePopup', true]));
    };

    const experienceDataList = experienceList.map(experience => {
        const { experience_id, company, address, job, experience_from, experience_to } = experience;

        return (
            <div key={`${company}_${experience_id}`} className="timeline-item clearfix resume-experience">
                <div className="left-part">
                    <h5 className="item-period">{experience_from}</h5>
                    <h5 className="item-period">~ {experience_to}</h5>
                    <span className="item-company">{company}</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                    <h4 className="item-title">{job}</h4>
                    <p>{address}</p>
                </div>
            </div>
        )
    });

    return (
        <>
            <div className="edit-title">
                <div className="block-title">
                    <h3>Experience</h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={addBtnClick}>ADD</button>
            </div>
            <div className="timeline timeline-second-style clearfix">
                {experienceDataList}
            </div>
        </>
    )
};

export default ResumeExperience;