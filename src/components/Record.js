import React, { useState, useEffect, useRef } from 'react';

function Record(props) {
    // console.log('props', props);

    const intitialState = [{ val: '', time: Date.now() }]
    const rec = useRef('null');

    const [recordings, setRecordings] = useState(intitialState);
    const [playback, setPlayback] = useState([]);
    const [timers, storeTimers] = useState([]);

    const storeEvents = () => {
        props.events.map(rec => {
            setRecordings([...recordings, rec])
        })
    }

    const storeRecordings = () => {
        // console.log('recordings', recordings);
        return recordings && recordings.reduce((prev, cur, index, array) => {
            // console.log('>>> in the storing', array)
            if (cur.val.length >= 1) {
                return prev.concat({ value: cur.val });
            }
            return prev
        }, [])
    }

    const playEvent = (result) => {
        let counter = 1000;
        return result.map(item => {
            storeTimers([...timers, setTimeout(() => setPlayback([...playback, item]), counter = counter + 1000)])
        })
    }

    const stopPlayback = () => {
        // console.log('stop', typeof Object.prototype.toString().call(recordings));
        console.log('clicked');
        console.log('timers', timers);
        clearTimeout(timers.pop());
    }

    // console.log('result', result);


    // useEffect(() => { storeEvents() }, [props.events]);

    return (
        <>
            <h1>I'm the record component</h1>
            {/* {recordings && recordings.map((i, index) => {
                return <p key={index}>{i.val}</p>
            })} */}

            <h1>I am the playback area</h1>
            {playback && playback.map((recs, index) => {
                return <p key={index}>{recs.value}</p>
            })}

            <button onClick={props.recordState} >Record</button>
            <button onClick={props.clear} >Clear</button>
            <button onClick={stopPlayback}>Stop</button>
            {/* <button>Play</button> */}
            <button onClick={(e) => playEvent(storeRecordings())}>Play</button>
            {/* <button onClick={(e) => record(e, props.events)} >Record</button> */}
        </>
    );
};

export default Record;