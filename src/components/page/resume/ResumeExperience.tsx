import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";
import { RESUME, RESUME_EXPERIENCE_DELETE } from "../../../serverApi";
import { setExperienceList } from "../../../redux/reducer/ResumeReducer";

import Alert from "../../Alert";

const ResumeExperience = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id);
    const experienceList = useSelector((state: RootState) => state.resume.experienceList) || [];

    const addBtnClick = () => {
        dispatch(setPopuup(['experiencePopup', true]));
    };

    const experienceDataList = experienceList.map(experience => {
        const { experience_id, company, address, job, experience_from, experience_to } = experience;

        const deleteBtnClick = async () => {
            Alert({ toast: false, confirm: true, error: false, title: '📢 알림', desc: '이력 정보를 삭제하시겠습니까?', checkClick: deleteData, position: "top-center" });
        };

        const deleteData = async () => {
            try {
                await fetch(
                    RESUME_EXPERIENCE_DELETE,
                    { method: 'post', body: JSON.stringify({ user_id, experience_id }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
                ).then(res => res.json())
                    .then(response => {
                        const { success } = response;

                        if (success) {
                            getResumeExperience();
                            Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 이력 정보 삭제에 성공했습니다', position: "bottom-center" });
                        } else Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 이력 정보 삭제에 실패했습니다', position: "bottom-center" });
                    });
            } catch (error) {
                console.error(error);
                Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 이력 정보 삭제에 실패했습니다', position: "bottom-center" });
            }
        };

        return (
            <div key={`${company}_${experience_id}`} className="timeline-item clearfix resume-experience">
                <div className="left-part">
                    <h5 className="item-period">{experience_from}</h5>
                    <h5 className="item-period">~ {experience_to}</h5>
                    <span className="item-company">{company}</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                    <div className="right-part-title">
                        <h4 className="item-title">{job}</h4>
                        <span className="menu-icon lnr lnr-trash" onClick={deleteBtnClick}></span>
                    </div>
                    <p>{address}</p>
                </div>
            </div>
        )
    });

    const getResumeExperience = async () => {
        try {
            await fetch(
                `${RESUME}/experience/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success) dispatch(setExperienceList(data));
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="edit-title">
                <div className="block-title">
                    <h3>Experience</h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={addBtnClick}>ADD</button>
            </div>
            <div className="timeline timeline-second-style clearfix resume-max-height">
                {experienceDataList}
            </div>
        </>
    )
};

export default ResumeExperience;