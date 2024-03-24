import { execSync } from "child_process";

async function pretest() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  execSync(`dfx canister uninstall-code testing_backend || true`, {
    stdio: "inherit",
  });

  execSync(`dfx deploy`, {
    stdio: "inherit",
  });

  execSync(`dfx generate testing_backend`, {
    stdio: "inherit",
  });
}

pretest();
