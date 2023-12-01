import { useState } from "react";
import { RootState } from "../../redux/store";
import { ABOUT_ME_UPDATE } from "../../serverApi";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";
import { setFunFacts } from "../../redux/reducer/AboutMeReducer";

import Alert from "../Alert";

const FunFactsPopup = () => {
    const dispatch = useDispatch();

    const funFacts = useSelector((state: RootState) => state.aboutMe.funFacts);
    const user_id = useSelector((state: RootState) => state.user.info?.user_id);

    const [fact, setFact] = useState('');
    const [factList, setFactList] = useState<Array<string>>(funFacts);

    const closePopup = () => {
        dispatch(setPopuup(['funFactPopup', false]));
    };

    const closeBtnClick = () => {
        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '정보가 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
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

    const funFactDataList = factList.map((fact, factIdx) => {
        const deleteClick = () => {
            let tempList = [...factList];
            const idx = tempList.indexOf(fact);

            tempList.splice(idx, 1);
            setFactList(tempList);
        };

        return (
            <li key={`fact_${fact}_${factIdx}`} className="fun-fact-li">
                <p>{`# ${fact}`}</p>
                <p onClick={deleteClick}>×</p>
            </li>
        )
    });

    const saveBtnClick = async () => {
        try {
            await fetch(
                ABOUT_ME_UPDATE,
                { method: 'post', body: JSON.stringify({ fun_facts: factList, user_id }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        closePopup();
                        dispatch(setFunFacts(factList));
                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 정보를 저장했습니다', position: "bottom-center" });
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 정보 저장에 실패했습니다', position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 정보 저장에 실패했습니다', position: "bottom-center" });
        }
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
                                <div className="fun-fact gray-default fact-ul-div">
                                    <ul className="knowledges fun-fact-ul">
                                        {funFactDataList}
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