import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";

function Web3Info() {
  const { web3State } = useContext(Web3Context);

  return (
    <>
      <dl className="mb-3">
        <dt>Web3 status: </dt>
        <dd>{web3State.is_web3 ? "injected" : "no-injected"}</dd>
        <dt>Network id: : </dt>
        <dd>{web3State.chain_id}</dd>
        <dt>Network name : </dt>
        <dd>{web3State.network_name}</dd>
        <dt>MetaMask installed status : </dt>
        <dd>{web3State.is_metamask ? "yes" : "no"}</dd>
        <dt>Log status : </dt>
        <dd>{web3State.is_logged ? "yes" : "no"}</dd>
        <dt>Address : </dt>
        <dd>{web3State.account}</dd>
        <dt>Balance : </dt>
        <dd>{web3State.balance}</dd>
      </dl>
    </>
  );
}

export default Web3Info;
