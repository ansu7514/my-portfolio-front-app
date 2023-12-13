/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";
import { RESUME_SKILL_CREATE } from "../../../serverApi";

import Alert from "../../Alert";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const ResumeCodingSkills = () => {
    const user_id = useSelector((state: RootState) => state.user.info?.user_id);
    const techStacks = useSelector((state: RootState) => state.aboutMe.techStacks) || [];

    const [edit, setEdit] = useState(false);
    const [percentageList, setPercentageList] = useState<Array<number>>([]);

    useEffect(() => {
        if (!percentageList.length) {
            let tempList = techStacks.map(tech => 30);
            setPercentageList(tempList);
        }
    }, [percentageList]);

    const editBtnClick = () => {
        setEdit(!edit);

        if (!edit) saveFunc();
    };

    const saveFunc = async () => {
        const insertData = { user_id, skill_name: techStacks, skill_percente: percentageList };

        try {
            await fetch(
                RESUME_SKILL_CREATE,
                { method: 'post', body: JSON.stringify(insertData), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    console.log(success);
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 코딩 스킬 저장에 실패했습니다', position: "bottom-center" });
        }
    };

    const skillChartDataList = techStacks.map((tech, techIdx) => {
        const skillValueChange = (e: Event, value: number | number[]) => {
            const tempList = [...percentageList];
            tempList[techIdx] = value as number;
            setPercentageList(tempList);
        };

        return (
            <div key={`${tech}_${techIdx}`} className="coding-skill">
                <div className="skill clearfix">
                    <h4>{tech}</h4>
                    <div className="skill-value">{percentageList[techIdx]}%</div>
                </div>
                {
                    edit &&
                    <Box sx={{ width: '100%' }}>
                        <Slider
                            aria-label="Temperature"
                            value={percentageList[techIdx]}
                            onChange={skillValueChange}
                            valueLabelDisplay="off"
                            step={5}
                            min={0}
                            max={100}
                        />
                    </Box>
                }
                {
                    !edit &&
                    <div className="skill-container">
                        <div className="skill-percentage" style={{ width: `${percentageList[techIdx]}%` }}></div>
                    </div>
                }
            </div>
        )
    });

    return (
        <>
            <div className="edit-title">
                <div className="block-title">
                    <h3>Coding <span>Skills</span></h3>
                </div>
                {
                    edit &&
                    <button className="button btn-sm btn-primary" onClick={editBtnClick}>SAVE</button>
                }
                {
                    !edit &&
                    <button className="button btn-sm btn-secondary" onClick={editBtnClick}>EDIT</button>
                }
            </div>
            <div className="skills-info skills-second-style">
                {skillChartDataList}
            </div>
        </>
    )
};

export default ResumeCodingSkills;