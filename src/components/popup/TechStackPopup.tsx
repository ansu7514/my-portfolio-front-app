import { useDispatch } from "react-redux";
import { setTechStackPopup } from "../../redux/reducer/PopupReducer";

const TechStackPopup = () => {
    const dispatch = useDispatch();

    const closeBtnClick = () => {
        dispatch(setTechStackPopup(false));
    };

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <div className="row techstack-popup">
                        <div className="col-xs-12 col-sm-4">
                            <div className="fun-fact gray-default">
                                <i className="lnr lnr-heart"></i>
                                <h4>Happy Clients</h4>
                                <span className="fun-fact-block-value">578</span>
                                <span className="fun-fact-block-text"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TechStackPopup;