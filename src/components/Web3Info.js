import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ModeContext } from "../context/ModeContext";

function Web3Info() {
  const { web3State } = useContext(Web3Context);
  const { mode } = useContext(ModeContext);
  const modeClass =
    mode === "dark" ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <>
      <div className={`card shadow-sm ${modeClass}`}>
        <div className="card-body">
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
            <dd>
              <span className="badge bg-secondary">{web3State.chainId}</span>
            </dd>
            <dt>Network name : </dt>
            <dd>
              <span className="badge bg-secondary">
                {web3State.networkName}
              </span>
            </dd>
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
            <dd>
              <mark className="small">{web3State.account}</mark>
            </dd>
            <dt>ETH Balance : </dt>
            <dd>
              <span className="badge bg-secondary">{web3State.balance}</span>
            </dd>
          </dl>
        </div>
      </div>
    </>
  );
}

export default Web3Info;
