import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO, CLEAR_RECORDINGS } from '../actions';
import { combineReducers } from 'redux';

const initialState = [
    {
        id: 1,
        text: 'Cashews',
        type: ''
    },
]

// function clearRecordings(state = [], action) {
//     switch (action.type) {
//         case CLEAR_RECORDINGS:
//             return []
//     }
// }

function todos(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })
        case ADD_TODO:
            return [
                { id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1, text: action.payload.text },
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

const todoStore = combineReducers({ todos })

export default todoStore; 
