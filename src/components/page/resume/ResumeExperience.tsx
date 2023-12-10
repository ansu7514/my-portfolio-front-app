import { useDispatch } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

const ResumeExperience = () => {
    const dispatch = useDispatch();

    const addBtnClick = () => {
        dispatch(setPopuup(['experiencePopup', true]));
    };

    return (
        <>
            <div className="edit-title">
                <div className="block-title">
                    <h3>Experience</h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={addBtnClick}>ADD</button>
            </div>
        </>
    )
};

export default ResumeExperience;