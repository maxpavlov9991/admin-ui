/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';
import watchLoadData from './sagas/rolesSaga'

const configureStore = (initialState) => {
    const sagaMiddleware = createSagaMiddleware();
    const isDevelopment = process.env.NODE_ENV === 'development';
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension && isDevelopment
                ? window.devToolsExtension()
                : (f) => f,
        ),
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    sagaMiddleware.run(sagas);
    sagaMiddleware.run(watchLoadData)
    store.close = () => store.dispatch(END);
    return store;
};

export default configureStore();
