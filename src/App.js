import React, { useContext, useReducer, useEffect } from "react";
import OwnerTab from "./layouts/OwnerTab";
import CompanyTab from "./layouts/CompanyTab";
import HospitalTab from "./layouts/HospitalTab";
import CitizenTab from "./layouts/CitizenTab";
import PublicTab from "./layouts/PublicTab";
import { dappReducer, initialDappState } from "./reducer/dappReducer";
import { Web3Context } from "./context/Web3Context";
import { ContractsContext } from "./context/ContractsContext";
import Web3Info from "./components/Web3Info";
import Footer from "./components/Footer";
import "../src/app.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

// TODO: add if, ternary or enum cases: not citizen, also admin etc. from https://www.robinwieruch.de/conditional-rendering-react

function App() {
  const [dappState, dappDispatch] = useReducer(dappReducer, initialDappState);
  const { web3State, login } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);

  useEffect(() => {
    (async function fetchData() {
      try {
        const citizen = await government.getCitizen(web3State.account);
        dappDispatch({ type: "SET_isCitizen", isAlive: citizen.isAlive });
        const isCompany = await government.checkCompany(web3State.account);
        dappDispatch({ type: "SET_isCompany", isCompany });
        const isHospital = await government.checkHospital(web3State.account);
        dappDispatch({ type: "SET_isHospital", isHospital });
        const owner = await government.sovereign();
        dappDispatch({
          type: "SET_isOwner",
          isOwner: owner.toLowerCase() === web3State.account,
        });
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [government, web3State.account]);

  if (!web3State.is_web3) {
    return <p>Please install MetaMask https://metamask.io/</p>;
  }
  return (
    <div className="container">
      {!web3State.is_logged && (
        <>
          <button
            type="submit"
            className="btn btn-outline-light"
            onClick={login}
          >
            login
          </button>
        </>
      )}
      {web3State.chain_id !== 4 && (
        <p className="mb-5">
          Please connect to network Rinkeby to interact with Citizen contracts
        </p>
      )}
      {web3State.chain_id === 4 && (
        <Tabs colorScheme="purple" size="lg" isFitted={true}>
          <TabList>
            <Tab>Public</Tab>
            {dappState.isOwner && <Tab>Owner</Tab>}
            {dappState.isCompany && <Tab>Company</Tab>}
            {dappState.isHospital && <Tab>Hospital</Tab>}
            {dappState.isCitizen && <Tab>Citizen</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
              <PublicTab />
            </TabPanel>
            {dappState.isOwner && (
              <TabPanel>
                <OwnerTab />
              </TabPanel>
            )}
            {dappState.isCompany && (
              <TabPanel>
                <CompanyTab />
              </TabPanel>
            )}
            {dappState.isHospital && (
              <TabPanel>
                <HospitalTab />
              </TabPanel>
            )}
            {dappState.isCitizen && (
              <TabPanel>
                <CitizenTab />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      )}
      <Web3Info />
      <Footer />
    </div>
  );
}

export default App;
