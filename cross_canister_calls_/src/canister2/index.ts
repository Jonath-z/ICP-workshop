import { Canister, text, Principal, ic, update } from "azle";
import Canister1 from "../canister1";
import { v4 as uuidv4 } from "uuid";

export default Canister({
  createUser: update([text, text], text, async (firstName, lastName) => {
    const canister1: typeof Canister1 = Canister1(
      Principal.fromText(getCanister1Principal())
    );

    return await ic.call(canister1.register, {
      args: [{ id: uuidv4(), name: firstName, lastName }],
    });
  }),
});

function getCanister1Principal(): string {
  if (process.env.CANISTER_ID_CANISTER1 !== undefined) {
    return process.env.CANISTER_ID_CANISTER1;
  }

  throw new Error(`process.env.CANISTER_ID_CANISTER1 is not defined`);
}
