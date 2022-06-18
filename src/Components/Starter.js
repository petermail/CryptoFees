import axios from 'axios';
import { useEffect, useState } from 'react'

import Web3 from "web3";
//import WalletConnect from '@walletconnect/client';

const getWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    return web3;
}

const connect = (onConnected, onNetworkUpdate, onAccountUpdate) => {
    var ethereum;
    console.log("connecting");
    if (typeof window.ethereum !== 'undefined'){
        ethereum = window.ethereum;

        ethereum.on('chainChanged', onNetworkUpdate)
        ethereum.on('accountsChanged', onAccountUpdate);
    }/* else {
      const bridge = "https://bridge.walletconnect.org";
      // create new connector
      const connector = new WalletConnect({ bridge });
      if (!connector.connected) {
        // create new session
        connector.createSession();
      }

      //ethereum = new Web3(JSONRPC_URL);
    }*/

    // Enable
    if (ethereum != null){
      ethereum.request({ method: 'eth_requestAccounts' }).then(x => {
        onConnected(ethereum);
      });
    }
}

const disconnect = (ethereum) => {
    try {
      ethereum.disconnect();
    } catch (err) {
      if (ethereum !== null && ethereum.close){
        ethereum.close();
      }
    }
  }

const getBalance = (web3, address, onBalanceUpdate) => {
    web3.eth.getBalance(address).then(x => 
      onBalanceUpdate(web3.utils.fromWei(x))
    );
  }
  
const fixChecksumAddress = function (web3, address) {
  return address.length === 0 ? "" : web3.utils.toChecksumAddress(address.toString());
}

const verifyAddress = (web3, address) => {
  return web3.utils.isAddress(address);
}

const makeMessage = (destinationAddress, chain, amountExpected, delayTill) => {
    return privateMakeMessage(['destination address', 'chain', 'amount to send', 'delay'], 
        [destinationAddress, chain, amountExpected.toString(), delayTill]);
}
const privateMakeMessage = (titles, data) => {
    const result = [];
    for (let i = 0; i < titles.length; ++i) {
        result.push({type: 'string', name: titles[i], value: data[i]});
    }
    return result;
}
const makeMessage2 = (destinationAddress, chain, amountExpected, delayTill) => {
    return JSON.stringify({
        domain: { },
        types: {
            EIP712Domain: [],
            SendData: [
              { name: 'destination address', type: 'string' },
              { name: 'chain', type: 'string' },
              { name: 'amount send', type: 'string' },
              { name: 'delay', type: 'string' },
            ],
          },
        message: {
          'destination address': destinationAddress,
          chain: chain,
          'amount send': amountExpected,
          delay: delayTill,
        },
        primaryType: 'SendData',
      });
}

const sign = (web3, address, message, onFinish) => {
    web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v4',
        params: [address, message],
        from: address,
    }, (err, res) => {
        console.log(res.result);
        if (onFinish) {
            onFinish(res.result);
        }
    });
}

const addChain = (ethereum, chainId, chainName, nativeCoinName, nativeCoinSymbol, rpcUrls, blockExplorers, onDone) => {
  if (ethereum === null){ return; }
  ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: "0x" + Number(chainId).toString(16), // A 0x-prefixed hexadecimal string
      chainName: chainName,
      nativeCurrency: {
        name: nativeCoinName,
        symbol: nativeCoinSymbol, // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: rpcUrls, // string[];
      blockExplorerUrls: blockExplorers, // string[];
    }]
  }).then(x => {
    if (onDone){ onDone(); }
  });
}

const saveToDb = async (signature, address, amount, destination, chain, delayTill, invalidatePrevious) => {
    var res = await axios.post("http://www.fullbridge.wz.cz/CryptoFees/saveUserPreference_kU72jdkAp71ckD790a.php", 
        { signature, address, amount, destination, chain, delayTill, invalidatePrevious });
}

export const Starter = () => {
    const [web3, setWeb3] = useState(null);
    const [eth, setEth] = useState(null);
    const [wallet, setWallet] = useState("");
    const [chain, setChain] = useState("");

    const connectHandler = () => {
        setWeb3(x => getWeb3());
    }
    useEffect(() => {
        connectHandler();
    }, []);
    useEffect(() => {
        if (web3 === null){ return; }
        connect((eth) => {
            setEth(x => x = eth);
            setChain(x => x = eth.networkVersion);
            web3?.eth.getAccounts().then(accounts => {
                const acc = fixChecksumAddress(web3, accounts[0]);
                console.log(acc);
                setWallet(x => x = acc);
            });
        }, (network) => {
            const chain = parseInt(network, 16);
            setChain(x => x = chain);
            web3.eth.getAccounts().then(accounts => {
              const acc = fixChecksumAddress(web3, accounts[0]);
              console.log(acc);
              setWallet(x => x = acc);
            });
        }, (account) => {
            const acc = fixChecksumAddress(web3, account);
            console.log(acc);
            setWallet(x => x = acc);
        });
    }, [web3]);

    return (<div>
        wallet: {wallet}<br />
        chain: {chain}<br />
        <Disconnect eth={eth} /><br />
        <Signing web3={web3} wallet={wallet} destinationAddress={wallet} chain={"Binance"} amountSend={1} delayTill={"17.10.2010"} /><br />
    </div>);
}

const Signing = (props) => {
    const [signature, setSignature] = useState("");

    const { web3, wallet, destinationAddress, chain, amountSend, delayTill } = props;
    const mess = makeMessage2(destinationAddress, chain, amountSend.toString(), delayTill);
    console.log(mess);
    return (<div><div onClick={() => sign(web3, wallet, mess, x => setSignature(y => x))}>
        sign</div>
        {signature ? <div>signature: {signature}<br /><div onClick={() => saveToDb(signature, wallet, amountSend, destinationAddress, chain, delayTill, false)}>send to DB</div></div> : ""}
    </div>)
}

const Disconnect = (eth) => {
    return (<div onClick={() => disconnect(eth)}>disconnect</div>)
}