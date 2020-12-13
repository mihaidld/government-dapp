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
      <div className={`card shadow-sm my-3 ${modeClass}`}>
        <div className="card-body">
          <h3 className="h4 text-primary">
            <span className="badge bg-primary">web3 information</span>
          </h3>
          <dl className="row mb-3">
            <dt className="col-sm-6">Web3 status: </dt>
            <dd className="col-sm-6">
              {web3State.isWeb3 ? (
                <span className={`badge ${modeClass}`}>injected</span>
              ) : (
                <span className="badge bg-danger">not injected</span>
              )}
            </dd>
            <dt className="col-sm-6">Network id : </dt>
            <dd className="col-sm-6">
              <span className={`badge ${modeClass}`}>{web3State.chainId}</span>
            </dd>
            <dt className="col-sm-6">Network name : </dt>
            <dd className="col-sm-6">
              <span className={`badge ${modeClass}`}>
                {web3State.networkName}
              </span>
            </dd>
            <dt className="col-sm-6">MetaMask installed : </dt>
            <dd className="col-sm-6">
              {web3State.isMetaMask ? (
                <span className={`badge ${modeClass}`}>yes</span>
              ) : (
                <span className="badge bg-danger">no</span>
              )}
            </dd>
            <dt className="col-sm-6">Log status : </dt>
            <dd className="col-sm-6">
              {web3State.isLogged ? (
                <span className={`badge ${modeClass}`}>yes</span>
              ) : (
                <span className="badge bg-danger">no</span>
              )}
            </dd>
            <dt className="col-sm-6">ETH Balance : </dt>
            <dd className="col-sm-6">
              <span className={`badge ${modeClass}`}>{web3State.balance}</span>
            </dd>
            <dt>Address : </dt>
            <dd>
              <mark className={`small ${modeClass}`}>{web3State.account}</mark>
            </dd>
          </dl>
        </div>
      </div>
    </>
  );
}

export default Web3Info;
