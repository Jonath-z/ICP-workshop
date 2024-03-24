import { useEffect, useState } from "react";
import { internet_identity_backend } from "declarations/internet_identity_backend";
import { AuthClient } from "@dfinity/auth-client";

function App() {
  const [greeting, setGreeting] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const authClient = await AuthClient.create();
      window.authClient = authClient;
      setIsAuthenticated(await window.authClient?.isAuthenticated());
    })();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    internet_identity_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  async function auth() {
    await window.authClient?.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/`,
    });
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <button onClick={auth}>
        {isAuthenticated ? "Authenticated" : "Authenticate yourself"}
      </button>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
