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
          topInterest : '',
          userName: '',
          changeAlign: false
        }
    }
    
    getConnections = (e) =>{
        //using a middleware to test endpoints without CORS blocking
        let apiBaseEndpoint = `https://cors-anywhere.herokuapp.com/bio.torre.co/api/`;
        e.preventDefault();
        axios.get(`${apiBaseEndpoint}bios/${this.usernameRef.current.value}`).then(response =>{
            let userResponse = response.data;
            let interestsName = userResponse.interests.map((item)=>{
                return item.name
            })
            response.data.interests.length === 0 ? 
            this.setState ({
                error: 'no-interest',
                topInterest: '',
                connections: []
            }) : this.setState ({topInterest: interestsName});
        });
        axios.get(`${apiBaseEndpoint}people/${this.usernameRef.current.value}/connections?limit=6`).then(response => {
        this.usernameRef.current.value = '';
        // handle success
        //map connections publicId
        let res = response.data.map((item) => {
            return axios.get(`${apiBaseEndpoint}bios/` + item.person.publicId);
        });
        //map connections publicIds into a GETable axios endpoint
        // let urlBio = res.map((item)=>{
        //     return axios.get(`${apiBaseEndpoint}bios/` + item)
        // });
        //GET user connection's bios
        axios.all([...res]).then(axios.spread((...responses) => {
            // use/access the results 
            let connectionsStrengths = responses.map((item)=>{
                return item.data.strengths;
            })
            let strengthsName = connectionsStrengths.map((item) =>{
                return item.map((foo)=>{
                    return foo.name
                })
            })
            let connectionsPerson = responses.map((item)=>{
                return item.data.person;
            })
            connectionsPerson.forEach( (item, index) =>{
                item.strength = strengthsName[index];
            })
            this.setState ({
                error: null,
                connections: connectionsPerson,
                changeAlign: true
            })
                        
          })).catch(errors => {
            this.setState({
                error: 'not-connected',
                topInterest: '',
                connections: []
            })
            // react on errors.
            console.log(errors);
          })
    }).catch(error => {
        // handle error
        this.usernameRef.current.value = '';
        this.setState({
            error: 'not-found',
            topInterest: '',
            connections: []
            })
            console.log(error);
        })
    }
    matchInterests = (interests, strengths) =>{
        let matched = interests.includes(strengths[0])
        console.log(matched)
    }
    handleErrors = (error) =>{
        switch (error) {
            case "not-found":
                return <p>User not found. Try again?</p>
            case "not-connected":
                return <p>You don't have connections on your Torre profile.</p>
            case "no-interest":
                return <p>You don't have any interests set on your Torre profile.</p>        
            default:
                break;
        }
    }

render (){
    return (
    <div className={`content-wrapper ${this.state.changeAlign ? "dont-center-app": 'center-app'}`}>
        <div className="content">
            <h1>Match your interests with your Torre connections strengths.</h1>
            <br/>
            <form onSubmit={this.getConnections}>
                <input className="user-input" placeholder="Input your username to get started" ref={this.usernameRef} type="text" name="username" id=""/> 
                <input type="submit" value="GO"/>
            </form>
            <h6>You can find your username like this: bio.torre.co/username</h6>
            {this.handleErrors(this.state.error)}
            {this.state.topInterest ? <h3>Your top interests are: {this.state.topInterest.join(', ')} </h3> : ''}
            <div className="connection-container">            
                {this.state.connections.map(item => <Items key={item.publicId} id={item.publicId} title={item.professionalHeadline} name={item.name} picture={item.picture} strength={item.strength}></Items>)}
            </div>
        </div>
    </div>)
    }
}
export default Connections;