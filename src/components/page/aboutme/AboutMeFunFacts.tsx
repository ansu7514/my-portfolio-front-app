import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

const AboutMeFunFacts = () => {
    const dispatch = useDispatch();

    const funFacts = useSelector((state: RootState) => state.aboutMe.funFacts);

    const editBtnClick = () => {
        dispatch(setPopuup(['funFactPopup', true]));
    };

    const funFactDataList = funFacts.map((fact, factIdx) => {
        return (
            <li key={`fact_${fact}_${factIdx}`} className="fun-fact-li">
                <p>{`# ${fact}`}</p>
            </li>
        )
    });

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 edit-title">
                <div className="block-title">
                    <h3>Fun <span>Facts</span></h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={editBtnClick}>EDIT</button>
            </div>
            <div className="col-xs-12 col-sm-12 fun-fact-div">
                {
                    funFactDataList.length !== 0 &&
                    <ul className="knowledges fun-fact-ul">
                        {funFactDataList}
                    </ul>
                }
                {
                    funFactDataList.length === 0 &&
                    <p>재밌는 정보를 작성해주세요 🤓</p>
                }
            </div>
        </div>
    )
};

export default AboutMeFunFacts;