import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const abi = [
  "function name()",
  "function balanceOf(address wallet) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) public returns (bool)",
];

function App() {
  let provider;
  let wallet;
  let contract;
  let connectedWallet;

  const initialState = {
    address: "",
  };

  const referState = {
    address: "",
    email: "",
  };

  const [details, setDetails] = useState(initialState);
  const [referDetails, setReferDetails] = useState(referState);
  const [loading, setLoading] = useState(false);

  const getConnectedTokenContract = () => {
    provider = new ethers.providers.JsonRpcProvider(
      "https://fantom-testnet.public.blastapi.io/"
    );

    const tokenAddress = "0x1d1464b222F6d6D6CC80c06CD5f08713b7F6756C";
    contract = new ethers.Contract(tokenAddress, abi, provider);

    const walletPrivateKey =
      "ddb1d574dc4bd2a23a35318eb37e04cfb4af0b69cf52730aecf8cdbcda34ae0c";
    wallet = new ethers.Wallet(walletPrivateKey, provider);

    return contract.connect(wallet);
  };

  const convertToEtherValue = (cctAmount) => {
    const roundedEtherValue = cctAmount.toFixed(18).toString();
    const ethersConverted = ethers.utils
      .parseEther(roundedEtherValue.toString())
      .toString();

    return ethersConverted;
  };

  const uploadVideo = () => {
    if (!details.address) alert("Set your wallet address above");

    const bonus = 10; //CCT
    const contract = getConnectedTokenContract();

    setLoading(true);
    contract
      .transfer(details.address, convertToEtherValue(bonus))
      .then(() => {
        alert(
          "thanks for uploading. We have transferred 10 $CCT to your wallet: " +
            details.address
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const refer = () => {
    if (!referDetails.address) alert("whats the referrals address");
    if (!details.address) alert("Set your wallet address");
    if (details.address === referDetails.address)
      alert("Cant have two of the same wallet");

    const bonus = 5; //CCT
    const contract = getConnectedTokenContract();

    setLoading(true);
    contract
      .transfer(details.address, convertToEtherValue(bonus))
      .then(() => {
        alert(
          "thanks for uploading. We have transferred 5 $CCT to wallet: " +
            details.address
        );

        contract
          .transfer(referDetails.address, convertToEtherValue(bonus))
          .then(() => {
            alert(
              "Transfer to referral complete - wallet: " + referDetails.address
            );
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      <h3>What is this?</h3>
      <h4>
        This dApp will have all the necessary functions (front end) as a working
        PoC interacting with a Token deployed on Fantom Network.
      </h4>
      <br />
      <br />
      <h3>What is this and what do I do?</h3>
      <h4>
        <ul>
          <li>
            1,000,000 $CCT is sitting in the Deployer Wallet (CryptoCrew Admin):{" "}
            <a
              href="https://testnet.ftmscan.com/address/0x0638fc7983fd2d356907c44581802c2d5daaca04"
              target="_blank"
            >
              [View Token + Deployer]
            </a>
          </li>
          <li>
            Users will be rewarded in ERC-20 tokens on the Fantom Blockchain.
            (Easily bridgable to BSC and ETH ;) )
          </li>
          <li>
            Users will not need to connect wallets or anything for simplicity.
            But, somewhere in App they will need a place to enter the address
            where the rewards are paid to.
          </li>
          <li>
            !!! Make sure to Add Fantom Testnet to MetaMask:{" "}
            <a
              target="_blank"
              href="https://docs.fantom.foundation/tutorials/set-up-metamask"
            >
              [?]
            </a>
          </li>
        </ul>
      </h4>
      <br />
      <br />
      <br />

      <div className="dapp">
        <h1>CryptoCrew Reward dApp</h1>
        <div className="static-details">Wallet Address: {details.address}</div>
        <br />
        <div className="form-details">
          <label>Enter your Wallet Address: {"    "}</label>
          <input
            name="address"
            placeholder="Enter yo wallet address..."
            onChange={(e) =>
              setDetails({ ...details, address: e.target.value })
            }
            disabled={loading}
          ></input>
        </div>

        <br />
        <br />
        <div className="upload-video">
          <h4>Upload a video to earn 10 $CCT</h4>
          <button onClick={() => uploadVideo()} disabled={loading}>
            Upload a video...
          </button>
        </div>

        <div className="upload-video">
          <h4>
            refer someone to get 5 $CCT (make sure you Upload a video first to
            get some tokens)
          </h4>
          <label>Enter Referrals Wallet Address: {"    "}</label>
          <input
            name="referAddress"
            placeholder="Enter the referrals Wallet Address"
            onChange={(e) =>
              setReferDetails({ ...referDetails, address: e.target.value })
            }
            disabled={loading}
          ></input>
          <br />
          <br />
          <button onClick={() => refer()} disabled={loading}>
            Refer a Friend
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
