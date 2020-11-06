import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const particleOptions = {
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.2,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 160,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 50,
    },
    opacity: {
      value: 0.5,
    },
  },
}

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.fullname,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateBoxes = (data) => {
    const boxes_ratio = data.map((region)=>{
      return region['region_info']['bounding_box']
    })
    const input_image = document.getElementById('inputimage')
    const width = Number(input_image.width);
    const height = Number(input_image.height);
    const boxes_coord = boxes_ratio.map((box_ratio) => {
      return {
        left: box_ratio['left_col'] * width,
        right: (1 - box_ratio['right_col']) * width,
        top: box_ratio['top_row'] * height,
        bottom: (1 - box_ratio['bottom_row']) * height
      }
    })
    // console.log(boxes_coord);
    this.setState({boxes: boxes_coord});
  }

  onRouteChange = (routename) => {
    if (routename === 'signin') {
      this.setState(initialState);
    } else if (routename === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: routename});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    // console.log(event.target.value)
  }

  onButtonSubmit = () => {
    // console.log('click')
    this.setState({imageURL: this.state.input})
    fetch('https://magicai.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        imageURL: this.state.input
      })
    }).then(resp => resp.json())
      .then(response => {
        if (response) {
          fetch('https://magicai.herokuapp.com/image', {
            method: 'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          }).then(resp => resp.json())
          .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
          .catch(console.log)
        }
        return response['outputs'][0]['data']['regions']})
      .then(data => this.calculateBoxes(data))
      .catch(err => console.log(err))
  }
  
  render() {
    const {imageURL, boxes, route, isSignedIn} = this.state
    return (
      <div className="App">
          <Particles className='particles' params={particleOptions}/>
          <Navigation onRouterChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          { route === 'home'
          ? <div>
              <Logo />
              <Rank username={this.state.user.name} userentries={this.state.user.entries}/>
              <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageURL={imageURL} boxes={boxes}/>
            </div>
          :  route === 'signin'
            ? <SignIn onSignInClick={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRegisterClick={this.onRouteChange} loadUser={this.loadUser}/>
          }
      </div>
    );
  }
}

export default App;
