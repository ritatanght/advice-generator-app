import "./App.css";
import { useState, useEffect, useCallback } from "react";
import dice from "./images/icon-dice.svg";
import desktopDivider from "./images/pattern-divider-desktop.svg";
import mobileDivider from "./images/pattern-divider-mobile.svg";

const url = "https://api.adviceslip.com/advice/";

function App() {
  const [id, setId] = useState(1);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAdvice = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url + id);
      const slipAdvice = await response.json();
      setLoading(false);
      setAdvice(slipAdvice.slip.advice);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [id]);

  const randomAdvice = () => {
    // api has advice only for id between 1 - 224
    const randomNum = Math.floor(Math.random() * 224) + 1;
    setId(randomNum);
  };

  useEffect(() => {
    fetchAdvice();
  }, [id, fetchAdvice]);

  return (
    <div className="container">
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <>
          <h2 className="advice-id">Advice #{id}</h2>
          <p className="quote">"{advice}"</p>
        </>
      )}

      <picture>
        <source media="screen and (max-width:450px)" srcSet={mobileDivider} />
        <img src={desktopDivider} alt="divider" className="divider" />
      </picture>
      <button onClick={randomAdvice}>
        <img src={dice} className="dice" alt="dice" />
      </button>
    </div>
  );
}

export default App;
