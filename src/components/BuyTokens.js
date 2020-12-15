import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function BuyTokens() {
  // consume context
  const { web3State } = useContext(Web3Context);
  const { token, government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  // define event handler for submitting form with security check to prevent reaching revert from the blockchain
  const handleSubmitBuyTokens = async (event) => {
    try {
      event.preventDefault();
      const owner = await government.sovereign();
      const tokens = event.target.elements.amountTokens.value;

      // define optional parameter overrides object to add value in wei (converted from number of tokens)
      let overrides = {
        value: ethers.utils.parseEther((tokens / 100).toString()),
      };

      if (dappState.isCompany && tokens > 10 ** -16) {
        await government.buyTokens(ethers.utils.parseEther(tokens), overrides);

        /* callback function with same arguments as those of Transfer (from ERC777 and actually IERC20)
        event emitted by contract Token, gives feeback to users after an action has taken place */
        const cb = (from, to, value) => {
          toast({
            position: "bottom",
            title: `Buy Tokens`,
            description: `${ethers.utils.formatEther(
              value
            )} tokens were transfered to you from sovereign at address ${owner}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        // create event filter only with indexed Event parameters
        const filter = token.filters.Transfer(owner, web3State.account);
        // listen once event Transfer searching for entries which match the filter
        token.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Buy Tokens`,
          description: `Only a company can buy tokens by entering a number larger than 10 to the -16th power`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <article className="mb-3">
      <div className="shadow p-3">
        <h3 className="h4 mb-2">Buy Tokens</h3>
        <form onSubmit={(e) => handleSubmitBuyTokens(e)} className="mb-2">
          <div className="mb-2">
            <label htmlFor="amountTokens" className="form-label">
              Amount of tokens to buy (1 ether == 100 CTZ tokens)
            </label>
            <input
              type="number"
              id="amountTokens"
              name="amountTokens"
              placeholder="Enter the amount in CTZ"
              aria-label="input amount to buy tokens"
              aria-describedby="buttonBuy"
              required
              className="form-control"
            />
          </div>
          <button id="buttonBuy" type="submit" className={modeButtonClass}>
            Buy Tokens
          </button>
        </form>
      </div>
    </article>
  );
}

export default BuyTokens;
