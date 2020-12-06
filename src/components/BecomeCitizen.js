import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
//import "../form.css";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function BecomeCitizen() {
  const { web3State } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);
  const { dappDispatch, citizen, setCitizen } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleSubmitBecomeCitizen = async (event) => {
    try {
      event.preventDefault();
      const age = Number(event.target.elements.age.value);
      console.log(age === Math.floor(age));
      console.log(citizen);
      if (age === Math.floor(age) && citizen.isAlive === "not alive") {
        console.log(typeof age);
        await government.becomeCitizen(age);
        const cb = (
          citizenAddress,
          isAlive,
          employer,
          isWorking,
          isSick,
          retirementDate,
          currentTokens,
          healthTokens,
          unemploymentTokens,
          retirementTokens
        ) => {
          dappDispatch({ type: "SET_isCitizen", isAlive });
          setCitizen({
            isAlive: isAlive ? "alive" : "not alive",
            employer:
              employer !== ethers.constants.AddressZero
                ? employer.toString()
                : "no employer registered",
            isWorking: isWorking ? "is working" : "unemployed",
            isSick: isSick ? "is sick" : "healthy",
            retirementDate: new Date(retirementDate * 1000),
            currentTokens: ethers.utils.formatEther(currentTokens),
            healthTokens: ethers.utils.formatEther(healthTokens),
            unemploymentTokens: ethers.utils.formatEther(unemploymentTokens),
            retirementTokens: ethers.utils.formatEther(retirementTokens),
          });
          toast({
            position: "bottom",
            title: `Become citizen`,
            description: `Congratulations you are now a citizen and have received as an award ${ethers.utils.formatEther(
              currentTokens
            )} tokens!`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter = government.filters.CreatedCitizen(web3State.account);
        // listen once event CreatedCitizen
        government.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Become citizen`,
          description: `Only somebody who is not a citizen already can become one by entering an age as a positive integer`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      console.log(event.message);
    }
  };

  return (
    <>
      <section>
        <h3 className="h2">Become a Citizen</h3>
        <form onSubmit={(e) => handleSubmitBecomeCitizen(e)} className="my-5">
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age (in number of years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              aria-label="input age to become citizen"
              aria-describedby="buttonBecome"
              required
              className="form-control"
            />
          </div>
          <button id="buttonBecome" type="submit" className={modeButtonClass}>
            Register
          </button>
        </form>
      </section>
    </>
  );
}

export default BecomeCitizen;
