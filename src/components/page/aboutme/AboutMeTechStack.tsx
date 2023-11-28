import { useDispatch } from "react-redux";
import { setTechStackPopup } from "../../../redux/reducer/PopupReducer";

const AboutMeTechStack = () => {
    const dispatch = useDispatch();

    const editBtnClick = () => {
        dispatch(setTechStackPopup(true));
    };

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 what-i-do-title">
                <div className="block-title">
                    <h3>Tech <span>Stack</span></h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={editBtnClick}>EDIT</button>
            </div>
        </div>
    )
};

export default AboutMeTechStack;