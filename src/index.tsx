import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();