import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js';
import Imagelinkform from './Components/Imagelinkform/Imagelinkform.js';
import Attempts from './Components/Attempts/Attempts.js';
import Particles from "react-particles-js";
import Facerecognition from './Components/Facerecognition/Facerecognition.js';
import Signin from './Components/Signin/Signin.js';
import Register from './Components/Register/Register.js';




const particleoptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  "interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse" //try "bubble" instead
        }
    }
}
}

// const particleoptions = {
//   "particles": {
//     "number": {
//         "value": 500,
//         "density": {
//             "enable": false
//         }
//     },
//     "size": {
//         "value": 4,
//         "random": true,
//         "anim": {
//             "speed": 4,
//             "size_min": 0.3
//         }
//     },
//     "line_linked": {
//         "enable": false
//     },
//     "move": {
//         "random": true,
//         "speed": 1,
//         "direction": "top",
//         "out_mode": "out"
//     }
//   },
//   "interactivity": {
//     "events": {
//         "onhover": {
//             "enable": true,
//             "mode": "bubble"// try writing remove' instead
//         },
//         "onclick": {
//             "enable": true,
//             "mode": "repulse"
//         }
//     },
//     "modes": {
//         "bubble": {
//             "distance": 250,
//             "duration": 2,
//             "size": 0,
//             "opacity": 0
//         },
//         "repulse": {
//             "distance": 400,
//             "duration": 4
//         }
//     }
//   }
// }
const initialstate = {
  input:'',
  imageURL:'',
  box: {},
  route:'registrationpage',
  issignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = initialstate;
  }

  loaduser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  oninputchange = (event) => {
    this.setState({input: event.target.value});
  }

  calculatefacebox = (response) =>{
    const clarifaiface = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('URLimage');
    const width = image.width;
    const height = image.height;
    return {
      leftline: clarifaiface.left_col * width,
      topline: clarifaiface.top_row * height,
      rightline: width - clarifaiface.right_col * width,
      bottomline: height - clarifaiface.bottom_row * height,      
    }
  }

  displayfacebox = (box) =>{
    this.setState({box: box});
  }
  onbuttonsubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('https://stark-reaches-72090.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())  
    .then(response => {
      if(response){
        fetch('https://stark-reaches-72090.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries : count}))
          })
          .catch(console.log)
      }
      this.displayfacebox(this.calculatefacebox(response))})
    .catch(err => console.log(err));
  }

  onroutechange = (route) => {
    if (route === 'homepage') {
      this.setState({issignedin: true})
    }
    else if (route === 'signoutpage'){
      this.setState(initialstate)
    }
    this.setState({route: route});
  }
  render(){
    const { issignedin, route, imageURL, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleoptions} 
        />
        <Navigation onroutechange={this.onroutechange} issignedin={issignedin}/>
        { route === 'homepage'? 
        <div>
            <Logo />
            <Attempts 
              username={ this.state.user.name } 
              userentries = { this.state.user.entries }
            />
            <Imagelinkform 
              oninputchange={this.oninputchange} 
              onbuttonsubmit={this.onbuttonsubmit}
            />
            <Facerecognition 
              imageURL={imageURL}
              box={box}
            />
          </div> 
          : ( 
            route === 'signinpage' ? 
            <Signin loaduser={this.loaduser} onroutechange={this.onroutechange}/>
          : <Register loaduser={this.loaduser} onroutechange={this.onroutechange}/>
            ) 
        }
      </div>
    );
  }
}

export default App;
