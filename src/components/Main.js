
import { useEffect, useState } from 'react';
import Coin from './Coin';
import axios from 'axios';
import Iframe from 'react-iframe';
import { useStytch } from "@stytch/react";
import { isLoggedIn, setLogin } from '../LoginUtil';
import { useNavigate } from "react-router-dom";
import './Main.css';

function Main() {
  const [coinList, setCoinList] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [sortType, setSortType] = useState("pricehtl");

  const [coinPage, setCoinPage] = useState();

  const navigate = useNavigate();

  const [isLogged, logged] = useState(isLoggedIn());

  // const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const stytchClient = useStytch();

  const logout = () => {
    setLogin(false);
    stytchClient.session.revoke().then(() => {navigate("/login")});

    };



  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '50',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': '1b6453853emshc2d45193a520eaap106461jsn17dba605c391',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    if (isLoggedIn() === false) {
      navigate("/login");
      alert("You are not logged in");
      return;
    }
    axios.request(options).then((response) => {
      response.data.data.coins.sort((a, b) => b.price - a.price);
      setCoinList(response.data.data.coins);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  const searchCoins = coinList.filter((coin) => {
    return coin.name.toLowerCase().includes(searchText.toLowerCase());
  });

  useEffect(() => {
    const sortCoins = type => {
      let sorted = [];

      if (type === "pricehtl") {
        let sortProperty = 'price';
        sorted = [...coinList].sort((a, b) => b[sortProperty] - a[sortProperty]);
      }
      else if (type === "pricelth") {
        let sortProperty = 'price';
        sorted = [...coinList].sort((a, b) => a[sortProperty] - b[sortProperty]);
      }
      else {
        let sortProperty = 'name';
        sorted = [...coinList].sort((a, b) => a[sortProperty].localeCompare(b[sortProperty]));
      }
      console.log(sorted);
      setCoinList(sorted);
    };
    sortCoins(sortType);
  }, [sortType]);

  const handleClick = (e) => {
    setCoinPage(e);
  }

  return (
    // {isLoggedIn() &&
    <div className="App">
      
      <div className="topHeader">
        <input type="text" placeholder="bitcoin" onChange={(e) => { setSearchText(e.target.value) }}></input>
        <div class="form-floating">
          <select class="form-select" id="floatingSelect" aria-label="Floating label select example" name="sort" onChange={(e) => { setSortType(e.target.value) }}>
            <option value="pricehtl">Price High to Low</option>
            <option value="pricelth">Price Low to High</option>
            <option value="name">Name</option>
          </select>
          <label for="floatingSelect">Sort By</label>
          <button onClick={(e) => {logout()}}>Logout</button>
        </div>
      </div>
      <div className="contentContainer">
        <div className="coinScroll">
          <ul>
            {searchCoins && searchCoins.map((coin, index) => {
              return (
                <Coin key={index} onClick={() => handleClick(coin.coinrankingUrl)} name={coin.name} icon={coin.iconUrl} price={coin.price} link={coin.coinrankingUrl} prices={coin.sparkline} />
              )
            })}
          </ul>
        </div>
        <Iframe src={coinPage} className="Iframe">

        </Iframe>
      </div>
    </div>
    // }
  );
}

export default Main;



