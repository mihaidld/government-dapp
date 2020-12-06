import React, { useContext, useState } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { ModeContext } from "../context/ModeContext";
import { ethers } from "ethers";

/* TODO: consider using useReducer and context for contracts */

function GetBalance() {
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const { token } = useContext(ContractsContext);
  const [balance, setBalance] = useState(0);

  const handleSubmitBalanceof = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressForBalance.value;
      const res = await token.balanceOf(address);
      setBalance(ethers.utils.formatEther(res));
    } catch {
      console.log(event.message);
    }
  };

  return (
    <>
    <h3 className="h2">Get the balance of a citizen</h3>
      <form onSubmit={handleSubmitBalanceof}>
        <div className="mb-3 ">
          <label className="form-label" htmlFor="addressBalance">
            Enter an address
          </label>
          <input
            id="addressForBalance"
            name="addressForBalance"
            placeholder="address"
            aria-label="input Address to check token balance"
            aria-describedby="buttonBalance"
            className="form-control"
          />
        </div>
        <button id="buttonBalance" type="submit" className={modeButtonClass}>
          Check balance
        </button>
      </form>
      {balance > 0 && (
        <dl className="row">
          <dt className="col-sm-3">Balance of tokens : </dt>
          <dd className="col-sm-9">{balance}</dd>
        </dl>
      )}
      
    </>
  );
}

export default GetBalance;
