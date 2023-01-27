import React from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [to, setTo] = React.useState("");
  const [amt, setAmt] = React.useState("");
  const [text, setText] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [toShow, setToShow] = React.useState(false);

  async function handleClick() {
    setIsDisabled(true);
    setToShow(false);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: { identity },
    });

    setText(
      // await authenticatedCanister.transfer(Principal.fromText(to), Number(amt))
      await token.transfer(Principal.fromText(to), Number(amt))
    );
    setIsDisabled(false);
    setToShow(true);
    setAmt("");
    setTo("");
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                name="amt"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p>{toShow && text}</p>
      </div>
    </div>
  );
}

export default Transfer;
