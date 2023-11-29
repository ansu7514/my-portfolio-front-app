import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setTechStackPopup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";
import { jobList } from "../page/setting/SettingPage";

export const frontTechs = ['React', 'Next', 'Vue', 'Angular', 'JavaScript', 'TypeScript'];
export const backTechs = ['Node', 'Spring', 'Django', 'MySql', 'Postgre', 'MongoDB'];
export const designTechs = ['HTML', 'Css', 'Scss', 'Figma', 'PhotoShop', 'Illustrator'];

const TechStackPopup = () => {
    const dispatch = useDispatch();

    const job = useSelector((state: RootState) => state.user.info?.job);

    const [techList, setTechList] = useState<Array<string>>([]);
    const [clickList, setClickList] = useState<Array<string>>([]);

    useEffect(() => {
        if (job === jobList[1]) setTechList(frontTechs);
        else if (job === jobList[2]) setTechList(backTechs);
        else if (job === jobList[3]) setTechList(designTechs);
    }, [job]);

    const closeBtnClick = () => {
        const checkClick = () => {
            dispatch(setTechStackPopup(false));
        };

        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '기술 스택이 저장되지 않을 수 있습니다.', checkClick, position: "top-center" });
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
            <div className="col-xs-12 col-sm-4" onClick={techClick}>
                <div className={`fun-fact gray-default tech-div${divClassName}`}>
                    <img src={`img/techlogo/${tech}.png`} alt={tech} />
                    <h4>{tech}</h4>
                    <span className="fun-fact-block-text"></span>
                </div>
            </div>
        )
    });

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content tech-popup">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <div className="row popup-con">
                        {stackDataList}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TechStackPopup;