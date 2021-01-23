import { persistReducer } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'insta-root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = applyMiddleware(thunk)

const store = createStore(persistedReducer, composeWithDevTools(middleware))

export default store;
