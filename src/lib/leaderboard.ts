// any functions around leaderboard will go here

import { User } from './sharedTypes';

// defining type for user
// get all typists from localstorage
export function getAllTypists() {
  const users = { ...localStorage };

  // push each item from localstorage as object to an array to make them sortable, adding positiion to be used in frontend
  let arr = [];
  for (let user in users) {
    if (!isNaN(users[user])) {
      arr.push({ username: user, wpm: Number(users[user]), position: 0 });
    }
  }
  return arr;
}

// gets all typists from function above
// sorts by wpm
// gives each object a position based on sorted position
// returns first 10
export function getFastestTypists() {
  const users: User[] = getAllTypists();
  users.sort((a, b) => {
    return b.wpm - a.wpm;
  });
  users.map((user, i) => (user.position = i + 1));
  return users.slice(0, 10);
}
