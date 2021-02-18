// npm modules
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

// internal modules
import { marvelCharactersApi } from "./api/marvelApi";

// components
import Card from "./components/Card";
import Load from "./components/Load";
import Searchbar from "./components/Searchbar"

// stylesheets
import "./App.scss";

function App() {
  const maxCharactersInPage = 8; // max number of marvel characters to display in a single request
  const [characters, setCharacters] = useState([]); // list of marvel characters
  const [totalCharacters, setTotalCharacters] = useState(0); // total number of marvel characters in marvel api
  const [name, setName] = useState(""); // searched name of marvel character
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let params = {
      limit: maxCharactersInPage,
      offset: (currentPage - 1) * maxCharactersInPage,
    };

    // check if there is a search input for the character's name
    if (name) params.nameStartsWith = name;

    // call marvel api with given parameters
    marvelCharactersApi(params)
      .then((response) => {
        setTotalCharacters(response.data.total);
        setCharacters(response.data.results);
        setLoading(false);
        if (name) setCurrentPage(1);
      })
      .catch((error) => {
        setError(true);
      });
  }, [loading, name]);

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      {error ? (
        <h1>SOMETHING WENT WRONG. PLEASE TRY TO RELOAD YOUR PAGE!</h1>
      ) : loading ? (
        <Load/>
      ) : (
        <>
          <Searchbar name={name} setName={setName}/>
          <div className="cards">
            {characters.map((el) => {
              return <Card character={el} />;
            })}
          </div>
          <div className="pagination">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={maxCharactersInPage}
              totalItemsCount={totalCharacters}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              activeLinkClass="active"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
