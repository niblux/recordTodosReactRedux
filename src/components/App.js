import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  addTodo, updateTodo, removeTodo, startRecording, stopRecording, clearRecordings, clearTodos,
} from "../actions/index";
import Record from "./Record";
import "../App.css";

function App({ todos, dispatch, recordingState, recordings }) {
  // console.log('recordings', recordings);

  let nameInput = useRef("null");
  // let descInput = useRef("null");

  const [editing, setEditing] = useState({});
  const [events, setEvents] = useState([]);
  const [inputPlayback, setInputPlayback] = useState([]);

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
    console.log('id', id);
    console.log('e', e);
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


  /* Recording and Playback of TODOS CRUD  */

  const filterRecorded = () => {
    return recordings.filter((todo) => todo.isRecording);
  };

  const play = (recordedTodos) => {
    // clear todos in prepration of recording playback. 
    dispatch(clearTodos());

    console.log('recordedTodos', recordedTodos);
    let counter = 1000;
    playbackInput(processUserInput());

    return recordedTodos.map((rec, index, array) => {


      if (rec.type === "_ADD_TODO") {
        setTimeout(
          () => dispatch(addTodo({ name: rec.name })),
          (counter = counter + 1000)
        );
      }


      // if (rec.type === "_REMOVE_TODO") {
      //   setTimeout(
      //     () => dispatch(remove(rec.id, null)),
      //     (counter = counter + 1000)
      //   );
      // }

      // switch (rec.type) {
      //   case "_ADD_TODO":

      //   case "_UPDATE_TODO":
      //     setTimeout(
      //       () => dispatch(updateTodo(rec.id, rec.name, null)),
      //       (counter = counter + 1000)
      //     );
      //   case "_REMOVE_TODO":
      //     setTimeout(
      //       () => dispatch(remove(rec.id, null)),
      //       (counter = counter + 1000)
      //     );
      //     break;
      //   default:
      //     break;
      // }
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
        <div className="container">
          <div className="item-a">
            <p>
              <input ref={nameInput} onChange={(e) => recordInput(e)} onKeyPress={add} type="text" id="name" name="name"></input>
            </p>
            <ul>
              {todos &&
                todos.map((todo, index) =>
                  editing && editing === todo.id ? (
                    <input onKeyPress={(e) => update(e, todo, index)} key={todo.id} defaultValue={todo.name} type="text" id="name" name="name" />
                  ) : (
                      <>
                        <li onClick={(e) => edit(e, todo.id)} key={todo.id}>
                          {todo.name}
                          {/* <p>{todo.description}</p> */}
                          <button onClick={(e) => remove(e, todo.id)}>X</button>
                        </li>
                      </>
                    )
                )}
            </ul>
            <button onClick={record}>Record</button>
            <button onClick={clear}>Clear</button>
            <button onClick={stop}>Stop</button>
            <button onClick={(e) => play(filterRecorded())}>Play</button>
          </div>
          <div className="item-b">
            {/* DEBUGGING PLAYBACK */}
            {/* <ul>
              {inputPlayback &&
                inputPlayback.map((recs, index) => <p key={index}>
                  {console.log('recs', recs)}
                  {recs}
                </p>)}
            </ul> */}
          </div>
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
