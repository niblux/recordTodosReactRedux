export const _ADD_TODO = "_ADD_TODO";
export const _REMOVE_TODO = "_REMOVE_TODO";
export const _UPDATE_TODO = "_UPDATE_TODO";
export const START_RECORDING = "START_RECORDING";
export const STOP_RECORDING = "STOP_RECORDING";
export const SAVE_RECORDINGS = "SAVE_RECORDINGS";
export const CLEAR_RECORDINGS = "CLEAR_RECORDINGS";
export const _CLEAR_TODOS = "_CLEAR_TODOS";
export const COMPLETE_TODO = "COMPLETE_TODO";

export function addTodo(payload) {
  console.log("payload", payload);
  return { type: _ADD_TODO, payload };
}

export function removeTodo(id, isRecording) {
  return { type: _REMOVE_TODO, id, isRecording };
}

export function updateTodo(id, name, isRecording) {
  return { type: _UPDATE_TODO, id, name, isRecording };
}

export function clearTodos(payload) {
  return { type: _CLEAR_TODOS, payload };
}

export function completeTodo(payload) {
  console.log('payload', payload);
  return { type: COMPLETE_TODO, payload };
}

export function startRecording(isRecording) {
  return { type: START_RECORDING, isRecording };
}

export function stopRecording(isRecording) {
  return { type: STOP_RECORDING, isRecording };
}

export function saveRecordings(payload) {
  return { type: SAVE_RECORDINGS, payload };
}

export function clearRecordings(payload) {
  return { type: CLEAR_RECORDINGS, payload };
}
