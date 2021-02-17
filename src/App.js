// npm modules
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

// internal modules
import { marvelCharactersApi } from "./api/marvelApi";

// stylesheets
import "./App.scss";

function App() {
  const maxCharactersInPage = 8; // max number of marvel characters to display in a single request
  const [characters, setCharacters] = useState([]); // list of marvel characters 
  const [totalCharacters, setTotalCharacters] = useState(0); // total number of marvel characters in marvel api
  const [name, setName] = useState(""); // searched name of marvel character
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);

  useEffect(() => {
    let params = { 
      limit: maxCharactersInPage,
      offset: currentPage * maxCharactersInPage 
    };

    // check if there is a search input for the character's name
    if(name) params.nameStartsWith = name
     
    // call marvel api with given parameters
    marvelCharactersApi(params)
      .then((response) => {
        setTotalCharacters(response.data.total);
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, [loading, name]);


  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="App">
      {error ? (
        <h1>SOMETHING WENT WRONG. PLEASE TRY TO RELOAD YOUR PAGE!</h1>
      ) : loading ? (
        <div className="loading">
          <img src="./loading.gif" alt="loading"></img>
          <h1>COMING SOON ... </h1>
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
          <div className="pagination">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={maxCharactersInPage}
              totalItemsCount={totalCharacters - maxCharactersInPage}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              activeLinkClass="active"
              hideDisabled={true}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
