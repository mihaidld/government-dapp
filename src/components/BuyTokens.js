import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function BuyTokens() {
  const { web3State } = useContext(Web3Context);
  const { token, government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();
  //const [nbTokens, setNbTokens] = useState("1");

  /*   //event handler to change value to buy
  const handleChangeValue = (currentBuyValue) => {
    setNbTokens(currentBuyValue);
  }; */

  const handleSubmitBuyTokens = async (event) => {
    try {
      event.preventDefault();
      const owner = await government.sovereign();
      const tokens = event.target.elements.amountTokens.value;
      let overrides = {
        //value: ethers.utils.parseEther((nbTokens / 100).toString()),
        value: ethers.utils.parseEther((tokens / 100).toString()),
      };
      if (dappState.isCompany && tokens > 10 ** -16) {
        await government.buyTokens(ethers.utils.parseEther(tokens), overrides);
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
        const filter = token.filters.Transfer(owner, web3State.account);
        // listen once event Transfer
        token.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Buy Tokens`,
          description: `Only a company can buy tokens by entering a number larger than 10^-16`,
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
        {/*         <form onSubmit={(e) => handleSubmitBuyTokens(e)} className="mb-2">
          <HStack>
            <NumberInput
              value={nbTokens}
              defaultValue="1"
              precision={1}
              step={0.5}
              min={0}
              max={web3State.balance * 100}
              onChange={handleChangeValue}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button colorScheme="red">
              buy CTZ tokens for {nbTokens / 100} ETH
            </Button>
          </HStack>
        </form> 
        <Text as="i">
          Since 1 ether is worth 100 CTZ tokens this gives you {nbTokens * 100}{" "}
          CTZ tokens
        </Text>*/}
        <form onSubmit={(e) => handleSubmitBuyTokens(e)} className="mb-2">
          <div className="mb-2">
            <label htmlFor="amountTokens" className="form-label">
              Amount of tokens to buy (1 ether = 100 CTZ tokens)
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
