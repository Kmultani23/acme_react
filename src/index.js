import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';


class Player extends React.Component{
    constructor(){
        super();
        this.state = {
        team: []
        };
    } 
   async componentDidMount(){
    this.setState({
        team: (await axios.get(`/api/team/${this.props.teamId}`)).data,
        loading: false
        
    });
}
    render(){
        const { team } = this.state
        console.log(team.players)
        // data = Array.from(players.data);
        return (
            <div>
                <a href='#'> ALL TEAMS</a>
                <p> 'players go here'</p>
                <p> {team.name}</p>
                <ul>
        {
               team.players.map( player => {
                   return(
                   <div>
                   <li key ={ player.id }> 
                    <p> {player.name}</p>
                   </li> 
                   </div>
                   )
               })
           
        }
      </ul>
            </div>
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