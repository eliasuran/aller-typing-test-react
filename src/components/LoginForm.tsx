import { Dispatch, SetStateAction, useState } from 'react';
import { loginUser } from '../lib/login';

export default function LoginForm(props: {
  setUser: Dispatch<SetStateAction<string>>;
  setStage: Dispatch<SetStateAction<number>>;
}) {
  // var used for tracking what is written in input field
  // when the form is submitted i await a result which is stored in user
  // if the status isnt 200 (successful), i log the message and return
  // if its successful i set the stage to the next one and sets user to the username provided
  // TODO: add check for multiple of same username (should not be allowed)
  const [username, setUsername] = useState('');

  // initilazing a error variable used to display an error if one is returned from loginUser()
  const [error, setError] = useState('');
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const user = await loginUser(username);
        if (user.status !== 200) {
          setError(user.message);
          return;
        }
        props.setUser(user.username);
        props.setStage(1);
      }}
      className='flex w-72 flex-col gap-6'
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
          className='w-full rounded-sm p-2 text-black'
        />
        {error.length > 0 && <h2 className='text-red text-xxs'>{error}</h2>}
      </div>
      <button type='submit' className='bg-red rounded-sm p-2 font-semibold'>
        Next
      </button>
    </form>
  );
}
