import React from 'react';

import Header from './container/Header';
import Content from './container/Content';

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
    return (
        <>
            <div className="lm-animated-bg" style={{ backgroundImage: 'url(img/main_bg.png)' }}></div>
            <div className="page">
                <div className="page-content">
                    <Header />
                    <Content />
                    <Toaster />
                </div>
            </div>
        </>
    );
}

export default App;