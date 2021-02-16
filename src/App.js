// npm modules
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

// internal modules
import { marvelCharactersApi } from "./api/marvelApi";

// stylesheets
import "./App.scss";

function App() {
  const maxCharactersInPage = 8;

  const [characters, setCharacters] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let params = { limit: maxCharactersInPage };

    name
      ? (params.name = name)
      : (params.offset = currentPage * maxCharactersInPage);

    marvelCharactersApi(params)
      .then((response) => {
        setTotalCharacters(response.data.total);
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [currentPage, name]);

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loading">
          <h3>Loading</h3>
          <img src="./loading.gif" alt="loading"></img>
        </div>
      ) : (
        <>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Marvel Character's Name"
              value={name}
              onChange={handleNameChange}
            />
            <img src="./search.svg"></img>
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
                  <img
                    src={el.thumbnail.path + "." + el.thumbnail.extension}
                  ></img>
                  <h5>{el.name.toUpperCase()}</h5>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
