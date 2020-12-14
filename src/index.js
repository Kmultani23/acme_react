import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
class Player extends React.Component{
    constructor(){
        super();
        this.state = {
            players: []
        };
    } 
   async componentDidMount(){
    this.setState({
        players: (await axios.get(`/api/player/${this.props.playerId}`)).data,
        loading: false
    });
}
    render(){
        const { players } = this.state
        console.log(players)
        return (
            <div>
                <a href='#'> ALL TEAMS</a>
                <p> 'players go here'</p>
                <ul>
        {/* {
           players.map( player => { 
            return (
                
            <li key={ player.id }>
                {player.name}
            </li>
            );
        })
           
        
        } */}
      </ul>
            </div>
            
            )
    }

    
}
const Teams = ({ team }) => {
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
      playerId: '',
    };
//     this.handleClickPlayers = this.handleClickPlayers.bind(this)
 }
  
  async componentDidMount(){
    this.setState({
      team: (await axios.get('/api/team')).data,
      loading: false
    })
    window.addEventListener('hashchange', () => {
        this.setState({ playerId: window.location.hash.slice(1)})
    });
    this.setState({ playerId: window.location.hash.slice(1)})

  };

//   async handleClickPlayers(){
      
//       this.setState({
//           players: (await axios.get('/api/player')).data,
//           loading: false
//       });
//   }
  
  
  render(){
    const { team, loading, playerId } = this.state;
    console.log(playerId)
    if(loading){
      return '....loading';
    }
    return (
        <div>
          { playerId ? <Player /> : <Teams team = {team} />
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