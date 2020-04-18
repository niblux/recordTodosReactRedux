import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  addTodo, updateTodo, removeTodo, startRecording, stopRecording, clearRecordings, clearTodos, completeTodo,
} from "../actions/index";
import Record from "./Record";
import "../App.css";

function App({ todos, dispatch, recordingState, recordings }) {
  // console.log('recordings', recordings);

  let nameInput = useRef("null");
  // let descInput = useRef("null");
  let toggle = false;

  const [editing, setEditing] = useState({});
  const [events, setEvents] = useState([]);
  const [inputPlayback, setInputPlayback] = useState([]);
  const [completed, setComplete] = useState(toggle);

  /* handle input playback */

  const recordInput = (e) => {
    const { value } = e.target;
    setEvents([...events, { value }]);
  };

  const processUserInput = () => {
    return events && events.reduce((prev, cur) => {
      if (cur.value.length >= 1) {
        return prev.concat(cur.value);
      }
      return prev
    }, [])
  }

  /**
   *
   * 1. type input
   * 2. input is stored
   * 3.  
   *
   */

  const playbackInput = (result) => {
    let counter = 1000;
    return result.map(item => {
      setTimeout(() => {
        setInputPlayback([...inputPlayback, item])
        nameInput.current.value = item;
      }, counter = counter + 1000);
    })
  }

  /* ----- */

  /* TODOS CRUD  */
  const add = (e) => {
    if (e.target.value == "") return;
    const { name, value } = e.target;

    if (e && e.key === "Enter") {
      // check if were recording
      recordingState ? dispatch(addTodo({ [name]: value, type: "_ADD_TODO", isRecording: true }))
        : dispatch(addTodo({ [name]: value, type: "_ADD_TODO", isRecording: false }));
      nameInput.current.value = "";
    }
  };

  const remove = (e, id) => {
    recordingState
      ? dispatch(removeTodo(id, true))
      : dispatch(removeTodo(id, false));
  };

  const edit = (e, id) => {
    setEditing(id);
  };

  const update = (e, todo) => {
    const { value } = e.target;
    if (e.key === "Enter") {
      // dispatch(saveRecordings(getActionState))
      recordingState
        ? dispatch(updateTodo(todo.id, value, true))
        : dispatch(updateTodo(todo.id, value, false));
      setEditing({});
    }
  };

  const checkTodo = (e, todo) => {
    console.log('todo', todo);
    !completed ? setComplete(true) : setComplete(false);
    dispatch(completeTodo(todo));
  }


  /* Recording and Playback of TODOS CRUD  */

  const filterRecorded = () => {
    return recordings.filter((todo) => todo.isRecording);
  };

  const play = (recordedTodos) => {
    // clear todos in prepration of recording playback. 
    dispatch(clearTodos());

    console.log('recordedTodos', recordedTodos);
    let counter = 1000;

    return recordedTodos.map((rec, index, array) => {

      return new Promise((resolve, reject) => {
        // Promise #1
        console.log('events', events.length);
        if (rec.type === "_ADD_TODO" && events.length >= 1) {
          console.log('do i pass the condition');

          playbackInput(processUserInput());
          setTimeout(
            () => dispatch(addTodo({ id: rec.id, name: rec.name })),
            (counter = counter + 1000)
          );
        }
        resolve();
      }).then((result) => {
        // Promise #2
        if (rec.type === "_UPDATE_TODO") {
          console.log('do i get here');
          setTimeout(
            () => dispatch(updateTodo(rec.id, rec.name)),
            (counter = counter + 1000)
          );
        }
        return result;
      }).then((result) => {
        // Promise #3
        if (rec.type === "_REMOVE_TODO") {
          console.log('do i get here');
          setTimeout(
            () => dispatch(removeTodo(rec.id)),
            (counter = counter + 1000)
          );
        }
        return result;
      }); // ... and so on!






    });
  };

  const record = () => dispatch(startRecording(true));

  const stop = () => dispatch(stopRecording(false));

  const clear = () => {
    dispatch(clearRecordings());
  };

  /* ----- */


  return (
    <>
      <div>
        <header className="header">Menu</header>
        <div className="container">
          <div className="item-a">
            <h1>Todo List</h1>
            <p>
              <input className="nameInput" ref={nameInput} onChange={(e) => recordInput(e)} onKeyPress={add} type="text" name="name"></input>
            </p>
            <ul>
              {todos &&
                todos.map((todo, index) =>
                  editing && editing === todo.id ? (
                    <input className="nameInput" onKeyPress={(e) => update(e, todo, index)} key={todo.id} defaultValue={todo.name} type="text" id="name" name="name" />
                  ) : (
                      <>
                        <li className={`${completed ? 'completed' : ''}`} onClick={(e) => edit(e, todo.id)} key={todo.id}>
                          {todo.name}
                        </li>
                        <div className="actions">
                          <button onClick={(e) => remove(e, todo.id)}>X</button>
                          <button className="check" value={completed} onClick={(e) => checkTodo(e, todo)} >/-</button>
                        </div>

                      </>
                    )
                )}
            </ul>
            <div class="">
              <button className="mainControls" onClick={record}>Record</button>
              <button className="mainControls" onClick={clear}>Clear</button>
              <button className="mainControls" onClick={stop}>Stop</button>
              <button className="mainControls" onClick={(e) => play(filterRecorded())}>Play</button>
            </div>
          </div>
          {/* <div className="item-b">
            DEBUGGING PLAYBACK
            <ul>
              {inputPlayback &&
                inputPlayback.map((recs, index) => <p key={index}>
                  {console.log('recs', recs)}
                  {recs}
                </p>)}
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    recordingState: state.recordingState,
    recordings: state.saveRecordings,
  };
};

export default connect(mapStateToProps)(App);
