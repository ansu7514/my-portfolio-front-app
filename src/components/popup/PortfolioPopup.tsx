import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../redux/reducer/PopupReducer";
import { setPortfolioList } from "../../redux/reducer/PortfolioReducer";
import { FILE_LOAD, PORTFOLIO, PORTFOLIO_CREATE, PORTFOLIO_DELETE, PORTFOLIO_UPDATE } from "../../serverApi";

import Alert from "../Alert";

const PortfolioPopup = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id) || '';
    const { portfolioId, portfolioUpload, portfolioList } = useSelector((state: RootState) => state.portfolio);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('img/portfolio/1.jpg');
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (portfolioId) {
            portfolioList.forEach(portfolio => {
                const { portfolio_id, title, image, image_path, content } = portfolio;

                if (portfolioId === portfolio_id) {
                    setTitle(title);
                    setContent(content);

                    if (image && image_path) {
                        const imagePath = encodeURIComponent(image_path);
                        const imageSrc = FILE_LOAD + `/${imagePath}`;
                        setImage(imageSrc);
                    }
                }
            });
        } else {
            setTitle('');
            setImage('img/portfolio/1.jpg');
            setContent('');
        }
    }, [portfolioId, portfolioList]);

    const closePopup = () => {
        dispatch(setPopuup(['portfolioPopup', false]));
    };

    const closeBtnClick = () => {
        if (portfolioUpload) closePopup();
        else Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '포트폴리오 정보가 저장되지 않을 수 있습니다.', checkClick: closePopup, position: "top-center" });
    };

    const deleteBtnClick = () => {
        const deleteFunc = async () => {
            try {
                await fetch(
                    PORTFOLIO_DELETE,
                    { method: 'post', body: JSON.stringify({ user_id, portfolio_id: portfolioId }), headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
                ).then(res => res.json())
                    .then(response => {
                        const { success } = response;
    
                        if (success) {
                            getPortfolio();
                            closePopup();
    
                            Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 포트폴리오 삭제에 성공했습니다.', position: "bottom-center" });
                        } else {
                            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 포트폴리오 삭제에 실패했습니다.', position: "bottom-center" });
                        }
                    });
            } catch (error) {
                console.error(error);
                Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 포트폴리오 삭제에 실패했습니다.', position: "bottom-center" });
            }
        };

        Alert({ toast: false, confirm: true, error: false, title: '⚠️ 경고', desc: '포트폴리오를 삭제하시겠습니까?', checkClick: deleteFunc, position: "top-center" });
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

    const saveBtnClick = async (type: string) => {
        if (!title || !content) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 정보를 모두 입력해주세요.', position: "bottom-center" });
            return false;
        }

        const formData = new FormData();

        formData.append('user_id', user_id);
        formData.append('title', title);
        formData.append('content', content);
        if (inputFile) formData.append('input_file', inputFile);
        if (type === 'edit') formData.append('portfolio_id', String(portfolioId));

        const URL = type === 'save' ? PORTFOLIO_CREATE : PORTFOLIO_UPDATE;
        const desc = type === 'save' ? '저장' : '수정';

        try {
            await fetch(
                URL,
                { method: 'post', body: formData }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        getPortfolio();
                        closePopup();

                        Alert({ toast: true, confirm: false, error: false, title: '', desc: `✅ 포트폴리오 ${desc}에 성공했습니다.`, position: "bottom-center" });
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: `⚠️ 포트폴리오 ${desc}에 실패했습니다.`, position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: `⚠️ 포트폴리오 ${desc}에 실패했습니다.`, position: "bottom-center" });
        }
    };

    const getPortfolio = async () => {
        try {
            await fetch(
                `${PORTFOLIO}/:${user_id}`,
                { method: 'get', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
            ).then(res => res.json())
                .then(response => {
                    const { success, data } = response;

                    if (success) dispatch(setPortfolioList(data));
                });
        } catch (error) {
            console.error(error);
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
                            {
                                portfolioUpload &&
                                <>
                                    <div className="fun-fact gray-default portfolio-div">
                                        <h3 className="name">{title}</h3>
                                        {
                                            image &&
                                            <div className="portfolio-item-img">
                                                <img className="img-upload" src={image} alt="portfolio-img" />
                                            </div>
                                        }
                                        <div className="portfolio-item-content">{content}</div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-center">
                                        <button className="button btn-error" onClick={deleteBtnClick}>DELETE</button>
                                    </div>
                                </>
                            }
                            {
                                !portfolioUpload &&
                                <>
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
                                    {
                                        !portfolioId &&
                                        <div className="col-xs-12 col-sm-12 col-center">
                                            <button className="button btn-send" onClick={() => saveBtnClick('save')}>SAVE</button>
                                        </div>
                                    }
                                    {
                                        portfolioId &&
                                        <div className="col-xs-12 col-sm-12 col-center">
                                            <button className="button btn-send" onClick={() => saveBtnClick('edit')}>EDIT</button>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PortfolioPopup;