import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../actions';
import { combineReducers } from 'redux';

let id = 1;

const initialState = [
    {
        id: id++,
        text: 'Cashews',
    },
    {
        id: id++,
        text: 'Chia',
    }
]

function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                { id: id++, text: action.payload.text },
                ...state
            ]
        case REMOVE_TODO:
            return state.filter(item => item.id !== action.id);
        case UPDATE_TODO:
            return state.map(todo => console.log('>>> TOD UPDATE', action) ||
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

const todoStore = combineReducers({ todos })

export default todoStore; 
