import type { Letter } from '../lib/sharedTypes';

export default function TextDisplay(props: {
  letters: Letter[];
  passage: string;
  wordIndex: number;
  letterIndex: number;
}) {
  return (
    <div className='text-md relative text-black/40'>
      <div className='absolute top-0'>
        <div>
          {props.letters.map((letter) => (
            <span
              key={letter.index}
              className={`${letter.wordIndex < props.wordIndex ? 'text-blue' : letter.correct ? 'text-black' : 'text-red'}`}
            >
              {props.letters[letter.index].letter}
            </span>
          ))}
        </div>
      </div>
      <div className=''>
        {props.passage.split(' ').map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </div>
    </div>
  );
}
