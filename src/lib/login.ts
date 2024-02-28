// function that logs in user, importing this in login form and using on submit
// taking username (string) as param

import { getAllTypists } from './leaderboard';

// returning either success + username or failure + empty string
export async function loginUser(username: string) {
  // using the getAllTypists function to get an array of all users
  // iterating over each username in the array and checking if the username we got from the client already exists
  const users = getAllTypists();
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return {
        status: 400,
        username: '',
        message: 'A user with that username already exists',
      };
    }
  }
  if (username.length <= 2) {
    return {
      status: 400,
      username: '',
      message: 'Username must be at least 3 characters long',
    };
  }
  localStorage.setItem('username', username);
  return {
    status: 200,
    username: username,
    message: 'Successfully logged in',
  };
}
