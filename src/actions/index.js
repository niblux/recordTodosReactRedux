export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const CLEAR_RECORDINGS = 'CLEAR_RECORDINGS';
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}


export function addTodo(payload) {
    return {
        type: ADD_TODO,
        payload
    }
}

export function removeTodo(id) {
    return { type: REMOVE_TODO, id }
}

export function updateTodo(id, text) {
    return { type: UPDATE_TODO, id, text }
}

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}

export function clearRecordings() {
    return { type: CLEAR_RECORDINGS }
}