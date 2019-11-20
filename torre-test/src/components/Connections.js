import React from "react";
import axios from "axios";
class Connections extends React.Component {

    usernameRef = React.createRef();
    constructor(props){
        super(props);
        this.state  ={
          connections: []
        }
    }
    getConnections = (e) =>{
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/bio.torre.co/api/people/${this.usernameRef.current.value}/connections`)
    .then(response => {
        // handle success
        console.log(response);
        this.usernameRef.current.value = '';
        this.setState ({
            connections: response.data
        })
    })
    .catch(error => {
        // handle error
        console.log(error);
    })
    }

render (){
    return <div className="content">
        <h1>Match your interests with your Torre connections strengths.</h1>
        <br/>
        <h4>Input your username to get started</h4>
        <form onSubmit={this.getConnections}>
            <input ref={this.usernameRef} type="text" name="username" id=""/> 
            <input type="submit" value="Go"/>
        </form>
        <h6>You can find your username here</h6>
    </div>
    }
}
export default Connections;