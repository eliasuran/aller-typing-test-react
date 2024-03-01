import Layout from './components/Layout';
import { useEffect, useState } from 'react';

// form to login user (currently just saves username in localstorage and returns an object with status, username and message)
import LoginForm from './components/LoginForm';

// component displaying containing anything related to the type test
// wpm, timer and the input field
import Typing from './components/Typing';

// leaderboard
import Leaderboard from './components/Leaderboard';

// types
import type { Letter } from './lib/sharedTypes';

export default function Home() {
  // the typing part of the app
  // initializing of the passage which currently is just some random string
  const passage =
    'hei jeg heter elias og er en 17 år gammel elev på elvebakken vgs 2IT. jeg liker å skrive kode og å bruke vim';

  // user input in a mutable var
  const [userInput, setUserInput] = useState('');

  // current letter index
  const [letterIndex, setLetterIndex] = useState(0);

  // keeping track of word index
  const [wordIndex, setWordIndex] = useState(0);

  // all letters stored in an array as an object with 4 values, used to track the index of letters and if they are correct or not
  // the letter written
  // correct (bool)
  // letters index
  // wordIndex
  const [letters, setLetters] = useState([] as Letter[]);

  // array to store starting index of each word
  const [wordBoundaries, setWordBoundaries] = useState([0]);

  // used to track if the user went back (used backspace basically)
  const [prevUserInputLength, setPrevUserInputLength] = useState(0);

  // keeping track of currentWordIndex
  // TODO: if a letter is wrong, make that letter red (currently just appending to incorrectLetter array)
  useEffect(() => {
    // dont do any checks if userInput is empty (the very first one)
    if (userInput.trim() === '') return;

    // if the current letter is a space:
    // set the space var to true, which is then used later
    // increment wordIndex by 1
    // sets a new wordBoundary to the length of the userInput
    // sets the letter index to the start of the next word, in case user didnt finish the word
    if (userInput.endsWith(' ') && passage[letterIndex] === ' ') {
      setWordIndex(wordIndex + 1);
      setWordBoundaries([...wordBoundaries, userInput.length]);
    }

    // if a letter is wrong, set correct to false
    const correct =
      userInput[userInput.length - 1] === passage[userInput.length - 1];

    console.log(letters);

    // adds the letter to the letters arr
    // first checks if the user used backspace, if so: decrement letterIndex and remove the last item from Letters
    // then checks if space was clicked, if not: increment letterIndex and add the letter to letters
    // if space was clicked: add a new letter (the space) and making the index letterIndex + diff in case you skipped some letters in the word
    if (prevUserInputLength > userInput.length) {
      setLetterIndex(letterIndex - 1);
      setLetters(letters.slice(0, -1));
    } else {
      setLetterIndex(letterIndex + 1);
      setLetters((prevLetters) => [
        ...prevLetters,
        {
          letter: userInput[userInput.length - 1],
          correct,
          index: userInput.length - 1,
          wordIndex,
          relativeIndex: userInput.length - wordBoundaries[wordIndex] - 1,
        },
      ]);
    }

    setPrevUserInputLength(userInput.length);
  }, [userInput]);

  ////////////

  // tracking of wpm and time
  const [wpm, setWpm] = useState(0);
  const [time, setTime] = useState(10);

  // ui is split into 3 parts, the ui will alternate between these 3 parts in this order
  // user login
  // the typing exercise which also displays wpm and timer
  // the leaderboard
  // this var is used to track the current stage and setCurrentStage is used to set stage
  // NOTE: currently not in use since i am working only on typing stage
  const [currentStage, setCurrentStage] = useState(0);

  // gets user from localstorage and stores it in a variable, the user var is used in various components
  // sets stage to 1 if a user is already logged in currently
  // sets stage to 2 if the user already has submitted a score
  const [user, setUser] = useState('');
  useEffect(() => {
    const localStorageUser = localStorage.getItem('username') || '';
    setUser(localStorageUser);
    if (localStorageUser) {
      if (localStorage.getItem(localStorageUser)) {
        setCurrentStage(2);
      } else {
        setCurrentStage(1);
      }
    }
  }, []);

  // defining all the stages and its content in an object
  // interface:
  interface Stage {
    stageNr: number;
    title: string;
    content: JSX.Element;
  }
  // object:
  const stages: Stage[] = [
    {
      stageNr: 0,
      title: 'What should we call you?',
      content: <LoginForm setUser={setUser} setStage={setCurrentStage} />,
    },
    {
      stageNr: 1,
      title: `${user} is now typing`,
      content: (
        <Typing
          user={user}
          wpm={wpm}
          setWpm={setWpm}
          time={time}
          setTime={setTime}
          setStage={setCurrentStage}
          passage={passage}
          userInput={userInput}
          setUserInput={setUserInput}
          wordBoundaries={wordBoundaries}
          letters={letters}
          setLetters={setLetters}
          wordIndex={wordIndex}
          letterIndex={letterIndex}
        />
      ),
    },
    {
      stageNr: 2,
      title: 'Leaderboard',
      content: (
        <Leaderboard
          user={user}
          setStage={setCurrentStage}
          setUserInput={setUserInput}
          setLetters={setLetters}
        />
      ),
    },
  ];

  return (
    <Layout>
      <div className="relative h-full w-full">
        {stages.map((stage) => (
          <div key={stage.stageNr}>
            {stage.stageNr === currentStage && (
              <>
                <div className="absolute inset-0 grid place-items-center">
                  <h1 className="absolute left-0 top-0 w-full text-center text-lg">
                    {stage.title}
                  </h1>
                  {stage.content}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
