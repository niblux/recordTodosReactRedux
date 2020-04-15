import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../actions';
import { combineReducers } from 'redux';

// let id = Math.floor(Math.random() * 100);

const initialState = [
    {
        id: 1,
        text: 'Cashews',
        type: ''
    },
]

function getActionState(state = '', actionState) {
    return actionState;
}

function todos(state = initialState, action) {
    getActionState('', action.type)
    switch (action.type) {
        case ADD_TODO:
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    text: action.payload.text,
                },
                ...state
            ]
        case REMOVE_TODO:
            return state.filter(item => item.type = action.type && item.id !== action.id);
        case UPDATE_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    { ...todo, text: action.text } :
                    todo
            )
        default:
            return state;
    }
}

// function todos(state = initialState, action) {
//     return { todos: todos(state.todos, action) }
// }

const todoStore = combineReducers({ todos, getActionState })

export default todoStore; 
