import { AlertPropsType } from "../types/AlertType";
import { Toast, toast as ToastDiv } from "react-hot-toast";

const Alert = (props: AlertPropsType) => {
    const { toast, confirm, error, title, desc, position, checkClick, closeClick } = props;

    const closeToast = (t: Toast) => {
        if (closeClick !== undefined) {
            closeClick();
        }

        ToastDiv.dismiss(t.id);
    };

    const confirmClick = (t: Toast) => {
        if (checkClick !== undefined) {
            checkClick();
        }

        closeToast(t);
    };

    ToastDiv(
        (t) => (
            <>
                {
                    toast &&
                    <div className="toast_title">
                        <h4 className={`${error ? 'toast_error' : ''}`}>
                            {desc}
                        </h4>
                    </div>
                }
                {
                    !toast &&
                    <div className="toat_container">
                        <div className="toast_title">
                            <h3 className={`${error ? 'toast_error' : ''}`}>
                                {title}
                            </h3>
                        </div>
                        <div className="toast_body">
                            <p>
                                {desc}
                            </p>
                        </div>
                        <div className="toast_bottom">
                            <div className="toast_btn_wrap">
                                {
                                    confirm &&
                                    <button className="btn btn-primary tost_btn" onClick={() => confirmClick(t)}>ok</button>
                                }
                                <button className="btn btn-primary tost_btn" onClick={() => closeToast(t)}>close</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        ),
        {
            id: !toast ? 'alert' : undefined,
            position,
            className: 'toast',
            duration: !toast ? Infinity : 1500,
            style: {
                padding: '0',
                margin: '0',
                textAlign: 'center',
            },
        }
    );
};

export default Alert;