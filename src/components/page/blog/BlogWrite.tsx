import { useState } from "react";

const BlogWrite = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('img/blog/blog_post_1_full.jpg');
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [content, setContent] = useState('');

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
            setImage('img/blog/blog_post_1_full.jpg');
        }
    };

    const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
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
                <div className={`form-group form-group-with-icon portfolio-input${content ? ' form-group-focus' : ''}`}>
                    <textarea id="blog_content" name="content" className="form-control portfolio-textarea" wrap="hard" value={content || ""} onChange={contentChange} />
                    <div className="form-control-border aboutme-textarea"></div>
                </div>
            </article>
        </div>
    )
};

export default BlogWrite;