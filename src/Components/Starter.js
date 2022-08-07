import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import MetadataAbi from '../Json/MetadataAbi.json'
import '../Css/Starter.css';
import { loadGasAsync } from '../Logic/GasLogic';

const BigNumber = require('bignumber.js');

const getWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    return web3;
}

const cfAddress = "0x199Fe3A4fC9A855290A8248BF0fa96032Cb40b6F";
const chainIds = [56, 137, 43114, 250, 1284, 1285, 1313161554, 25];
const rpcs = [
  "https://bsc-dataseed.binance.org/",
  "https://polygon-rpc.com/",
  "https://api.avax.network/ext/bc/C/rpc",
  "https://rpc.ftm.tools/",
  "https://rpc.api.moonbeam.network",
  "https://rpc.api.moonriver.moonbeam.network",
  "https://mainnet.aurora.dev",
  "https://evm.cronos.org"
];
const contracts = [
  ["0x55d398326f99059ff775485246999027b3197955", // USDT
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "0xc7198437980c041c805a1edcba50c1ce5db95118",
    "0x049d68029688eabf473097a2fc38ef61633a3c7a",
    "0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73",
    "0xb44a9b6905af7c801311e8f4e76932ee959c663c",
    "0x4988a896b1227218e4a686fde5eabdcabd91571f",
    "0x66e428c3f67a68878562e79a0234c1f83c208770",
  ], // USDC
  ["0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
    "0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b",
    "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d",
    "0xb12bfca5a55806aaf64e99521918a4bf0fc40802",
    "0xc21223249ca28397b4b6541dffaecc539bff0c59",
  ]
];
const decimals = [new BigNumber(18), 6, 6, 6, 6, 6, 6, 6];

const connect = (onConnected, onNetworkUpdate, onAccountUpdate) => {
    var ethereum;
    if (typeof window.ethereum !== 'undefined'){
        ethereum = window.ethereum;

        ethereum.on('chainChanged', onNetworkUpdate)
        ethereum.on('accountsChanged', onAccountUpdate);
    }
    //console.log("ethereum", ethereum);

    // Enable
    if (ethereum != null){
      ethereum.request({ method: 'eth_requestAccounts' }).then(x => {
        onConnected(ethereum);
      }, err => {
      });
    }
}
const connectQrCode = (onConnected, onNetworkUpdate, onAccountUpdate) => {
  const provider = new WalletConnectProvider({
    //bridge: "https://bridge.walletconnect.org",
    rpc: {
      56: rpcs[0],
      137: rpcs[1],
      43114: rpcs[2],
      250: rpcs[3],
      1284: rpcs[4],
      1285: rpcs[5],
      1313161554: rpcs[6],
      25: rpcs[7]
    }
  });
  //provider.disconnect();
  provider.on('chainChanged', onNetworkUpdate)
  provider.on('accountsChanged', onAccountUpdate);
  provider.on('disconnect', (code, reason) => onAccountUpdate(""));
  //window.ethereum = provider;
  provider.enable();
}
const getHeartbeatAsync = async () => {
  const url = "https://fullbridge.wz.cz/CryptoFees/getHeartbeat.php";
  const heartbeat = await axios.get(url);
  return heartbeat.data;
}

const disconnect = (ethereum) => {
    try {
      if (ethereum.killSession){
        ethereum.killSession();
      }
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
  return web3?.utils.isAddress(address);
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

const switchChain = (ethereum, chainId, onDone, onError) => {
  ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainId }],
  }).then(x => {
    if (onDone) { onDone(); }
  }, err => {
    if (onError) { onError(err); }
  });
};
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


const transferToken = (web3, contractAddress, address, toAddress, amount, gasPriceGwei, onUpdate) => {
  const contract = new web3.eth.Contract(MetadataAbi, contractAddress);
  contract.methods.transfer(toAddress, amount).estimateGas({ from: address }).then(gas => {
    contract.methods.transfer(toAddress, amount).send({ 
      from: address,
      gasLimit: gas,
      gasPrice: gasPriceGwei * (10 ** 9),
    }).then((val) => {
        if (onUpdate) { onUpdate(val); }
    }, (err) => { console.log("Error transfering tokens"); });
  });
}

const saveToDb = async (signature, address, amount, destination, chain, delayTill, invalidatePrevious) => {
    var res = await axios.post("http://www.fullbridge.wz.cz/CryptoFees/saveUserPreference_kU72jdkAp71ckD790a.php", 
        { signature, address, amount, destination, chain, delayTill, invalidatePrevious });
}

