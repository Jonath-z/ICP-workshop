import { getCanisterId, runTests } from "azle/test";
import { get_tests } from "./tests";
import { createActor } from "../src/declarations/testing_backend";

const tests = createActor(getCanisterId("testing_backend"), {
  agentOptions: {
    host: "http://localhost:45965/",
  },
});

runTests(get_tests(tests));
