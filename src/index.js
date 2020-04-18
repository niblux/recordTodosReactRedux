import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import todoStore from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = store => next => action => {
    let result = next(action);
    return result;
}

const saveStateToLocal = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}
const persistedState = saveStateToLocal();
const store = createStore(todoStore, persistedState, composeWithDevTools(
    applyMiddleware(logger),
));

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState)
    } catch (error) {
        console.log('error in saving state', error);
    }
}

store.subscribe(() => {
    saveState(store.getState())
})

const currentState = store.getState();
console.log('currentState', currentState);

const unsubscribe = store.subscribe(() => console.log('current State', currentState));

unsubscribe();

export default store;

ReactDOM.render(
    <Provider store={store}>
        <App />,
    </Provider>,
    document.getElementById('root'));