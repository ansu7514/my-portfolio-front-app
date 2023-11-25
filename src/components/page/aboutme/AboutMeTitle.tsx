import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { UserTableType } from "../../../types/DB/UserTableType";

const AboutMeTitle = () => {
    const { name, email, phone, birth, address } = useSelector((state: RootState) => state.user.info) as UserTableType;

    const [age, setAge] = useState('unknown');

    useEffect(() => {
        if (birth && birth !== null) {
            const getAge = new Date().getFullYear() - Number(birth.split("-")[0]);
            setAge(String(getAge));
        }
    }, [birth]);

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-7">
                <p>test</p>
            </div>
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