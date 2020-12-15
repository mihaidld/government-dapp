import React, { useContext, useState, useEffect } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { ModeContext } from "../context/ModeContext";
import { ethers } from "ethers";

function GetBalance() {
  // consume context
  const { token } = useContext(ContractsContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";

  //define state variables to set balance or display status
  const [balance, setBalance] = useState("0");
  const [isDisplayed, setIsDisplayed] = useState(false);

  // define event handler to set state
  const handleSubmitBalanceof = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressForBalance.value;
      const res = await token.balanceOf(address);
      setBalance(ethers.utils.formatEther(res));
      setIsDisplayed(isDisplayed ? false : true);
      // event.target.reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  // listen for address change event (changing account) to hide previous balance result
  useEffect(() => {
    const onAccountsChanged = async (accounts) => {
      try {
        setIsDisplayed(false);
      } catch (e) {
        throw e;
      }
    };
    onAccountsChanged();
    window.ethereum.on("accountsChanged", onAccountsChanged);
    return () => window.ethereum.off("accountsChanged", onAccountsChanged);
  }, []);

  return (
    <article className="mb-3">
      <div className="shadow p-3">
        <h3 className="h4 mb-2">Get the CTZ balance</h3>
        <form onSubmit={handleSubmitBalanceof} className="mb-2">
          <div className="mb-2 ">
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
        {isDisplayed && (
          <dl className="row">
            <dt className="col-sm-6">Balance of CTZ tokens : </dt>
            <dd className="col-sm-6">{balance}</dd>
          </dl>
        )}
      </div>
    </article>
  );
}

export default GetBalance;
