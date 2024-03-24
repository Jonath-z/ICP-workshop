import {
  update,
  Canister,
  query,
  text,
  Record,
  Vec,
  Result,
  Ok,
  Err,
} from "azle";

const User = Record({
  id: text,
  name: text,
  lastName: text,
});

let users: Vec<typeof User> = [];

export default Canister({
  getUsers: query([], Vec(User), () => {
    return users;
  }),

  register: update([User], text, (user) => {
    users.push(user);
    return "user Successfully added";
  }),

  getUser: query([text], Result(User, text), (userid) => {
    const user = users.find((user) => user.id === userid);
    if (!user) return Err("user not found");
    return Ok(user);
  }),
});
