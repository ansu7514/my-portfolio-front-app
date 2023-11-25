import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { UserTableType } from "../../../types/DB/UserTableType";

const AboutMeTitle = () => {
    const { name, email, phone, birth, address } = useSelector((state: RootState) => state.user.info) as UserTableType;

    const [age, setAge] = useState('unknown');
    const [edit, setEdit] = useState(false);
    const [title, setTItle] = useState('');

    useEffect(() => {
        if (birth && birth !== null) {
            const getAge = new Date().getFullYear() - Number(birth.split("-")[0]);
            setAge(String(getAge));
        }
    }, [birth]);

    const titleChange = (e: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
        // setTItle(e);
    };

    const editBtnClick = () => {
        setEdit(true);
    };

    return (
        <div className="aboutme-title-con row">
            {
                edit &&
                <div className="col-xs-12 col-sm-7">
                    <div className={`form-group form-group-with-icon aboutme-text${title ? ' form-group-focus' : ''}`}>
                        <textarea id="aboutme_title" name="aboutme_title" className="form-control" value={title || ""} />
                        <div className="form-control-border"></div>
                    </div>
                    <div className="aboutme-title-div">
                        <button className="button btn-sm btn-primary" onClick={editBtnClick}>SAVE</button>
                        <button className="button btn-sm btn-error" onClick={editBtnClick}>CLOSE</button>
                    </div>
                </div>
            }
            {
                !edit &&
                <div className="col-xs-12 col-sm-7 aboutme-title-div">
                    <p>{title}</p>
                    <div className="ci-icon btn-edit" onClick={editBtnClick}>
                        <i className="lnr lnr-cog"></i>
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