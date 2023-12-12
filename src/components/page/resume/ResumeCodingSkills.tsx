/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const ResumeCodingSkills = () => {
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