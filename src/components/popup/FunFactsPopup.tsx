import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";

const FunFactsPopup = () => {
    const dispatch = useDispatch();

    const [fact, setFact] = useState('');
    const [factList, setFactList] = useState<Array<string>>([]);

    const closeBtnClick = () => {
        dispatch(setPopuup(['funFactPopup', false]));
    };

    const factChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFact(e.target.value);
    };

    const factEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') enterBtnCLick();
    };

    const enterBtnCLick = () => {
        if (fact) {
            let tempList = [...factList, fact];
            setFactList(tempList);

            setFact('');
        } else {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 정보를 입력해주세요', position: "bottom-center" });
        }
    };

    const factDataList = factList.map((fact, factIdx) => {
        const deleteClick = () => {
            let tempList = [...factList];
            const idx = tempList.indexOf(fact);

            tempList.splice(idx, 1);
            setFactList(tempList);
        };

        return (
            <li key={`fact_${fact}_${factIdx}`} className="fact-popup-li">
                <p>{`# ${fact}`}</p>
                <p onClick={deleteClick}>×</p>
            </li>
        )
    });

    const saveBtnClick = () => {

    };

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content aboutme-popup">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <div className="row aboutme-popup-con">
                        <div className="col-xs-12 col-sm-12">
                            <div className="fun-fact gray-default fact-input-div">
                                <div className={`form-group form-group-with-icon${fact ? ' form-group-focus' : ''}`}>
                                    <input id="fact" type="text" name="fact" className="form-control" value={fact || ""} onChange={factChange} onKeyDown={factEnter} />
                                    <label>FACT</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <button className="button btn-sm btn-primary" onClick={enterBtnCLick}>ENTER</button>
                            </div>
                            {
                                factList.length !== 0 &&
                                <div className="fun-fact gray-default">
                                    <ul className="knowledges fact-popup-ul">
                                        {factDataList}
                                    </ul>
                                </div>
                            }
                            <div className="col-xs-12 col-sm-12 col-center">
                                <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FunFactsPopup;