import React from "react";
class Items extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render (){    
        return(
        <div>hola {this.props.name}, strength {this.props.strengths}</div>
        )
    }
}

export default Items;