import {
    _ADD_TODO, _REMOVE_TODO, _UPDATE_TODO, START_RECORDING, SAVE_RECORDINGS,
    STOP_RECORDING, CLEAR_RECORDINGS, _CLEAR_TODOS
} from '../actions';
import { combineReducers } from 'redux';
import { isEmpty } from '../helpers';

const initialState = [
    {
        id: 1,
        text: 'Stuff to do',
        description: 'Doing more stuff',
        type: '',
        isRecording: false
    },
]

function recordingState(state = false, action) {
    switch (action.type) {
        case START_RECORDING:
            return state = true
        case STOP_RECORDING:
            return state = false
        default:
            return state;
    }
}

function saveRecordings(state = [], action) {
    // console.log('action in saverecording', action);
    switch (action.type) {
        case _ADD_TODO:
            return [
                action.payload,
                ...state
            ];
        case _REMOVE_TODO:
            return [
                action,
                ...state
            ];
        case _UPDATE_TODO:
            return [
                action,
                ...state
            ];
        case CLEAR_RECORDINGS:
            return [];
        default:
            return state;
    }
}

// function getActionType(state = {}, action) {
//     switch (action.type) {
//         case _ADD_TODO:
//             return { ...state, type: action };
//         case _UPDATE_TODO:
//             return { ...state, type: action };
//         case _REMOVE_TODO:
//             return { ...state, type: action };
//         default:
//             return state;
//     }
// }

// you would have to dispatch getActionType
// that would return the type 
// which you coul make availanle as a promp
// and use that or store them

function todos(state = initialState, action) {
    console.log('action', action);
    switch (action.type) {
        case _ADD_TODO:
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    text: action.payload.text,
                    isRecording: action.payload.isRecording
                },
                ...state
            ]
        case _REMOVE_TODO:
            return state.filter(item => item.id !== action.id);
        case _UPDATE_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    { ...todo, text: action.text, isRecording: action.isRecording } :
                    todo
            )
        case _CLEAR_TODOS:
            return [];
        default:
            return state;
    }
}

const todoStore = combineReducers({ todos, saveRecordings, recordingState })

export default todoStore; 
