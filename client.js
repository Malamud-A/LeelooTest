import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './src/redux/createStore';
import {Provider} from 'react-redux';
import App from './src/components/App';
import './style.scss';

const store = configureStore();
const Application = () => {
    return (
        <Provider store={store} key="provider">
            <App />
        </Provider>);
};

ReactDOM.render(<Application/>, document.getElementById('app'));