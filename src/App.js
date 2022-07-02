import React from "react";
import "./App.css";
import Web3 from "web3";
import contract from "./build/contracts/ABI.json";
import Image from "./images/back.jpeg";
import Mint from "./images/mint.jpeg";
const contractAddress =  "0x3e1B30C9363040DE2fBe06f71f27769e306BB091"

class App extends React.Component {
  async componentWillMount() {
    this.loadWeb3();
    this.loadBlockchainData();
   
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#282c34";
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.sendToken = this.sendToken.bind(this);
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.state = {
      receiver: "",
      TimeUntilAuctionStart: "",
      amount: "",
      account: "",
      totalSupply: "",
      symbol: "",
      balance: "",
      balancee: "",
      totalsupply : "",
      maxsupply :"",
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  async sendToken() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);

  

    const instance = new web3.eth.Contract(
      contract,
      contractAddress
    );

    await instance.methods
      .safeMint(1)
      .send({
        from: accounts[0],
        value:this.state.balance
      });

    const totalSupply = await instance.methods.totalSupply().call();
    this.setState({ totalSupply: totalSupply });
    console.log("Total Supply" + totalSupply);
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);



    const instance = new web3.eth.Contract(
      contract,
      contractAddress
    );

    const totalSupply = await instance.methods.AuctionStatus().call();

    const symbol = await instance.methods.symbol().call();
    const balance = await instance.methods.price().call();
    const balancee = await instance.methods.TimeUntilNextStage().call();
    const totalsupply = await instance.methods.totalSupply().call();
    const  maxsupply = await instance.methods.maxSupply().call();
    this.setState({ totalSupply: totalSupply });
    this.setState({ symbol: symbol });
    this.setState({ balance: balance });
    
