import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    handleLogin(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleLogin(authClient);
      },
    });
  }
};

async function handleLogin(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);

  ReactDOM.render(
    <App user={userPrincipal} />,
    document.getElementById("root")
  );
}

init();