export const Starter = () => {
    const [web3, setWeb3] = useState(null);
    //const [eth, setEth] = useState(null);
    const [wallet, setWallet] = useState("");
    const [chain, setChain] = useState("");
    const [isOnline, setIsOnline] = useState(false);
    const [isTestnet, setIsTestnet] = useState(false);
    const chains = ["Binance", "Polygon", "Avax", "Fantom", "Moonbeam", "Moonriver", "Aurora", "Cronos"];
    const prices = [300, 1, 30, 1, 1, 20, 2000, 0.2];
    const coins = ["BNB", "MATIC", "AVAX", "FTM", "GLMR", "MOVR", "ETH", "CRO"];
    const gases = [5, 31, 26, 16, 100, 1, 0.07, 5000];

    const loadTestnets = () => {
      chainIds.splice(0, chainIds.length); // Doesn't update data in other components, think of better solution
      chainIds.push([97, 80001, 43113, 4002, 1313161555, 338]);
      prices.splice(4, 2);
      coins.splice(4, 2);
      gases.splice(0, gases.length);
      gases.push([10, 31, 25, 2, 0.07, 1969]);
      console.log(gases);
      setIsTestnet(x => true);
      contracts[0].splice(0, contracts[0].length);
      contracts[1].splice(0, contracts[1].length);
      contracts[0].push("0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee");
      contracts[1].push("0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee");
    }
    const reloadGases = () => {
      loadGasAsync(g => {
        for (let i = 0; i < chains.length; ++i) {
          const gas = g.find(x => x.chainName === chains[i])?.gas;
          if (gas) {
            gases[i] = gas;
          }
        }
      }, () => {});
    };
    const afterConnect = useCallback((chain) => {
      //console.log("afterConnect ", chain);
      setChain(x => x = chain);
      if (web3 === null || web3.eth === null) { return; }
      web3?.eth.getAccounts().then(accounts => {
        const acc = fixChecksumAddress(web3, accounts[0]);
        console.log(acc);
        setWallet(x => x = acc);
      });
    }, [web3]);
    const connectHandler = useCallback(async () => {
        setWeb3(x => getWeb3());
        reloadGases();
        await checkHeartbeatAsync();
    }, []);
    const checkHeartbeatAsync = async () => {
      const heartbeat = await getHeartbeatAsync();
      var latest = new Date(Math.max.apply(null, heartbeat.filter(x => chainIds.includes(x.ChainId)).map(x => new Date(x.Last))));
      latest.setMinutes(latest.getMinutes() + 10);
      setIsOnline(x => latest > new Date())
    }
    useEffect(() => {
        connectHandler();
    }, [connectHandler]);
    useEffect(() => {
        if (web3 === null){ return; }
        connect((eth) => {
            //setEth(x => x = eth);
            afterConnect(eth.networkVersion);
        }, (network) => {
            const chain = typeof network === "number" ? network : parseInt(network, 16);
            console.log(chain);
            afterConnect(chain);
        }, (account) => {
            const acc = fixChecksumAddress(web3, account);
            console.log(acc);
            setWallet(x => x = acc);
        });
    }, [web3, afterConnect]);

    return (<div>
      <Warning isOnline={isOnline} />
      { !isTestnet &&
        <button className="marg10 pad10" onClick={() => loadTestnets()}>load testnet</button>
      }
        <WalletInfo wallet={wallet} eth={window.ethereum} afterConnect={afterConnect} setWallet={setWallet} />
        <SendData activeChain={chain} chains={chains} prices={prices} coins={coins} gases={gases} web3={web3} wallet={wallet} chainIds={chainIds} />
    </div>);
}

const Warning = (props) => {
  const { isOnline } = props;
  if (isOnline) {
    return <div className="marg10 pad10 invalid">The service is in beta, use at your own risk.</div>
  } else
    return (<div className="marg10 pad10 warning">The service is not online now.</div>)
}

const WalletInfo = (props) => {
  const { wallet, eth, afterConnect, setWallet } = props;

  return (<div className="pad10">
    { wallet &&
      <><span className="valid pad10">wallet: {wallet}</span>
        <Disconnect wallet={wallet} eth={eth} setWallet={setWallet} />
      </>
    }
    { !wallet &&
      <span>
        <span className="valid pad10 buttonMin" onClick={() => 
          connect(eth => afterConnect(eth.networkVerion), chain => afterConnect(chain), (account) => setWallet(x => account))}>
            connect
        </span>
        <span className="valid pad10 marg10 buttonMin" onClick={() => 
          connectQrCode(eth => afterConnect(eth.networkVerion), chain => afterConnect(chain), (account) => setWallet(x => account))}>
            WalletConnect
        </span>
      </span>
    }
  </div>)
}

