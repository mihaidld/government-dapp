import React, { useContext } from "react";
import { Web3Context } from "../hooks/useWeb3";

function Connection() {
  const { web3State, login } = useContext(Web3Context);
  return (
    <>
      <dl className="row">
        <dt className="col-sm-3">Web3 status: </dt>
        <dd className="col-sm-9">
          {web3State.is_web3 ? "injected" : "no-injected"}
        </dd>
        <dt className="col-sm-3">Network id: : </dt>
        <dd className="col-sm-9">{web3State.chain_id}</dd>
        <dt className="col-sm-3">Network name : </dt>
        <dd className="col-sm-9">{web3State.network_name}</dd>
        <dt className="col-sm-3">MetaMask installed status : </dt>
        <dd className="col-sm-9">{web3State.is_metamask ? "yes" : "no"}</dd>
        <dt className="col-sm-3">Log status : </dt>
        <dd className="col-sm-9">{web3State.is_logged ? "yes" : "no"}</dd>
        <dt className="col-sm-3">Address : </dt>
        <dd className="col-sm-9">{web3State.account}</dd>
      </dl>
      {!web3State.is_logged && (
        <>
          <button
            type="submit"
            className="btn btn-outline-light"
            onClick={login}
          >
            login
          </button>
        </>
      )}
    </>
  );
}

export default Connection;
