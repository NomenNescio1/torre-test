import React from "react";
class Items extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render (){    
        return(
        <div className="connection-card">
            <img className="connection-image" src={this.props.picture ? this.props.picture : 'placeholder'} alt={this.props.name}/>
            <a className="connection-link" href={`https://bio.torre.co/${this.props.id}`} target="_blank" rel="noopener noreferrer"><h2 className="connection-name">{this.props.name}</h2></a>
            <h3 className="connection-title">{this.props.title}</h3>
            {this.props.strength ?<p className="connection-strengths"><b>Top Strengths: </b>{this.props.strength.slice(1, 5).join(', ')}</p> : <p>N/A</p>}
        </div>
        )
    }
}

export default Items;