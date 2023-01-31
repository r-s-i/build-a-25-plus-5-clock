import React, { useState } from "react";

function Timer() {
  return (
    <div>
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
      <button id="break-decrement">b-</button>
      <button id="session-decrement">s-</button>
      <button id="break-increment">b+</button>
      <button id="session-increment">s+</button>
      <div id="break-length">5</div>
      <div id="timer-label">Session</div>
      <div id="session-length">25</div>
      <div id="time-left">25:00</div>
      <button id="start_stop">Start / Stop</button>
      <br></br>
      <button id="reset">Reset</button>
    </div>
  );
}

export default Timer;
