import { ActorSubclass } from "@dfinity/agent";
import { Test } from "azle/test";
import { _SERVICE } from "../.dfx/local/canisters/testing_backend/service.did";

export function get_tests(testing_backend: ActorSubclass<_SERVICE>): Test[] {
  return [
    {
      name: "greet",
      test: async () => {
        const result = await testing_backend.greet("Jonathan");

        return {
          Ok: result === "Hello, Jonathan!",
        };
      },
    },
  ];
}
