import React from "react";
import axios from "axios";
class Connections extends React.Component {

    usernameRef = React.createRef();
    constructor(props){
        super(props);
        this.state  ={
          connections: [],
          error: ''
        }
    }
    
    getConnections = (e) =>{
        let apiBaseEndpoint = `https://cors-anywhere.herokuapp.com/bio.torre.co/api/`;
        e.preventDefault();
        axios.get(`${apiBaseEndpoint}people/${this.usernameRef.current.value}/connections`)
    .then(response => {
        // handle success
        //console.log(response.data[0].person.publicId);        
        let res = response.data.map((item) => {
            return item.person.publicId;
        });

        this.usernameRef.current.value = '';
        this.setState ({
            error: null,
            connections: res
        })
        let urlBio = res.map((item)=>{
            return `${apiBaseEndpoint}bios/` + item
        });
        console.log(urlBio);
    })
    .catch(error => {
        // handle error
        this.usernameRef.current.value = '';
        this.setState({
            error: error.isAxiosError
        })
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
        <div className="connections-container">
            <p>{this.state.error ? 'User not found. Try again?' : ''}</p>
        </div>
    </div>
    }
}
export default Connections;