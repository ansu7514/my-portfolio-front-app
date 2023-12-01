import { useDispatch } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

const AboutMeFunFacts = () => {
    const dispatch = useDispatch();

    const editBtnClick = () => {
        dispatch(setPopuup(['funFactPopup', true]));
    };

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 edit-title">
                <div className="block-title">
                    <h3>Fun <span>Facts</span></h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={editBtnClick}>EDIT</button>
            </div>
        </div>
    )
};

export default AboutMeFunFacts;