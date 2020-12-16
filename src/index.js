import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class CreatePlayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            teamId: '',
            
        }
        this.handleSumbit = this.handleSumbit.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.handleTeamId = this.handleTeamId.bind(this)
    } 
    async handleSumbit(){
        const player = (await axios.post('/api/players',{ name: this.state.name , teamId: this.state.teamId} )).data
    }
    async handleUsername(ev){
        this.setState({
            name: ev.target.value
        })
    }
    async handleTeamId(ev){
        this.setState({
            teamId: ev.target.value
        })
    }
    render(){
        const {name, age , bio } = this.state;
        return (
            <form onSubmit= {this.handleSumbit}>
                <div>
                <label>
                    enter player name
                </label>
                <input type = 'text' 
                value ={this.state.name}
                 onChange ={this.handleUsername} /> 
                 </div>
                 <div>
                <label>
                    enter team id 
                </label>
                <input type = 'text' 
                value ={this.state.teamId}
                 onChange ={this.handleTeamId} /> 
                 </div>
                 <button type='submit'>Create Player</button>
            </form>
        )
    }
}
class Player extends React.Component{
    constructor(){
        super();
        this.state = {
        team: [],
        loading: true
        };

        this.handleDelete = this.handleDelete.bind(this);
    } 
   async componentDidMount(){
    this.setState({
        team: (await axios.get(`/api/team/${this.props.teamId}`)).data,
        loading: false
        
    });
}
    async handleDelete(id){
        await axios.delete(`/api/players/${id}`);

        this.setState({
            team: (await axios.get('/api/team')).data,
            loading: false
        })
    }
    
    render(){
        const { team, loading } = this.state
        //console.log(team.players)
        // data = Array.from(players.data);
        if(!loading){
        return (
            <div>
                <CreatePlayer />
                <a href='#'> ALL TEAMS</a>
                <p> 'current players'</p>
                <p> {team.name}</p>
                <ul>
        {   
               team.players.map( player => {
                   return(
                   <div key ={ player.id }>
                   <li> 
                    <p> {player.name}</p>
                    <button onClick={()=> this.handleDelete(player.id)}>x</button>
                   </li> 
                   </div>
                   )
               })
           
        }
      </ul>
            </div>
            )
    }
    return (
        <hr />
    )
}

}
const Teams = ({ team }) => {
    // console.log(team)
    return(
        <div>
            <h1 > Click On A Team To See Star Players</h1>
            <ul>
        {
        team.map( team => { 
            return (
            <li key={ team.id }>
                <a href= {`#${team.id}`}> {team.team} </a>
                <a > <img src= {team.imgURL} /> </a>
            </li>
            );
        })
        }
      </ul>
        </div>
    )
}
class App extends Component{
  constructor(){
    super();
    this.state = {
      team: [],
      loading: true,
      teamId: '',
    };
//     this.handleClickPlayers = this.handleClickPlayers.bind(this)
 }
  async componentDidMount(){
    this.setState({
      team: (await axios.get('/api/team')).data,
      loading: false
    })
    window.addEventListener('hashchange', () => {
        this.setState({ teamId: window.location.hash.slice(1)})
    });
    this.setState({ teamId: window.location.hash.slice(1)})
  };
//   async handleClickPlayers(){
//       this.setState({
//           players: (await axios.get('/api/player')).data,
//           loading: false
//       });
//   }
  render(){
    const { team, loading, teamId } = this.state;
    console.log(teamId)
    if(loading){
      return '....loading';
    }
    return (
        <div>
          { teamId ? <Player teamId={ teamId } /> : <Teams team = {team} />
          }
      </div>
    );
  }
}
render(<App />, document.querySelector('#root'));
// team.map( team => { 
//     return (
//       <li key={ team.id }>
//         <div> {team.team} </div>
//         <img src= {team.imgURL} />
//       </li>
//     );
//   })
//   async componentDidMount(){
//     this.setState({
//       team: (await axios.get('/api/team')).data,
//       loading: false
//     });
//   };
// async componentDidMount(){
//     this.setState({
//         players: (await axios.get('/api/player')).data,
//         loading: false
//     });
// players.map( players => { 
//     return (
//       <li key={ players.id }>
//         <div> {players.name} </div>
//       </li>
//     );
//   })