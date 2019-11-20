import React from "react";
import axios from "axios";
import Items from './Items'
class Connections extends React.Component {

    usernameRef = React.createRef();
    constructor(props){
        super(props);
        this.state  ={
          connections: [],
          error: '', 
          topInterest : ''
        }
    }
    
    getConnections = (e) =>{
        //using a middleware to test endpoints without CORS blocking
        let apiBaseEndpoint = `https://cors-anywhere.herokuapp.com/bio.torre.co/api/`;
        e.preventDefault();
        axios.get(`${apiBaseEndpoint}bios/${this.usernameRef.current.value}`).then(response =>{
            this.setState ({
                topInterest: response.data.interests[0].name
            })
        })
        axios.get(`${apiBaseEndpoint}people/${this.usernameRef.current.value}/connections?limit=5`)
    .then(response => {
        this.usernameRef.current.value = '';
        // handle success
        //map connections publicId
        let res = response.data.map((item) => {
            return item.person.publicId;
        });
        //map connections publicIds into a GETable axios endpoint
        let urlBio = res.map((item)=>{
            return axios.get(`${apiBaseEndpoint}bios/` + item)
        });
        //GET user connection's bios
        axios.all([...urlBio]).then(axios.spread((...responses) => {
            // use/access the results 
            let connectionsStrengths = responses.map((item)=>{
                return item.data.strengths;
            })
            let el = connectionsStrengths.map((item, index) =>{
                return item[index].name;
            })
            console.log(el);
            let connectionsPerson = responses.map((item)=>{
                return item.data.person;
            })
            connectionsPerson.forEach( (item, index) =>{
                item.strengths = el[index];
            })            

            this.setState ({
                error: null,
                connections: connectionsPerson
            })
                        
          })).catch(errors => {
            this.setState({
                error: errors
            })
            // react on errors.
            console.log(errors);
          })
    })
    .catch(error => {
        // handle error
        this.usernameRef.current.value = '';
        this.setState({
            error: error
        })
        console.log(error);
    })
    }

render (){
    return (<div className="content">
        <h1>Match your interests with your Torre connections strengths.</h1>
        <br/>
        <h4>Input your username to get started</h4>
        <form onSubmit={this.getConnections}>
            <input ref={this.usernameRef} type="text" name="username" id=""/> 
            <input type="submit" value="Go"/>
        </form>
        <h6>You can find your username here</h6>
        <div className="connections-container">
            {this.state.error ? <p>User not found. Try again?</p>: null}
            {this.state.topInterest ? <p>Your top interest is: {this.state.topInterest} </p> : null}
            {this.state.connections.map(item => <Items key={item.publicId} id={item.publicId} title={item.professionalHeadline} name={item.name} picture={item.picture} strengths={item.strengths} interest={this.state.topInterest}></Items>)}
        </div>
    </div>)
    }
}
export default Connections;