import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// import the start timer function and then starts it when typing in the input field
import { startTimer } from '../lib/typing';

// types
import type { Letter } from '../lib/sharedTypes';

// displaying text
import TextDisplay from './TextDisplay';

// user is just the username
// wpm is words per minute (live updating)
// getting setWpm (set Words per minute) as prop which is used to set the wpm
// time is the current time (live updating)
// setTime used to change the time
// setStage used to set the current stage
export default function Typing(props: {
  user: string;
  wpm: number;
  setWpm: Dispatch<SetStateAction<number>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  setStage: Dispatch<SetStateAction<number>>;
  passage: string;
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  wordBoundaries: number[];
  letters: Letter[];
  setLetters: Dispatch<SetStateAction<Letter[]>>;
  wordIndex: number;
  setPopup: Dispatch<SetStateAction<string>>;
}) {
  // live tracking wpm
  // tracks elapesed time to calculate wpm live
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(() => {
    if (timeElapsed === 0) {
      props.setWpm(0);
      return;
    }
    props.setWpm(
      Math.floor(
        props.userInput.trim().split(/\s+/).length /
          ((timeElapsed * 1000) / 60000),
      ),
    );
  }, [props.time]);

  // here i have a textarea. the textarea is actually not visible, its just used to get somewhere to get text
  // the text is displayed in TextDisplay, which maps over the letters array, this way, i can display incorrect letters in red
  return (
    <div className="mt-12 flex w-5/6 flex-col items-center gap-2">
      <Timer time={props.time} />
      <div className="relative w-full space-y-2">
        <label htmlFor="input" className="text-md">
          Type here
        </label>
        <div className="relative h-36 w-full overflow-hidden rounded-sm text-md">
          <textarea
            id="input"
            value={props.userInput}
            onChange={(e) => {
              props.setUserInput(e.target.value);
              startTimer(
                props.user,
                props.setWpm,
                props.time,
                props.setTime,
                timeElapsed,
                setTimeElapsed,
                props.setStage,
              );
            }}
            onKeyDown={(e) => {
              if (props.letters.length === 0) {
                return;
              }
              if (props.letters.length === 1 && e.key === 'Backspace') {
                props.setLetters([]);
                return;
              }
              if (
                props.letters[props.letters.length - 1].letter === ' ' &&
                props.letters[props.letters.length - 1].correct &&
                e.key === 'Backspace'
              ) {
                props.setPopup("Can't go back to a finished word");
                e.preventDefault();
                return;
              }
              if (
                !props.letters[props.letters.length - 1]?.correct &&
                e.key !== 'Backspace'
              ) {
                e.preventDefault();
                props.setPopup('Wrong letter, fix it up to continue');
                return;
              }
              props.setPopup('');
            }}
            spellCheck="false"
            className={`${props.letters.length === 0 ? 'text-black' : 'text-[transparent]'} absolute left-0 top-0 z-50 h-full w-full resize-none bg-[transparent] p-4 outline-none`}
          />
          <div className="h-full bg-white p-4 text-left">
            {/* component displaying the text you write and colors text accordingly */}
            <TextDisplay
              letters={props.letters}
              setLetters={props.setLetters}
              passage={props.passage}
              wordIndex={props.wordIndex}
            />
          </div>
        </div>
      </div>
      <WPM wpm={props.wpm} />
    </div>
  );
}

// component displaying the timer
function Timer(props: { time: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid aspect-square h-24 place-items-center rounded-full bg-white text-xxl text-black">
        {props.time}
      </div>
      <h2 className="text-md">seconds</h2>
    </div>
  );
}

// component displaying words per minute
function WPM(props: { wpm: number }) {
  return <h2 className="self-end text-md font-semibold">WPM: {props.wpm}</h2>;
}
