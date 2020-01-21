import React from "react";

const Items = (props) => {  
        return(
        <div className="connection-card">
            <img className="connection-image" src={props.picture ? props.picture : 'not-found.png'} alt={props.name}/>
            <a className="connection-link" href={`https://bio.torre.co/${props.id}`} target="_blank" rel="noopener noreferrer"><h2 className="connection-name">{props.name}</h2></a>
            <h3 className="connection-title">{props.title}</h3>
            {props.strength.length === 0 ? <p>{props.name.replace(/ .*/,'')} doesn't have strengths set on their Torre profile.</p> : <p className="connection-strengths"><b>Top Strengths: </b>{props.strength.slice(0, 4).join(', ')}</p>}
        </div>
        )
}

export default Items;