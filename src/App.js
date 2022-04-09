import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [request, setRequest] = useState([]);
  const [search, setSearch] = useState("");
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, data[0]);
        setRequest(data);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredRequest = request.filter(
    (req) =>
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <><h1 className="onlty-text">Procure sua moeda aqui</h1><><div className="input-container">
      <form>
        <input
          type="text"
          placeholder="Procurar"
          className="coin-input"
          onChange={handleChange} />
      </form>
    </div><div className="crypto">
        <table styke="width: 100%">
          <tr>
            <th>Image</th>
            <th>Id</th>
            <th>Apelido</th>
            <th>Valor</th>
            <th>MarketCap</th>
            <th>Variação em 24h</th>
          </tr>
          {filteredRequest.map((element, key) => (
            <tr key={element.id}>
              <td>
                <img src={element.image} alt="imagem da moeda" />
              </td>
              <td className="id">{element.name}</td>
              <td className="apelido">{element.symbol}</td>
              <td>
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL"
                }).format(element.current_price)}
              </td>
              {/* Valor feito para alterar a modalidade do formato de como o preço vem */}
              <td>
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL"
                }).format(element.market_cap)}
              </td>
              {/* condicional caso o valor seja negativo , caso positivo, pintar de verde */}
              {element.market_cap_change_percentage_24h > 0 ? (
                <td>
                  <span style={{ color: "green" }}>
                    {element.market_cap_change_percentage_24h}%
                  </span>
                </td>
              ) : (
                <td>
                  <span style={{ color: "red" }}>
                    {element.market_cap_change_percentage_24h}%
                  </span>
                </td>
              )}
            </tr>
          ))}
        </table>
      </div></></>
  );
}