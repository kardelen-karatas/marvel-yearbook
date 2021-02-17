import React from 'react'

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.character.thumbnail.path + "." + props.character.thumbnail.extension}></img>
      <h5>{props.character.name.toUpperCase()}</h5>
    </div>
  );
};

export default Card;