const Disconnect = (props) => {
  const { eth, wallet, setWallet } = props;
  if (wallet !== "") {
    return (<span className="marg10 pad10 invalid buttonMin" 
      onClick={() => { disconnect(eth); setWallet(x => "");}}>disconnect</span>)
  } else {
    return <span />;
  }
}

const SendData = (props) => {
  const { chains, prices, coins, gases, web3, wallet, chainIds, activeChain } = props;
  const [usdType, setUsdType] = useState("usd");
  const [myChain, setMyChain] = useState("Binance");
  const [destChain, setDestChain] = useState("Binance");
  const [destAddress, setDestAddress] = useState("");
  const [isActiveDest, setIsActiveDest] = useState(true);
  const [isActiveDelay, setIsActiveDelay] = useState(true);
  const [delay, setDelay] = useState(Date.now());

  useEffect(() => {
    setDestAddress(x => wallet);
  }, [wallet]);
  useEffect(() => {
    for (let i = 0; i < chainIds.length; ++i) {
      if (chainIds[i] === activeChain) {
        setMyChain(x => chains[i]);
      }
    }
  }, [activeChain, chainIds, chains]);

  return (<div>
    <div className="marg10">I send <span className="spec"><span className={usdType}>1 {usdType}
      </span></span> on {myChain} blockchain...</div>
    <div className="flex">
      <BigTile value="USDT" isActive={usdType === "USDT"} select={() => setUsdType(x => "USDT")} />
      <BigTile value="USDC" isActive={usdType === "USDC"} select={() => setUsdType(x => "USDC")} />
      
  </div>
  <StarterChains chains={chains} chain={myChain} isDest={false} setChain={setMyChain} chainIds={chainIds} coins={coins} />
  <StarterChains chains={chains} chain={destChain} isDest={true} setChain={setDestChain} prices={prices} coins={coins} gases={gases} />
  <DestAddress destAddress={destAddress} setDestAddress={setDestAddress} wallet={wallet}
    isActive={isActiveDest} setIsActive={setIsActiveDest} web3={web3} />
  <Delay isActive={isActiveDelay} setIsActive={setIsActiveDelay}
    delay={delay} setDelay={setDelay} />
  <SendButton chains={chains} gases={gases} usdType={usdType} myChain={myChain} web3={web3} wallet={wallet} destChain={destChain}
    delay={isActiveDelay ? "none" : delay.toString()} destAddress={isActiveDest ? wallet : destAddress} />
  </div>)
}

const Delay = (props) => {
  const { isActive, setIsActive, delay, setDelay } = props;

  return (
    <div className="marg10">delay:<br />
      <input className="inputBoxBig" type="checkbox" value={isActive} onChange={e => setIsActive(x => !x)} />
      { isActive &&
        <input disabled={true} type="text" value="none" className="inputBig" />
      }
      { !isActive &&
        <input type="datetime-local" disabled={isActive} className="inputBig" value={delay}
          name="meeting-time" min="2022-01-01T00:00" max="2024-01-01T00:00" onChange={e => setDelay(x => e.target.value)} />
      }
    </div>
  )
}

