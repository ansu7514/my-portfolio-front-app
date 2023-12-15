import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const ResumeCertificates = () => {
    const certificateList = useSelector((state: RootState) => state.resume.certificateList);

    const certificateDataList = certificateList.map((certificate, idx) => {
        const { name, authority, date } = certificate;

        const showDate = date.split('T')[0];

        return (
            <div key={`${name}_${idx}`} className="col-xs-12 col-sm-6">
                <div className="certificate-item clearfix">
                    <div className="certi-content">
                        <div className="certi-title">
                            <h4>{name}</h4>
                        </div>
                        <div className="certi-id">
                            <span>{authority}</span>
                        </div>
                        <div className="certi-date">
                            <span>{showDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="row">
            {certificateDataList}
        </div>
    )
};

export default ResumeCertificates;