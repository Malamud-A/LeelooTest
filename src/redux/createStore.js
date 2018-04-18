/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './index';

export default function configureStore(initialState = {}) {
    const middleware = applyMiddleware(thunk);
    let enhancer = middleware;
    if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
        enhancer = compose(middleware, window.devToolsExtension());
    }
    const store = createStore(reducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept('./index', () => {
            return store.replaceReducer(require('./index').default);
            /* .default if you use Babel
             6+ */
        });
    }

    return store;
}