const DestAddress = (props) => {
  const { destAddress, setDestAddress, isActive, setIsActive, web3, wallet } = props;
  const isValid = verifyAddress(web3, destAddress);

  return (
    <div className="marg10">
      destination address:<br />
      <input type="checkbox" value={isActive} onChange={e => setIsActive(x => !x)} className="inputBoxBig" />
      <input type="text" disabled={isActive} value={isActive ? wallet : destAddress} className="inputBig"
        onChange={e => { if (true){ setDestAddress(x => e.target.value); } }} />
      { !isActive && isValid &&
        <span className="valid marg10 pad10">Valid address</span>
      }
      { !isActive && !isValid &&
        <span className="invalid marg10 pad10">Invalid address</span>
      }
    </div>
  )
}
const SendButton = (props) => {
  const { chains, gases, usdType, myChain, web3, wallet, destAddress, destChain, delay } = props;
  const [signature, setSignature] = useState("");
  const amountSend = 1;
  const mess = makeMessage2(destAddress, destChain, amountSend.toString(), delay);

  const getIndex = (chain) => {
    const c = chain;
    for (let i = 0; i < chains.length; ++i) {
      if (chains[i] === c) {
        return i;
      }
    }
    return -1;
  }
  const index = getIndex(myChain);
  const contractAddress = contracts[usdType === "USDT" ? 0 : 1][index];
  const amount = new BigNumber(10 ** decimals[index]);

  const sendAndSign = () => { 
    console.log("Amount: " + amount + " gases: " + gases[index]);
    transferToken(web3, contractAddress, wallet, cfAddress, amount, gases[index], () => {
      sign(web3, wallet, mess, x => { 
        if (x) {
          setSignature(y => x);
          saveToDb(signature, wallet, amountSend, destAddress, destChain, delay, false);
        }
      });
    }, err => {});
  }

  return (
    <div className="marg10">
      <div onClick={() => sendAndSign()} className="buttonNice">{`Send 1 ${usdType} on ${myChain} blockchain & sign`}</div>
    </div>
  )
}

const StarterChains = (props) => {
  const { chains, isDest, setChain, prices, coins, gases, chain, chainIds } = props;
  const [destChain, setDestChain] = useState(chain);
  const DIVIDER = 1000000000;

  useEffect(() => {
    setDestChain(x => chain);
  }, [chain]);

  const priceToAmount = (price) => {
    return Math.round(10000 / price) / 10000;
  }
  const priceToTransferCount = (price, gas) => {
    return Math.floor(DIVIDER / (65000 * gas * price));
  }
  const getIndex = (chain) => {
    const c = chain ?? destChain;
    for (let i = 0; i < chains.length; ++i) {
      if (chains[i] === c) {
        return i;
      }
    }
    return -1;
  }
  const changeChain = (chain) => {
    if (chainIds === undefined) { return; }
    const index = getIndex(chain)
    const chainId = `0x${chainIds[index].toString(16)}`;
    switchChain(window.ethereum, chainId, () => {}, e => {
      if (e?.code === 4902) {
        let chainName = chain;
        let explorer;
        switch (chain) {
          case "Binance": 
            chainName = "BNB Smart Chain";
            explorer = "https://bscscan.com/";
          break;
          case "Polygon":
            chainName = chain + " Mainnet";
            explorer = "https://polygonscan.com/";
            break;
          case "Avax":
            chainName = "Avalanche (C-Chain)";
            explorer = "https://snowtrace.io/";
            break;
          case "Fantom":
            chainName = "Fantom Opera";
            explorer = "https://ftmscan.com/";
            break;
          case "Moonbeam":
            explorer = "https://moonscan.io/";
            break;
          case "Moonriver":
            explorer = "https://moonriver.moonscan.io";
            break;
          case "Aurora":
            explorer = "https://aurorascan.dev";
            break;
          case "Cronos":
            chainName = "Cronos Mainnet Beta";
            explorer = "https://cronoscan.com/";
            break;
          default:
            explorer = "";
            break;
        }
        addChain(window.ethereum, chainId, chainName, coins[index], coins[index], [rpcs[index]], [explorer],
          () => {
            switchChain(window.ethereum, chainId);
          });
      }
    });
  }
  
  const getCoinTransfers = () => {
    const index = getIndex();
    const transferCount = priceToTransferCount(prices[index], gases[index]);
    return (<span>
      <span className="spec"><span className={destChain}>
        {priceToAmount(prices[index])} {coins[index]}</span></span> for about {transferCount} simple token transfers</span>)
  }

  return (
    <div>
      {isDest && 
        <div className="marg10">...and receive {getCoinTransfers()} on {destChain}.</div>
      }
    <div className="wrap">
      {chains.map(x => <BigTile key={x} value={x} isActive={destChain === x} 
        select={() => { 
          changeChain(x);
          setDestChain(y => x); 
          setChain(y => x);
        }} 
        bigText={isDest ? "$1" : ""} />)}
  </div></div>); 
}

const BigTile = (props) => {
  const { value, select, isActive, bigText } = props;

  return (<div className={`${isActive ? "active" : ""}`}>
  <div className={`${value} starterChain`} onClick={() => { select(); }}>
    <div className="inside bigSize">
      <div className="insideText"><div className="big">{bigText}</div>{value}</div>
    </div>
  </div></div>)
}