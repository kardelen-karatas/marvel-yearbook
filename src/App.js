// npm modules
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

// internal modules
import { marvelCharactersAPI as marvelCharactersApi } from "./api/marvelApi";
import "./App.css";

function App() {
  const maxCharactersInPage = 10;

  const [characters, setCharacters] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {

    let params = {limit: maxCharactersInPage};

    name
      ? ( params.name = name )
      : (params.offset = currentPage * maxCharactersInPage);

    marvelCharactersApi(params)
      .then((response) => {
        setTotalCharacters(response.data.total);
        setCharacters(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [currentPage, name]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="App">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Marvel Character's Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>

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
