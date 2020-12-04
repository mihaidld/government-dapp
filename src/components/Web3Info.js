import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";

function Web3Info() {
  const { web3State } = useContext(Web3Context);

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
        <dt className="col-sm-3">Balance : </dt>
        <dd className="col-sm-9">{web3State.balance}</dd>
      </dl>
    </>
  );
}

export default Web3Info;
