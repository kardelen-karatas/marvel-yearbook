const Searchbar = (props) => {
  const handleNameChange = (event) => {
    props.setName(event.target.value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Marvel Character's Name"
        value={props.name}
        onChange={handleNameChange}
      />
      <img src="./search.svg"></img>
    </div>
  );
};

export default Searchbar;
