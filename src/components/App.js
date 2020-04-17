import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, removeTodo, startRecording, stopRecording, saveRecordings, clearRecordings, getActionType } from '../actions/index';
import Record from './Record';
import '../App.css'

function App({ todos, dispatch, recordingState }) {

    let input = useRef('null');


    const recs = [];

    const [editing, setEditing] = useState({});
    const [events, setEvents] = useState([]);
    const [playback, setPlayback] = useState([]);

    const recordInput = (e) => {
        const { value } = e.target;
        setEvents([...events, { value }]);
    }

    // add
    const add = (e) => {
        // dispatch(getActionType());
        if (e.target.value == '') {
            return
        }
        const { name, value } = e.target;
        if (e && e.key === 'Enter') {
            // store record of action 
            // dispatch(saveRecordings(getActionState))
            // check if were recording 
            recordingState ? dispatch(addTodo({ [name]: value, isRecording: true }))
                : dispatch(addTodo({ [name]: value, isRecording: false }))
            input.current.value = '';
        }
    }

    // delete
    const remove = (e, id) => {
        dispatch(saveRecordings(getActionState()))
        recordingState ? dispatch(removeTodo(id, true))
            : dispatch(removeTodo(id, false));
    }

    // set input to edit mode 
    const edit = (e, id) => {
        setEditing(id);
    }

    // update 
    const update = (e, todo) => {
        const { value } = e.target;
        if (e.key === 'Enter') {
            // dispatch(saveRecordings(getActionState))
            recordingState ? dispatch(updateTodo(todo.id, value, true))
                : dispatch(updateTodo(todo.id, value, false));
            setEditing({});
        }
    };

    const filterRecorded = () => {
        return todos.filter(todo => todo.isRecording === true);
    }


    // const play = (recordedTodos) => {

    // }

    const record = () => {
        dispatch(startRecording(true));
    }

    const stop = () => {
        dispatch(stopRecording(false));
    }

    const clear = () => {
        dispatch(clearRecordings());
    }

    return (
        <>
            <div>
                <div className="container">

                    <div className="item-a">
                        <p><input ref={input} onChange={(e) => recordInput(e)} onKeyPress={add} type="text" id="text" name="text"></input></p>
                        <ul>
                            {
                                todos && todos.map((todo, index) => editing && editing === todo.id ?
                                    <input onKeyPress={e => update(e, todo, index)} key={todo.id} defaultValue={todo.text} type="text" id="text" name="text" />
                                    :
                                    <>
                                        <li onClick={(e) => edit(e, todo.id)} key={todo.id}>{todo.text}
                                            <button onClick={(e) => remove(e, todo.id)}>X</button>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                        <button onClick={record} >Record</button>
                        <button onClick={clear} >Clear</button>
                        <button onClick={stop}>Stop</button>
                        <button>Play</button>
                    </div>
                    <div className='item-b'>
                        {/* <Record events={events} /> */}
                        <p><input type="text" id="text" name="text"></input></p>
                        <ul>
                            {
                                playback && playback.map((recs, index) => {
                                    return <li key={index}>{recs.text}</li>
                                })
                            }
                        </ul>
                    </div>

                </div>

            </div>
        </>
    )
};

const mapStateToProps = state => {
    return {
        todos: state.todos,
        recordingState: state.recordingState,
        recordings: state.saveRecordings,
    }
};

export default connect(mapStateToProps)(App);