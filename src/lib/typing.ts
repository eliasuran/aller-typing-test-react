import { Dispatch, SetStateAction } from 'react';

// functions connected to the typing part of website

// variables used in mutliple of the functions
// started tracks whether u have started or not
// total time is just the total time
let started: boolean;
let time: number;
const totalTime = 10000;

export function currentTime() {
  return time;
}

// function for starting timer
export function startTimer(
  user: string,
  setWpm: Dispatch<SetStateAction<number>>,
  initialTime: number,
  setTime: Dispatch<SetStateAction<number>>,
  initialTimeElapsed: number,
  setTimeElapsed: Dispatch<SetStateAction<number>>,
  setStage: Dispatch<SetStateAction<number>>,
) {
  if (!started) {
    // set started to true to avoid starting again each time something is typed
    started = true;

    // setting time to initial time, used in timeout to display seconds - doing the same with elapsed time
    time = initialTime;
    let timeElapsed = initialTimeElapsed;

    // sets wpm to 0 each time you start again
    setWpm(0);

    // stops timer after x (totalTime) sec
    setTimeout(() => {
      stopTimer(user, setWpm, setStage);
    }, totalTime);

    // time minus 1 each 10th of a sec until time < 0, then it stops the timer
    // sets the time variable on the frontend to time (with setTime())
    // doing the same for elapsed time just opposite
    let timerInterval = setInterval(() => {
      time -= 0.1;
      setTime(Math.round(time * 10) / 10);

      timeElapsed += 0.1;
      setTimeElapsed(Math.round(timeElapsed * 10) / 10);

      if (time < 0) {
        clearInterval(timerInterval);
        setTime(initialTime);
      }
    }, 100);
  }
}

// function that stops the timer
// calculates WPM using value from the input field and the time
// sets the WPM variable (with setWpm) to the words per minute calculated
function stopTimer(
  user: string,
  setWpm: Dispatch<SetStateAction<number>>,
  setStage: Dispatch<SetStateAction<number>>,
) {
  // unfocusing input field
  (document.getElementById('input') as HTMLInputElement).blur();

  // set started to false so when you type again it starts again
  started = false;

  // calculate words per minute with calculateWPM
  // set wpm to it which displays it on the frontend
  // sets a localstorage item if (ELIAS: spør om vi skal ha muligheten til å prøve flere ganger, da må det passes på at bare den raskeste lagres og ikke den nyeste)
  const WPM = calculateWPM(totalTime);
  setWpm(WPM);
  localStorage.setItem(user, WPM.toString());

  // sets the stage to 2 which is the leaderboard stage
  setStage(2);
}

// calculates wpm
export function calculateWPM(time: number) {
  const value = (document.getElementById('input') as HTMLInputElement).value;
  const WPM = value.trim().split(/\s+/).length / (time / 60000);
  return WPM;
}
