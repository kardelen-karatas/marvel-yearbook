// npm modules
import { useState, useEffect } from "react";

// internal modules
import { marvelCharactersAPI as marvelCharactersApi } from "./api/marvelApi";
import "./App.css";

function App() {
  const maxCharactersInPage = 10;

  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    marvelCharactersApi(maxCharactersInPage, currentPage * maxCharactersInPage)
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  return (
    <div className="App">
      <div className="cards">
        {characters.map((el) => {
          return (
            <div className="card">
              <img src={el.thumbnail.path + "." + el.thumbnail.extension}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
