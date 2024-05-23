import React, { useState, useEffect } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState({
    text: "",
    author: ""
  });
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("https://type.fit/api/quotes");
        const data = await res.json();
        setQuotes(data);
        setRandomQuoteAndColor(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  function getRandomColor() {
    const colors = [
      "#ac3b61",
      "#5783c9",
      "#b06d25",
      "#93b88f",
      "#b29bc2",
      "#750204"
    ];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  function getRandomQuote(quotes) {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  function setRandomQuoteAndColor(quotes) {
    const randomQuote = getRandomQuote(quotes);
    const randomColor = getRandomColor();
    setCurrentQuote({
      text: randomQuote.text,
      author: randomQuote.author
    });
    setColor(randomColor);
  }

  function handleClick() {
    setRandomQuoteAndColor(quotes);
  }

  return (
    <div style={{margin:"0",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:color}}>
          <div id="quote-box" style={{position:"relative",display:"flex",background:"white",color:color}}>
<div style={{ maxWidth: "600px", textAlign: "center" ,borderRadius:"5px"}}>
  <div id="text">
    <h1>{currentQuote.text}</h1>
  </div>
  <div id="author">
    <p>- {currentQuote.author.replace(", type.fit","")}</p>
  </div>
  <div id="button-wrapper">
  <a id="tweet-quote" target="_blank" href={`https://www.twitter.com/intent/tweet/?text=${quotes.quote}`}>
      <i className="fa-brands fa-square-twitter" style={{fontSize:"30px",marginTop:"20px"}}></i>
    </a>
    <button type="button" className="btn btn-primary" onClick={handleClick} id="new-quote" style={{ marginLeft: "20px",marginBottom:"15px" }}>
      New Quote
    </button>
  </div>
</div>
</div>
    </div>

  );
}

export default App;
