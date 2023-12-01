import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPopuup } from "../../../redux/reducer/PopupReducer";

import { AboutMeTechStackType } from "../../../types/AboutMeType";

export const stackLink: AboutMeTechStackType = {
    React : 'https://react.dev/',
    Next: 'https://nextjs.org/',
    Vue: 'https://vuejs.org/',
    Angular: 'https://angular.io/',
    JavaScript: 'https://ecma-international.org/',
    TypeScript: 'https://www.typescriptlang.org/',
    Node: 'https://nodejs.org/',
    Spring: 'https://spring.io/',
    Django: 'https://www.djangoproject.com/',
    MySql: 'https://www.mysql.com/',
    Postgre: 'https://www.postgresql.org/',
    MongoDB: 'https://www.mongodb.com/',
    HTML: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    Css: 'https://developer.mozilla.org/en-US/docs/Web/css',
    Scss: 'https://sass-lang.com/',
    Figma: 'https://www.figma.com/',
    PhotoShop: 'https://www.adobe.com/products/photoshop.html',
    Illustrator: 'https://www.adobe.com/products/illustrator.html'
};

const AboutMeTechStack = () => {
    const dispatch = useDispatch();

    const techStack = useSelector((state: RootState) => state.user.techStack) || [];

    const editBtnClick = () => {
        dispatch(setPopuup(['techStackPopup', true]));
    };

    const techStackDataList = techStack.map(tech => {
        const techClick = () => {
            window.open(stackLink[tech], "_blank", "noopener, noreferrer");
        };

        return (
            <div key={`about_me_tech_${tech}`} className="col-xs-12 col-sm-2" onClick={techClick}> 
                <div className="fun-fact gray-default tech-stack-div">
                    <img src={`img/techlogo/${tech}.png`} alt={tech} />
                    <h4>{tech}</h4>
                    <span className="fun-fact-block-text"></span>
                </div>
            </div>
        )
    });

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 edit-title">
                <div className="block-title">
                    <h3>Tech <span>Stack</span></h3>
                </div>
                <button className="button btn-sm btn-secondary" onClick={editBtnClick}>EDIT</button>
            </div>
            {techStackDataList}
        </div>
    )
};

export default AboutMeTechStack;