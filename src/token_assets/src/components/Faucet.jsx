import React from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const [text, setText] = React.useState("Claim Tokens");
  const [isDisabled, setIsDisabled] = React.useState(false);

  async function handleClick(event) {
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: { identity },
    });

    // setText(await authenticatedCanister.payOut());
    setText(await token.payOut());
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free CHAD tokens here! Claim 10,000 CHAD tokens to your
        account.
        {/* <br />[{props.user}]. */}
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {text}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
