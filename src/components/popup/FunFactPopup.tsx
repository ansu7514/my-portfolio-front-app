import { useDispatch } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";

const FunFactPopup = () => {
    const dispatch = useDispatch();

    const closeBtnClick = () => {
        dispatch(setPopuup(['techStackPopup', false]));
    };

    const saveBtnClick = () => {

    };

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content tech-popup">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12">
                            <div className="fun-fact gray-default">
                                {/* <i className="lnr lnr-heart"></i>
                                <h4>Happy Clients</h4>
                                <span className="fun-fact-block-value">578</span>
                                <span className="fun-fact-block-text"></span> */}
                            </div>
                        </div>
                    </div>
                    <div className="row tech-popup-con">
                        <div className="col-xs-12 col-sm-12 col-center">
                            <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FunFactPopup;