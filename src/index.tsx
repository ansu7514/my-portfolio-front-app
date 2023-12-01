import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { persistStore } from 'redux-persist';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

reportWebVitals();