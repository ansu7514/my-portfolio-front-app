import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";
import { RESUME, RESUME_EDUCATION_DELETE } from "../../../serverApi";
import { setSchoolFromList, setSchoolList, setSchoolToList } from "../../../redux/reducer/ResumeReducer";

import Alert from "../../Alert";

import { schoolApiType } from "../../../types/ResumeType";
import { ResumeEducationTableType } from "../../../types/DB/ResumeTableType";

const ResumeEducation = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id);
    const schoolList = useSelector((state: RootState) => state.resume.schoolList) || [];
    const schoolFromList = useSelector((state: RootState) => state.resume.schoolFromList) || [];
    const schoolToList = useSelector((state: RootState) => state.resume.schoolToList) || [];

    const addBtnClick = () => {
        dispatch(setPopuup(['educationPopup', true]));
    };

    const educationDataList = schoolList.map((school, schoolIdx) => {
        const { schoolName, campusName, schoolGubun, adres, link, seq } = school;

        const deleteBtnClick = async () => {
            Alert({ toast: false, confirm: true, error: false, title: '📢 알림', desc: '재학 정보를 삭제하시겠습니까?', checkClick: deleteData, position: "top-center" });
        };

        const deleteData = async () => {
            try {
                await fetch(
                    RESUME_EDUCATION_DELETE,
                    { method: 'post', body: JSON.stringify({ user_id, school_id: seq }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
                ).then(res => res.json())
                    .then(response => {
                        const { success } = response;

                        if (success) {
                            getResumeEducation();
                            Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 재학 정보 삭제에 성공했습니다', position: "bottom-center" });
                        } else Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 재학 정보 삭제에 실패했습니다', position: "bottom-center" });
                    });
            } catch (error) {
                console.error(error);
                Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 재학 정보 삭제에 실패했습니다', position: "bottom-center" });
            }
        };

        return (
            <div key={`${schoolName}_${seq}`} className="timeline-item clearfix resume-education">
                <div className="left-part">
                    <h5 className="item-period">{schoolToList[schoolIdx]}</h5>
                    <h5 className="item-period">~ {schoolFromList[schoolIdx]}</h5>
                    <span className="item-company">{schoolGubun}</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                    <div className="right-part-title">
                        <h4 className="item-title">{schoolName} {campusName}</h4>
                        <span className="menu-icon lnr lnr-trash" onClick={deleteBtnClick}></span>
                    </div>
                    <p>{adres}</p>
                    <a href={link} target="_blank" rel="noreferrer">{link}</a>
                </div>
            </div>
        )
    });

    const getResumeEducation = async () => {
        try {
            await fetch(
                `${RESUME}/education/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success && data.length) {
                        const educationData = data as Array<ResumeEducationTableType>;

                        const schoolList = educationData.map(({ school }) => JSON.parse(school) as schoolApiType);
                        const schoolFromList = educationData.map(({ school_from }) => school_from);
                        const schoolToList = educationData.map(({ school_to }) => school_to);

                        dispatch(setSchoolList(schoolList));
                        dispatch(setSchoolFromList(schoolFromList));
                        dispatch(setSchoolToList(schoolToList));
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="edit-title">
                <div className="block-title">
                    <h3>Education</h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={addBtnClick}>ADD</button>
            </div>
            <div className="timeline timeline-second-style clearfix resume-max-height">
                {educationDataList}
            </div>
        </>
    )
};

export default ResumeEducation;