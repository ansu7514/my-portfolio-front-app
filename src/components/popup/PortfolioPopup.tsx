import { useState } from "react";
import { RootState } from "../../redux/store";
import { PORTFOLIO_CREATE } from "../../serverApi";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";

import Alert from "../Alert";

const PortfolioPopup = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id) || '';

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('img/portfolio/1.jpg');
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [content, setContent] = useState('');

    const closePopup = () => {
        dispatch(setPopuup(['portfolioPopup', false]));
    };

    const closeBtnClick = () => {
        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '포트폴리오 정보가 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
    };

    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        setInputFile(file);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise<void>((resolve) => {
                reader.onload = () => {
                    setImage(reader.result as string);
                    resolve();
                };
            });
        } else {
            setImage('img/portfolio/1.jpg');
        }
    };

    const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const saveBtnClick = async () => {
        const formData = new FormData();

        formData.append('user_id', user_id);
        formData.append('title', title);
        formData.append('content', content);
        if (inputFile) formData.append('input_file', inputFile);

        try {
            await fetch(
                PORTFOLIO_CREATE,
                { method: 'post', body: formData }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        closePopup();

                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 포트폴리오 저장에 성공했습니다', position: "bottom-center" });
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 포트폴리오 저장에 실패했습니다', position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 포트폴리오 저장에 실패했습니다', position: "bottom-center" });
        }
    };

    return (
        <div className="mfp-container mfp-image-holder mfp-s-ready">
            <div className="mfp-content">
                <div className="mfp-figure8=j">
                    <div className="btn-close">
                        <button type="button" onClick={closeBtnClick}>×</button>
                    </div>
                    <div className="row portfolio-popup-con">
                        <div className="col-xs-12 col-sm-12">
                            <div className="fun-fact gray-default portfolio-div">
                                <div className={`form-group form-group-with-icon portfolio-input${title ? ' form-group-focus' : ''}`}>
                                    <input id="title" type="text" name="title" className="form-control" value={title || ""} onChange={titleChange} />
                                    <label>TITLE</label>
                                    <div className="form-control-border"></div>
                                </div>
                                <div className="portfolio-item-img">
                                    <img src={image} alt="portfolio-img" />
                                </div>
                                <div className="form-group form-group-with-icon portfolio-input portfolio-image-div">
                                    <input id="photo-img" type="file" className="button btn-secondary" accept="image/jpeg, image/gif, image/png" onChange={imageChange} />
                                </div>
                                <div className={`form-group form-group-with-icon portfolio-input${content ? ' form-group-focus' : ''}`}>
                                    <textarea id="aboutme_content" name="content" className="form-control portfolio-textarea" wrap="hard" value={content || ""} placeholder="포트폴리오 설명을 작성해주세요📝" onChange={contentChange} />
                                    <div className="form-control-border aboutme-textarea"></div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-center">
                                <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PortfolioPopup;