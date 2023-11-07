import React from 'react';

import Header from './container/Header';

import './css/reset.css';
import './css/bootstrap-grid.min.css';
import './css/animations.css';
import './css/perfect-scrollbar.css';
import './css/owl.carousel.css';
import './css/magnific-popup.css';
import './css/main.css';

const App = () => {
    return (
        <>
            <div className="lm-animated-bg" style={{ backgroundImage: 'url(img/main_bg.png)' }}></div>

            <div className="page">
                <div className="page-content">
                    <Header />
                </div>
            </div>
        </>
    );
}

export default App;