    this.setState({ balancee: balancee });
    this.setState({ totalsupply: totalsupply });
    this.setState({ maxsupply: maxsupply });
    
   
    

    
  }

  render() {
    return (
      <div  style={{  
        backgroundImage: "url(" + Image + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className='App'>
          <div style={ { position: 'absolute',left: '25%',top: '10%' , fontSize : '35px' , fontFamily : 'serif' , fontWeight: 'bold' , textShadow: "0 1px 0 black" }}>
        
        <h1>Exoplanets Infinity</h1>
        <div style={ { fontSize : '18px' , fontFamily : 'serif' , fontWeight: 'bold' , color:'white' , marginTop:'-4%' , marginLeft:'-8%' , textShadow: "0 2px 0 white"}}>
        
        <h1>by Starry Minds Club</h1>
        
        </div>
        <div style={ { fontSize : '28px' , fontFamily : 'serif' , fontWeight: 'bold'   , marginLeft:'-8%'  , textShadow: "0 2px 0 black"}}>
        
        <h1>Time Until Mint</h1>
        
        </div>
        <div style={ { fontSize : '22px' , fontFamily : 'serif' , fontWeight: 'bold' , color:'white' , marginTop:'-2%' , marginLeft:'-6%' , textShadow: "0 2px 0 white"}}>
        
        <h1>{this.state.totalSupply }</h1>
        
        </div>
        <div style={ { fontSize : '24px' , fontFamily : 'serif' , fontWeight: 'bold'   , marginLeft:'-8%' , textShadow: "0 2px 0 black"}}>
        
        <h1>{this.state.totalsupply } / {this.state.maxsupply }</h1>
        
        </div>
        <div  style={ { fontSize : '24px'  , fontFamily : 'serif' , fontWeight: 'bold'   , marginLeft:'-8%' , textShadow: "0 2px 0 black" }}>
        
        {/* <img style={{position: "absolute" , left:"35%" , zIndex:"1" , textShadow: "0 2px 0 white" }} src={Mint} alt="BigCo Inc. logo"/> */}
        <h1  onClick={this.sendToken} style={{backgroundImage: "url(" + Mint + ")" ,  cursor:'pointer', backgroundRepeat: 'no-repeat' ,  backgroundPosition: 'center', 
        }} >MINT</h1>
        
        </div>

        <div style={ { fontSize : '22px' , fontFamily : 'serif' , fontWeight: 'bold' , color:'white'  , textShadow: "0 2px 0 white"}}>
        
        <h1>Price Decoreases by 1/π Every 360 seconds </h1>
        
        </div>

        <div style={ { fontSize : '24px' , fontFamily : 'serif' , fontWeight: 'bold'   , marginLeft:'-8%' , textShadow: "0 2px 0 black"}}>
        
        <h1>Current Price</h1>
        
        </div>

        <div style={ { fontSize : '18px' , fontFamily : 'serif' , fontWeight: 'bold' , color:'white'  , marginTop:'-2%' , marginLeft:'-8%' , textShadow: "0 2px 0 white"}}>
       
        <h1> {this.state.balance / 10 ** 18 + " " + "ETH"} </h1>
        
        </div>

        <div style={ { fontSize : '20px' , fontFamily : 'serif' , fontWeight: 'bold'   , marginLeft:'-8%'  , textShadow: "0 2px 0 black"}}>
        
        <h1>Price Decrease in</h1>
        
        </div>
        <div style={ { fontSize : '12px' , fontFamily : 'serif' , fontWeight: 'bold' , color:'white'  , marginTop:'-2%' , marginLeft:'-8%' , textShadow: "0 2px 0 white"}}>
        
        <h1>  <h1> {this.state.balancee + " " + "Second"} </h1></h1>
        
        </div>
        <div style={ { fontSize : '22px' , fontFamily : 'serif' , fontWeight: 'bold' , color:'white'  ,  textShadow: "0 2px 0 white"}}>
        
        <h1>Everytime Price changes , Start CountDown Timer at 360 seconds </h1>
        
        </div>
        
        
        </div>
       
        </div>
      </div>
      // <div className="App">
      //   <div>
      //     <h1 style={{ color: "#f6a709" }}>ERC-20 Token</h1>

      //     <span
      //       style={{
      //         float: "left",
      //         color: "#f6a709",
      //         fontSize: "20px",
      //         marginLeft: "10px",
      //       }}
      //     >
      //       Total Supply: {this.state.totalSupply + " " + this.state.symbol}
      //     </span>

      //     <span
      //       style={{
      //         float: "right",
      //         color: "#f6a709",
      //         fontSize: "20px",
      //         marginRight: "10px",
      //       }}
      //     >
      //       Balance: {this.state.balance + " " + this.state.symbol}
      //     </span>

      //     <br />
      //     <hr />

      //     <input
      //       style={{
      //         marginTop: "220px",
      //         width: "450px",
      //         height: "25px",
      //         fontSize: "18px",
      //       }}
      //       type="text"
      //       name="receiver"
      //       placeholder="Receiver Address"
      //       value={this.state.receiver}
      //       onChange={this.handleChange}
      //     />

      //     <div>
      //       <input
      //         style={{
      //           marginTop: "10px",
      //           width: "450px",
      //           height: "25px",
      //           fontSize: "18px",
      //         }}
      //         type="number"
      //         name="amount"
      //         placeholder="Amount"
      //         value={this.state.amount}
      //         onChange={this.handleChange}
      //       />
      //     </div>

      //     <button
      //       style={{
      //         marginTop: "10px",
      //         borderRadius: "10px",
      //         backgroundColor: "#f6a709",
      //         color: "white",
      //         width: "120px",
      //         height: "40px",
      //       }}
      //       onClick={this.sendToken}
      //     >
      //       Send
      //     </button>
      //   </div>

      //   <hr style={{ marginTop: "250px" }} />
      //   <h3 style={{ color: "#f6a709" }}>
      //     Developed By: Muhammad Zaryab Rafique
      //   </h3>
      // </div>
    );
  }
}

export default App;