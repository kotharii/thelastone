import React, { Component } from 'react';
class Signin extends Component {
  constructor() {
    super()
    this.state = {
      OnInputSignInEmail: '',
      OnInputSignInPassword: ''
    }
  }
  
  OnInputSignInEmail =(event) =>{
    this.setState({ OnInputSignInEmail: event.target.value})
  }

  OnInputSignInPassword =(event) =>{
    this.setState({ OnInputSignInPassword: event.target.value})
  }

  OnSubmitSignIn = () => {
    fetch( 'https://vast-coast-11346.herokuapp.com/signin' , {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.OnInputSignInEmail,
        password: this.state.OnInputSignInPassword
      })
    }).then(response => response.json())
    .then(user => 
      {
      if (user.id){
        this.props.loaduser(user);
        this.props.onroutechange("homepage");
      }
      else{
        this.props.onroutechange("signinpage");
        alert('you have entered the wrong email/password, try again!');
      }
    })
    
  }

  render() {
    const { onroutechange } = this.props;
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange= { this.OnInputSignInEmail }
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange= { this.OnInputSignInPassword }
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={ this.OnSubmitSignIn }
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br-pill"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p 
              onClick={() => onroutechange('registrationpage')}
              className="f6 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
    </article>
  );
}
}


export default Signin;


