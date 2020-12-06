import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function GetRetired() {
  const { web3State } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);
  const { citizen, setCitizen } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleClickGetRetired = async () => {
    try {
      const retirementDate = citizen.retirementDate;
      const today = new Date();
      if (citizen.isAlive === "alive" && retirementDate > today) {
        await government.getRetired();
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
        const filter = government.filters.Retired(web3State.account);
        // listen once event Retired
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
    <>
      <section>
        <h3 className="h2">Get retired</h3>
        <button
          id="buttonRetirement"
          type="submit"
          className={modeButtonClass}
          onSubmit={handleClickGetRetired}
        >
          Retire
        </button>
      </section>
    </>
  );
}

export default GetRetired;
