import WalletCard from "./MetaConnect";
import "./App.css";
import React, { Component } from "react";
var Coins = require("./response.json");

function App() {
  return (
    <div className="App">
      <h1>Market</h1>
      <WalletCard />
      <br></br>
      <Panel />
      <br></br>
    </div>
  );
}

class Panel extends Component {
  render() {
    return (
      <div className="PanelOut">
        {Coins.map(({ id, symbol, current_price, index, market_cap_rank }) => (
          <div className="PanelIn">
            <h3 key={index}>
              <div className="CoinName">
                {market_cap_rank}
                {"  "}
                {id.toUpperCase()} | {symbol.toUpperCase()}
              </div>
              <div className="CoinPrice">{current_price}$</div>
              <button className="Buy">BUY</button>
              <button className="Sell">SELL</button>
            </h3>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
