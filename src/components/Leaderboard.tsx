import { getFastestTypists } from '../lib/leaderboard';
import type { Letter, User } from '../lib/sharedTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function Leaderboard(props: {
  user: string;
  setStage: Dispatch<SetStateAction<number>>;
  setUserInput: Dispatch<SetStateAction<string>>;
  setLetters: Dispatch<SetStateAction<Letter[]>>;
}) {
  // initialising a var to store all the users and assign the type of User[] defined in lib/leaderboard.ts
  // then i get the fastest typists in a useEffect
  // has to be in a useEffect because getting data from localstorage requires that it is for sure on the client
  const [users, setUsers] = useState([] as User[]);
  useEffect(() => {
    setUsers(getFastestTypists);
  }, []);

  // basically just mapping over users and displaying username and wpm
  // users is already sorted so just mapping over the arr works fine
  // adding bold text positions 1, 2 and 3
  // TODO: add medals for 1, 2 and 3 (add it where the random red square is rn)
  return (
    <div className="w-1/2">
      <div className="mt-16 flex w-full flex-col gap-2 rounded-sm bg-white px-8 py-4 text-black">
        <div className="flex h-6 w-full justify-between gap-2">
          <div className="w-10" />
          <h2 className="w-full">USERNAME</h2>
          <h2>WPM</h2>
        </div>
        {users.map((user) => (
          <div
            key={user.username}
            className={`${
              user.position <= 3 && 'font-semibold'
            } flex min-h-6 w-full items-center justify-between gap-2`}
          >
            {user.position <= 3 ? (
              <div className="aspect-square w-10 bg-red"></div>
            ) : (
              <div className="w-10" />
            )}
            <h2 className="w-full">{user.username}</h2>
            <h2>{user.wpm}</h2>
          </div>
        ))}
      </div>

      <div className="mt-2 text-center text-sm">
        <span className="font-semibold">{props.user}</span> WPM:{' '}
        {localStorage.getItem(props.user)}
      </div>

      {/* just for me in dev, just logs the user out by removing localstorage item: username */}
      <button
        className="absolute left-12 top-12 rounded-md bg-red p-2 font-semibold text-white"
        onClick={() => {
          localStorage.removeItem('username');
          window.location.reload();
        }}
      >
        Log Out
      </button>
    </div>
  );
}
