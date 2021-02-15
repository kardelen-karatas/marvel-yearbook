// npm modules
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

// internal modules
import { marvelCharactersAPI as marvelCharactersApi } from "./api/marvelApi";
import "./App.css";

function App() {
  const maxCharactersInPage = 10;

  const [characters, setCharacters] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    marvelCharactersApi(maxCharactersInPage, currentPage * maxCharactersInPage)
      .then((response) => {
        setTotalCharacters(response.data.total);
        setCharacters(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  } 

  return (
    <div className="App">

      <div className="pagination">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={maxCharactersInPage}
          totalItemsCount={totalCharacters - maxCharactersInPage}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>

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
