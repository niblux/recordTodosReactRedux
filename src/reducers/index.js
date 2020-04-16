import {
    _ADD_TODO, _REMOVE_TODO, _UPDATE_TODO, START_RECORDING, SAVE_RECORDINGS,
    STOP_RECORDING, CLEAR_RECORDINGS, GET_ACTION_TYPE
} from '../actions';
import { combineReducers } from 'redux';

const initialState = [
    {
        id: 1,
        name: 'Stuff to do',
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
    switch (action.type) {
        case SAVE_RECORDINGS:
            return [
                action.payload,
                ...state
            ];
        case CLEAR_RECORDINGS:
            return [];
        default:
            return state;
    }
}

function getActionType(state = '', action) {
    switch (action.type) {
        case GET_ACTION_TYPE:
            return action.type
        default:
            return state;
    }
}

function todos(state = initialState, action) {
    switch (action.type) {
        case GET_ACTION_TYPE:
            return action.type
        case _ADD_TODO:
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    text: action.payload.text,
                    type: action.payload.type,
                    isRecording: action.payload.isRecording
                },
                ...state
            ]
        case _REMOVE_TODO:
            return state.filter(item => item.isRecording = action.isRecording, item.type = action.payload.type
                && item.id !== action.id);
        case _UPDATE_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    { ...todo, text: action.text, type: action.payload.type, isRecording: action.isRecording } :
                    todo
            )

        default:
            return state;
    }
}

const todoStore = combineReducers({ todos, saveRecordings, recordingState, getActionType })

export default todoStore; 
