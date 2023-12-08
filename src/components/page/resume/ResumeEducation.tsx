import { useDispatch } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

const ResumeEducation = () => {
    const dispatch = useDispatch();

    const addBtnClick = () => {
        dispatch(setPopuup(['educationPopup', true]));
    };

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-7 edit-title">
                <div className="block-title">
                    <h3>Education</h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={addBtnClick}>ADD</button>
            </div>
        </div>
    )
};

export default ResumeEducation;