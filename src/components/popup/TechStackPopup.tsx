import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { ABOUT_ME_UPDATE } from "../../serverApi";
import { useDispatch, useSelector } from "react-redux";
import { setTechStack } from "../../redux/reducer/UserReducer";
import { setTechStackPopup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";
import { jobList } from "../page/setting/SettingPage";

import { UserTableType } from "../../types/DB/UserTableType";

export const frontTechs = ['React', 'Next', 'Vue', 'Angular', 'JavaScript', 'TypeScript'];
export const backTechs = ['Node', 'Spring', 'Django', 'MySql', 'Postgre', 'MongoDB'];
export const designTechs = ['HTML', 'Css', 'Scss', 'Figma', 'PhotoShop', 'Illustrator'];

const TechStackPopup = () => {
    const dispatch = useDispatch();

    const techStack = useSelector((state: RootState) => state.user.techStack) || [];
    const { user_id, job } = useSelector((state: RootState) => state.user.info) as UserTableType;

    const [techList, setTechList] = useState<Array<string>>([]);
    const [clickList, setClickList] = useState<Array<string>>(techStack);

    useEffect(() => {
        if (job === jobList[1]) setTechList(frontTechs);
        else if (job === jobList[2]) setTechList(backTechs);
        else if (job === jobList[3]) setTechList(designTechs);
    }, [job]);

    const closePopup = () => {
        dispatch(setTechStackPopup(false));
    };

    const closeBtnClick = () => {
        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '기술 스택이 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
    };

    const stackDataList = techList.map(tech => {
        const clickCheck = clickList.includes(tech);

        const techClick = () => {
            let tempList = [...clickList];

            if (clickCheck) {
                const idx = clickList.indexOf(tech);
                tempList.splice(idx, 1);
            } else {
                tempList.push(tech);
            }

            setClickList(tempList);
        };

        const divClassName = clickCheck ? ' active' : '';

        return (
            <div key={`tech_div_${tech}`} className="col-xs-12 col-sm-4" onClick={techClick}>
                <div className={`fun-fact gray-default tech-popup-div${divClassName}`}>
                    <img src={`img/techlogo/${tech}.png`} alt={tech} />
                    <h4>{tech}</h4>
                    <span className="fun-fact-block-text"></span>
                </div>
            </div>
        )
    });

    const saveBtnClick = async () => {
        try {
            await fetch(
                ABOUT_ME_UPDATE,
                { method: 'post', body: JSON.stringify({ tech_stack: clickList, user_id }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        closePopup();
                        dispatch(setTechStack(clickList));
                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 기술 스택을 저장했습니다', position: "bottom-center" });
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 기술 스택 저장에 실패했습니다', position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 기술 스택 저장에 실패했습니다', position: "bottom-center" });
        }
    };

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content tech-popup">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <div className="row tech-popup-con">
                        {stackDataList}
                        <div className="col-xs-12 col-sm-12 col-center">
                            <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TechStackPopup;