import Button from "./Button";
import { useEffect, useState } from "react";
import Input from "../Input";
import Alarm from "../../assets/audio/alarm.mp3";

export const TimerButton = () => {
  const [timeSaved, setTimeSaved] = useState(0);
  const [timeCounter, setTimeCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setTimeCounter(timeSaved);
    setIsRunning(!isRunning);
  };

  const onChange = ({ target: { value } }) => {
    setTimeSaved(value);
  };

  const alarm = () => {
    const audio = new Audio(Alarm);
    audio.play();
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTimeCounter(timeCounter - 1), 1000);

      if (timeCounter === 0) {
        clearInterval(intervalId);
        setIsRunning(false);
        alarm();
      }
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeCounter]);

  return (
    <div className={isRunning ? "timer isRunning" : "timer"}>
      <Input onChange={onChange} name="timer" type="numeric" />
      <Button title={isRunning ? "Restart" : "Start"} onClick={startTimer} />
      <div className="timer__counter">{timeCounter}</div>
    </div>
  );
};
