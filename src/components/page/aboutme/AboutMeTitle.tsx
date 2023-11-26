/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { UserTableType } from "../../../types/DB/UserTableType";
import { ABOUT_ME } from "../../../serverApi";

const AboutMeTitle = () => {
    const { user_id, name, email, phone, birth, address } = useSelector((state: RootState) => state.user.info) as UserTableType;

    const [age, setAge] = useState('unknown');
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getAboutMe();
    }, []);

    useEffect(() => {
        if (birth && birth !== null) {
            const getAge = new Date().getFullYear() - Number(birth.split("-")[0]);
            setAge(String(getAge));
        }
    }, [birth]);

    const getAboutMe = async () => {
        try {
            await fetch(
                `${ABOUT_ME}/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(resopnse => {
                    const { sucess, data } = resopnse;

                    if (sucess) {
                        const { title } = data;

                        setTitle(title);
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    const titleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const saveBtnClick = () => {
        setEdit(false);

    };

    const closeBtnClick = () => {
        setTitle('');
        setEdit(false);
    };

    const editBtnClick = () => {
        setEdit(true);
    };

    return (
        <div className="aboutme-title-con row">
            {
                edit &&
                <div className="col-xs-12 col-sm-7 aboutme-title-show">
                    <div className={`form-group form-group-with-icon aboutme-text${title ? ' form-group-focus' : ''}`}>
                        <textarea id="aboutme_title" name="aboutme_title" className="form-control aboutme-textarea" wrap="hard" value={title || ""} placeholder="자기소개를 작성해주세요📝" onChange={titleChange} />
                        <div className="form-control-border aboutme-textarea"></div>
                    </div>
                    <div className="aboutme-title-btn-wrap">
                        <button className="button btn-sm btn-primary" onClick={saveBtnClick}>SAVE</button>
                        <button className="button btn-sm btn-error" onClick={closeBtnClick}>CLOSE</button>
                    </div>
                </div>
            }
            {
                !edit &&
                <div className="col-xs-12 col-sm-7 aboutme-title-edit">
                    {
                        title ? <pre>{title}</pre> : <pre style={{ color: '#d5d5d5' }}>자기소개를 작성해주세요📝</pre>
                    }
                    <div className="aboutme-title-btn-wrap">
                        <button className="button btn-sm btn-secondary" onClick={editBtnClick}>EDIT</button>
                    </div>
                </div>
            }
            <div className="col-xs-12 col-sm-5">
                <div className="info-list">
                    <ul>
                        <li>
                            <span className="title">Name</span>
                            <span className="value">{name}</span>
                        </li>
                        <li>
                            <span className="title">Age</span>
                            <span className="value">{age}</span>
                        </li>
                        <li>
                            <span className="title">Address</span>
                            <span className="value">{address || 'unknown'}</span>
                        </li>
                        <li>
                            <span className="title">e-mail</span>
                            <span className="value">{email}</span>
                        </li>

                        <li>
                            <span className="title">Phone</span>
                            <span className="value">{phone}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default AboutMeTitle;