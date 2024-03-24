import { Canister, query, text } from "azle";

export default Canister({
  // Query call
  greet: query([text], text, (name) => {
    return `Hello, ${name}!`;
  }),
});
