import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";

function Web3Info() {
  const { web3State } = useContext(Web3Context);

  return (
    <>
      <dl className="mb-3">
        <dt>Web3 status: </dt>
        <dd>
          {web3State.isWeb3 ? (
            <span className="badge bg-success">injected</span>
          ) : (
            <span className="badge bg-danger">not injected</span>
          )}
        </dd>
        <dt>Network id: : </dt>
        <dd>{web3State.chainId}</dd>
        <dt>Network name : </dt>
        <dd>{web3State.networkName}</dd>
        <dt>MetaMask installed status : </dt>
        <dd>
          {web3State.isMetaMask ? (
            <span className="badge bg-success">yes</span>
          ) : (
            <span className="badge bg-danger">no</span>
          )}
        </dd>
        <dt>Log status : </dt>
        <dd>
          {web3State.isLogged ? (
            <span className="badge bg-success">yes</span>
          ) : (
            <span className="badge bg-danger">no</span>
          )}
        </dd>
        <dt>Address : </dt>
        <dd>{web3State.account}</dd>
        <dt>ETH Balance : </dt>
        <dd>{web3State.balance}</dd>
      </dl>
    </>
  );
}

export default Web3Info;
