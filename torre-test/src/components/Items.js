import React from "react";
class Items extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render (){    
        return(
        <div className="card-connection">
            <img src={this.props.picture ? this.props.picture : 'placeholder'} alt={this.props.name}/>
            <a href={`https://bio.torre.co/${this.props.id}`} target="_blank" rel="noopener noreferrer"><h2 className="connection-name">{this.props.name}</h2></a>
            <h3 className="connection-name">{this.props.title}</h3>
            {this.props.strength ?<p>{this.props.strength.join(', ')}</p> : null}
        </div>
        )
    }
}

export default Items;