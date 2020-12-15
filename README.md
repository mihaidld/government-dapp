# User Interface for DApp CITIZEN project

## Presentation

DApp CITIZEN is a project to create a token economy and manage a fictional country and its citizens by deploying smart contracts on Ethereum blockchain (https://github.com/mihaidld/government-sc) and interacting with them through this dApp :

- connection to the Ethereum network via `MetaMask` provider
- interaction with the smart contracts using `ethers.js` library.
- projet set up using `Create React App`
- styled components with `Bootstrap 5` and `Chakra UI`
- modular components to call different functions of the smart contracts using `React Hooks API` (_useState_, _useEffect_, _useContext_, _useReducer_, _useCallback_) and custom hooks
- responsive, accessible and with a dark mode

## Install

### Install dependencies:

```zsh
% yarn install
```

## Run the app in the development mode

```zsh
% yarn start
```

## Details of the project

### **token `CITIZEN`**

A token called `CITIZEN` (symbol `CTZ`, 18 decimals) serves as national currency and citizenship point inside this country.  
1 ETH == 100 CTZ.  
100 `CITIZEN` are automatically awarded to any individual who wishes to become a citizen.

### **Sovereign**

An entity called `sovereign` is the owner of the state, has the right to register and unregister companies and hospitals or to denaturalize citizens.  
It is minted, during token contract deployment, 100% of the total supply (1 million `CTZ`) and retains the right to `burn` or `mint` tokens `CTZ` in the future in order to regulate the economy.

### **Companies**

A company is identified by its Ethereum address and, in order to function, it must be first registered by the sovereign.  
It can then buy `CTZ` from the sovereign.  
A company can recruit employees among the registered citizens, pay them salaries in `CTZ` tokens and dismiss them.

### **Hospitals**

A hospital is identified by its Ethereum address and, in order to function, it must be first registered by the sovereign.  
A hospital can change the health status of a registered citizen between healthy and sick, or declare the death of a citizen.

### **The citizens**

The citizens are identified by their Ethereum address and can have different `properties`:

- alive / dead
- healthy / sick
- working / unemployed
- an employer
- a date when it's possible to ask for retirement etc.

A citizen has also a balance of `CTZ` spread between a `current account`, an `unemployment insurance`, a `health insurance` and a `retirement insurance`. Only the current account is at the citizen's disposal.

**Life events :**

- A `new citizen` is awarded 100 CTZ which go into the current account.
- The `salary` received from an employer is spread as follows: 10% for unemployment insurance, 10% for health insurance, 10% for retirement insurance and the remaining 70% into the current account.
- On employer's `dismissal` all unemployment insurance tokens are transfered into the current account.
- On being declared `sick` by a hospital all health insurance tokens are transfered into the current account.
- At `retirement` (if above retirement age) all unemployment insurance and retirement insurance tokens are transferred into the current account.
- On being declared `dead` by a hospital all tokens of the deceased are given back to the sovereign.

Credits : this project has been designed using resources from Flaticon.com

## Other Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# ContactDapp
