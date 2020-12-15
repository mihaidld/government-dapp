//dapp reducer to check role of connected account
export const dappReducer = (state, action) => {
  switch (action.type) {
    case "SET_isCitizen":
      return { ...state, isCitizen: action.isCitizen };
    case "SET_isCompany":
      return { ...state, isCompany: action.isCompany };
    case "SET_isHospital":
      return { ...state, isHospital: action.isHospital };
    case "SET_isOwner":
      return { ...state, isOwner: action.isOwner };
    default:
      throw new Error(`Unhandled action ${action.type} in dappReducer`);
  }
};

// dapp initial state
export const initialDappState = {
  isCitizen: false,
  isCompany: false,
  isHospital: false,
  isOwner: false,
};
