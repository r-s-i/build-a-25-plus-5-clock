import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [isSession, setIsSession] = useState(true);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const timerRef = useRef({ mins: sessionLength, secs: 0 });
  const [running, setRunning] = useState(false);
  const intervalId = useRef(null);
  const [timer, setTimer] = useState(
    `${timerRef.current.mins}:${
      timerRef.current.secs < 10
        ? "0" + timerRef.current.secs
        : timerRef.current.secs
    }`
  );

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (running) {
        if (timerRef.current.mins === 0 && timerRef.current.secs === 0) {
          // reset
          if (isSession) {
            timerRef.current.mins = breakLength;
            setIsSession(false);
          } else {
            timerRef.current.mins = sessionLength;
            setIsSession(true);
          }
        } else if (timerRef.current.secs === 0) {
          timerRef.current.secs = 59;
          timerRef.current.mins--;
        } else {
          timerRef.current.secs--;
        }
        setTimer(
          `${
            timerRef.current.mins < 10
              ? "0" + timerRef.current.mins
              : timerRef.current.mins
          }:${
            timerRef.current.secs < 10
              ? "0" + timerRef.current.secs
              : timerRef.current.secs
          }`
        );
        // Play sound when hitting 00:00:
        if (timerRef.current.secs === 0 && timerRef.current.mins === 0) {
          document.getElementById("beep").play();
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isSession, intervalId, running, breakLength, sessionLength]);

  // Handles:
  const handleStartStop = () => {
    clearInterval(intervalId.current);
    setRunning(!running);
  };

  const handleReset = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    clearInterval(intervalId.current);
    setRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    timerRef.current = { mins: 25, secs: 0 };
    setTimer(
      `${timerRef.current.mins}:${
        timerRef.current.secs < 10
          ? "0" + timerRef.current.secs
          : timerRef.current.secs
      }`
    );
  };

  function handleDecOrInc(e) {
    const id = e.target.id;

    if (!running) {
      if (id === "break-decrement" && breakLength > 1) {
        if (!isSession) {
          if (timerRef.current.secs !== 0) {
            setBreakLength(Math.ceil(timerRef.current.mins) + 1);
          }
          if (timerRef.current.secs === 0) {
            timerRef.current.mins = breakLength - 1;
          } else {
            timerRef.current.secs = 0;
          }
        }
        setBreakLength((prev) => prev - 1);
      } else if (id === "break-increment" && breakLength < 60) {
        if (!isSession) {
          timerRef.current.mins = breakLength + 1;
          timerRef.current.secs = 0;
        }
        setBreakLength((prev) => prev + 1);
      } else if (id === "session-decrement" && sessionLength > 1) {
        if (timerRef.current.secs !== 0) {
          setSessionLength(Math.ceil(timerRef.current.mins) + 1);
        }
        if (isSession) {
          if (timerRef.current.secs === 0) {
            timerRef.current.mins = sessionLength - 1;
          } else {
            timerRef.current.secs = 0;
          }
        }
        setSessionLength((prev) => prev - 1);
      } else if (id === "session-increment" && sessionLength < 60) {
        if (isSession) {
          timerRef.current.mins = sessionLength + 1;
          timerRef.current.secs = 0;
        }
        setSessionLength((prev) => prev + 1);
      }
    }

    setTimer(
      `${timerRef.current.mins}:${
        timerRef.current.secs < 10
          ? "0" + timerRef.current.secs
          : timerRef.current.secs
      }`
    );
  }

  return (
    <div>
      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      <div id="time-left">{timer}</div>
      <button id="start_stop" onClick={handleStartStop}>
        Start / Stop
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
      <div id="break-label">Break Length:</div>
      <div id="break-length">{breakLength}</div>
      <div id="session-label">Session Length:</div>
      <div id="session-length">{sessionLength}</div>
      <button id="session-decrement" onClick={handleDecOrInc}>
        S-
      </button>
      <button id="session-increment" onClick={handleDecOrInc}>
        S+
      </button>
      <button id="break-decrement" onClick={handleDecOrInc}>
        B-
      </button>
      <button id="break-increment" onClick={handleDecOrInc}>
        B+
      </button>
    </div>
  );
};

export default Timer;
