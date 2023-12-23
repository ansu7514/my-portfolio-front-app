import { useState } from "react";
import { useSelector } from "react-redux";
import { BLOG_CREATE } from "../../../serverApi";
import { RootState } from "../../../redux/store";
import { TagsInput } from "react-tag-input-component";

import Alert from "../../Alert";
import { useNavigate } from "react-router-dom";

const BlogWrite = () => {
    const navigate = useNavigate();

    const user_id = useSelector((state: RootState) => state.user.info?.user_id) || '';

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('/img/blog/blog_post_1_full.jpg');
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<Array<string>>([]);


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
            setImage('/img/blog/blog_post_1_full.jpg');
        }
    };

    const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const tagsChange = (value: Array<string>) => {
        setTags(value);
    };

    const saveBtnClick = async () => {
        if (!title && !content) {
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 정보를 모두 입력해주세요', position: "bottom-center" });
            return false;
        }

        const formData = new FormData();

        formData.append('user_id', user_id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', tags.join(','));
        if (inputFile) formData.append('input_file', inputFile);

        try {
            await fetch(
                BLOG_CREATE,
                { method: 'post', body: formData }
            ).then(res => res.json())
                .then(response => {
                    const { success } = response;

                    if (success) {
                        Alert({ toast: true, confirm: false, error: false, title: '', desc: '✅ 블로그 작성에 성공했습니다', position: "bottom-center" });
                    } else {
                        Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 블로그 작성에 실패했습니다', position: "bottom-center" });
                    }
                });
        } catch (error) {
            console.error(error);
            Alert({ toast: true, confirm: false, error: true, title: '', desc: '⚠️ 블로그 작성에 실패했습니다', position: "bottom-center" });
        }
    };

    return (
        <div className="single-page-content">
            <article className="post blog-div">
                <div className={`form-group form-group-with-icon blog-input${title ? ' form-group-focus' : ''}`}>
                    <input id="blog_title" type="text" name="title" className="form-control" value={title || ""} onChange={titleChange} />
                    <label>TITLE</label>
                    <div className="form-control-border"></div>
                </div>
                <div className="blog-item-img">
                    <img src={image} alt="blog-img" />
                </div>
                <div className="form-group form-group-with-icon blog-input blog-image-div">
                    <input id="blog-img" type="file" className="button btn-secondary" accept="image/jpeg, image/gif, image/png" onChange={imageChange} />
                </div>
                <div className={`form-group form-group-with-icon blog-input${content ? ' form-group-focus' : ''}`}>
                    <textarea id="blog_content" name="content" className="form-control blog-textarea" wrap="hard" value={content || ""} onChange={contentChange} />
                    <div className="form-control-border blog-textarea"></div>
                </div>
                <label>TAGS</label>
                <div className="form-group form-group-with-icon blog-input">
                    <TagsInput value={tags} onChange={tagsChange} name="tags" />
                    <div className="form-control-border"></div>
                </div>
                <div className="col-xs-12 col-sm-12 col-center">
                    <button className="button btn-send" onClick={saveBtnClick}>SAVE</button>
                </div>
            </article>
        </div>
    )
};

export default BlogWrite;