export const _ADD_TODO = '_ADD_TODO';
export const _REMOVE_TODO = '_REMOVE_TODO';
export const _UPDATE_TODO = '_UPDATE_TODO';
export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const SAVE_RECORDINGS = 'SAVE_RECORDINGS';
export const CLEAR_RECORDINGS = 'CLEAR_RECORDINGS';
export const GET_ACTION_TYPE = 'GET_ACTION_TYPE';


export function addTodo(payload) {
    return { type: _ADD_TODO, payload }
}

export function removeTodo(id, isRecording) {
    return { type: _REMOVE_TODO, id, type, isRecording }
}

export function updateTodo(id, text, isRecording) {
    return { type: _UPDATE_TODO, id, text, type, isRecording }
}

export function startRecording(isRecording) {
    return { type: START_RECORDING, isRecording }
}

export function stopRecording(isRecording) {
    return { type: STOP_RECORDING, isRecording }
}

export function saveRecordings(payload) {
    return { type: SAVE_RECORDINGS, payload }
}

export function clearRecordings(payload) {
    return { type: CLEAR_RECORDINGS, payload }
}

export function getActionType(type) {
    return { type: GET_ACTION_TYPE, type }
}