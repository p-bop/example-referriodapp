# nfiny example dApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The project aims to showcase some common use-cases of dApps.

Initially written as Fantom PoC, this code can be re-used in any ERC-20 compliant blockchain. (After updating the node URL, or hosting your own).

The code shown here can be used both Client and Server side.

Do not ever store keys in solution files.

### `yarn install`
### `npm start`

### Recommendations
- Write in typescript (.tsx or .jsx)
- Ensure that all secrets are in Parameter Store (or similar)
- This PoC is an interaction between the deployer wallet & smart contract, so it is recommended to put server-side. 
