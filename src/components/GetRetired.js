import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function GetRetired() {
  // consume context
  const { web3State } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);
  const { citizen, setCitizen } = useContext(DappContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";

  const toast = useToast();

  // define event handler for submitting form with security check to prevent reaching revert from the blockchain
  const handleClickGetRetired = async () => {
    try {
      const retirementDate = citizen.retirementDate;
      const today = new Date();
      if (citizen.isAlive === "alive" && retirementDate <= today) {
        await government.getRetired();

        /* callback function with same arguments as those of Retired
        event emitted by contract Government, sets state and gives feeback to
        users after an action has taken place */
        const cb = (
          citizenAddress,
          employer,
          isWorking,
          currentTokens,
          unemploymentTokens,
          retirementTokens
        ) => {
          setCitizen({
            ...citizen,
            employer:
              employer !== ethers.constants.AddressZero
                ? employer.toString()
                : "no employer registered",
            isWorking: isWorking ? "is working" : "unemployed",
            currentTokens: ethers.utils.formatEther(currentTokens),
            unemploymentTokens: ethers.utils.formatEther(unemploymentTokens),
            retirementTokens: ethers.utils.formatEther(retirementTokens),
          });
          toast({
            position: "bottom",
            title: `Get retired`,
            description: `Congratulations you are now a retired citizen and have in your current account ${ethers.utils.formatEther(
              currentTokens
            )} tokens!`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        // create event filter only with indexed Event parameters
        const filter = government.filters.Retired(web3State.account);
        // listen once event Retired searching for entries which match the filter
        government.once(filter, cb);
      } else {
        toast({
          position: "bottom",
          title: `Get Retired`,
          description: `Only citizens who have reached their retirement age can get retired. Your retirement date is ${retirementDate.toUTCString()}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <article className="mb-3">
      <div className="shadow p-3">
        <h3 className="h4 mb-3">Get retired</h3>
        <button
          id="buttonRetirement"
          type="submit"
          className={modeButtonClass}
          onClick={handleClickGetRetired}
        >
          Retire
        </button>
      </div>
    </article>
  );
}

export default GetRetired;
