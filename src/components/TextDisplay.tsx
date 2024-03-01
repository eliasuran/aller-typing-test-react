import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import type { Letter } from '../lib/sharedTypes';

export default function TextDisplay(props: {
  letters: Letter[];
  setLetters: Dispatch<SetStateAction<Letter[]>>;
  passage: string;
  wordIndex: number;
  letterIndex: number;
}) {
  // initializing a new modifiable version of passage
  // assigning passage to the newPassage variable on client load
  const [newPassage, setNewPassage] = useState([] as string[]);
  useEffect(() => {
    setNewPassage(props.passage.split(' '));
  }, []);

  // if letter.length is 0, dont remove it
  // everytime the wordIndex is incremented, remove the first item from passage
  useEffect(() => {
    if (props.letters.length === 0) return;
    setNewPassage((prev) => [...prev.slice(1)]);
  }, [props.wordIndex]);
  return (
    <div className="relative text-md text-black/40">
      <div className="absolute top-0">
        <div>
          {props.letters.map((letter) => (
            <span
              key={letter.index}
              className={`${
                letter.wordIndex < props.wordIndex
                  ? 'absolute text-[transparent]'
                  : letter.correct
                  ? 'text-black'
                  : 'text-red'
              }`}
            >
              {props.letters[letter.index]?.letter}
            </span>
          ))}
        </div>
      </div>
      <div>
        {newPassage.map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </div>
    </div>
  );
}
