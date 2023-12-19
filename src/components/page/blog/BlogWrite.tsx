import { useState } from "react";

const BlogWrite = () => {
    const [title, setTitle] = useState('');

    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <div className="single-page-content">
            <article className="post">
                <div className={`form-group form-group-with-icon portfolio-input${title ? ' form-group-focus' : ''}`}>
                    <input id="title" type="text" name="title" className="form-control" value={title || ""} onChange={titleChange} />
                    <label>TITLE</label>
                    <div className="form-control-border"></div>
                </div>
            </article>
        </div>
    )
};

export default BlogWrite;