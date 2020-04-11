import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoStore from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(todoStore, composeWithDevTools(

));

const currentState = store.getState();

const unsubscribe = store.subscribe(() => console.log('current State', currentState));

unsubscribe();

ReactDOM.render(
    <Provider store={store}>
        <App />,
    </Provider>,
    document.getElementById('root'));