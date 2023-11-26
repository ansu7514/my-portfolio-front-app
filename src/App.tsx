/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { setLogin, setUserInfo } from "./redux/reducer/UserReducer";

import Header from './container/Header';
import Content from './container/Content';
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
    const dispatch = useDispatch();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo && userInfo !== null) {
            const { login, info } = JSON.parse(userInfo);

            dispatch(setLogin(login));
            dispatch(setUserInfo(info));
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="lm-animated-bg" style={{ backgroundImage: 'url(img/main_bg.png)' }}></div>
            <div className="page">
                <div className="page-content">
                    <Header />
                    <Content />

                    <Toaster />
                    <PopupList />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;