export interface User {
  username: string;
  wpm: number;
  position: number;
}

export interface Letter {
  letter: string;
  correct: boolean;
  index: number;
  wordIndex: number;
  relativeIndex: number;
}

export interface PassageLetter {
  letter: string;
  index: number;
}
