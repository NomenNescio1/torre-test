import React from "react";
class Items extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render (){    
        return(
        <div>hola {this.props.name}, strength {this.props.strength.map(item=>{return<p>{item}</p>})}</div>
        )
    }
}

export default Items;