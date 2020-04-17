import {
  _ADD_TODO,
  _REMOVE_TODO,
  _UPDATE_TODO,
  START_RECORDING,
  STOP_RECORDING,
  CLEAR_RECORDINGS,
  _CLEAR_TODOS,
} from "../actions";
import { combineReducers } from "redux";

const initialState = [
  {
    id: 1,
    name: "Stuff to do",
    description: "Doing more stuff",
    creationDate: new Date(365 * 24 * 60 * 60 * 1000).toUTCString(),
    type: "",
    isRecording: false,
  },
];

function recordingState(state = false, action) {
  switch (action.type) {
    case START_RECORDING:
      return (state = true);
    case STOP_RECORDING:
      return (state = false);
    default:
      return state;
  }
}

function saveRecordings(state = [], action) {
  switch (action.type) {
    case _ADD_TODO:
      return [action.payload, ...state];
    case _REMOVE_TODO:
      return [action, ...state];
    case _UPDATE_TODO:
      return [action, ...state];
    case CLEAR_RECORDINGS:
      return [];
    default:
      return state;
  }
}

function todos(state = initialState, action) {
  switch (action.type) {
    case _ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1,
          name: action.payload.name,
          // description: action.payload.description,
          creationDate: new Date().toUTCString(),
          isRecording: action.payload.isRecording,
        },
        ...state,
      ];
    case _REMOVE_TODO:
      return state.filter((item) => item.id !== action.id);
    case _UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.id
          ? {
            ...todo,
            name: action.name,
            // description: action.payload.description,
            isRecording: action.isRecording,
          }
          : todo
      );
    case _CLEAR_TODOS:
      return [];
    default:
      return state;
  }
}

const todoStore = combineReducers({ todos, saveRecordings, recordingState });

export default todoStore;
