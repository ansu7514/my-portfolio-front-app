import { useDispatch } from "react-redux";
import DaumPostCode from "react-daum-postcode";
import { setPostPopup } from "../../redux/reducer/PopupReducer";
import { setPostData } from "../../redux/reducer/PopupDataReducer";

const PostPopup = () => {
    const dispatch = useDispatch();

    const closeBtnClick = () => {
        dispatch(setPostPopup(false));

    };

    const handleComplete = (data: any) => {
        const { addressType, bname, buildingName } = data;

        let fullAddress = data.address;
        let extraAddress = '';

        if (addressType === 'R') {
            if (bname !== '') extraAddress += bname;
            if (buildingName !== '') extraAddress += `${extraAddress !== '' && ', '}${buildingName}`;

            fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`;

            dispatch(setPostData(fullAddress));
            closeBtnClick();
        }
    }

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <DaumPostCode className="portfolio-item-img post-popup" onComplete={handleComplete} />
                </div>
            </div>
        </div>
    )
};

export default PostPopup;