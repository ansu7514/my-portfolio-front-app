import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { BrowserRouter } from 'react-router-dom';

import Header from './container/Header';
import Content from './container/Content';
import Loading from './components/Loading';
import PopupList from './container/PopupList';

import { Toaster } from "react-hot-toast";

import './css/reset.css';
import './css/bootstrap-grid.min.css';
import './css/animations.css';
import './css/perfect-scrollbar.css';
import './css/owl.carousel.css';
import './css/magnific-popup.css';
import './css/main.css';
import './css/custom.css';

const App = () => {
    const loading = useSelector((state: RootState) => state.loading);

    return (
        <BrowserRouter>
            {loading && <Loading />}
            <div className="lm-animated-bg" style={{ backgroundImage: 'url(img/main_bg.png)' }}></div>
            <div className="page">
                <div className="page-content">
                    <Header />
                    <Content />

                    <div className="mfp-bg mfp-fade mfp-ready toast_bg"></div>
                    <Toaster />
                    <PopupList />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;