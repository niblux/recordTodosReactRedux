import React, { useState, useEffect, useRef } from 'react';

function Record(props) {
    const rec = useRef('null');

    const [recordings, setRecordings] = useState([]);
    const [playback, setPlayback] = useState([]);
    const [timers, storeTimers] = useState([]);

    const storeEvents = () => {
        props.events.map(rec => {
            setRecordings([...recordings, rec])
        })
    }

    const storeRecordings = () => {
        return recordings && recordings.reduce((prev, cur) => {
            if (cur.value.length >= 1) {
                return prev.concat(cur.value);
            }
            return prev
        }, [])
    }

    const playEvent = (result) => {
        let counter = 1000;
        return result.map(item => {
            setTimeout(() => setPlayback([...playback, item]), counter = counter + 1000);
        })
    }

    const stopPlayback = () => {
        clearTimeout(timers.pop());
    }

    // useEffect(() => { storeEvents() }, [props.events]);

    return (
        <>
            <h4>I am the playback area</h4>
            {playback && playback.map((recs, index) => {
                console.log('recs', recs);
                return <p key={index}>{recs}</p>
            })}

            <button onClick={props.recordState} >Record</button>
            <button onClick={props.clear} >Clear</button>
            <button onClick={stopPlayback}>Stop</button>
            <button onClick={(e) => playEvent(storeRecordings())}>Play</button>
        </>
    );
};

export default Record;