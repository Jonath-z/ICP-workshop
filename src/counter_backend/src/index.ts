import { Canister, StableBTreeMap, init, nat8, update } from "azle";

// let counter = 0;

let counter = StableBTreeMap<string, number>(0);

export default Canister({
  init: init([], () => {
    counter.insert("counter", 0);
  }),

  increment: update([], nat8, () => {
    let currentCount = counter.get("counter").Some;
    if (currentCount !== undefined) {
      const updatedCount = currentCount + 3;
      counter.insert("counter", updatedCount);
      return updatedCount;
    }
    return 0;
  }),
});
