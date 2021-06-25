import React, { Component } from 'react';
class Register extends Component{
  constructor() {
    super()
    this.state = {
      OnInputRegisterName: '',
      OnInputRegisterEmail: '',
      OnInputRegisterPassword: ''
    }
  }

  OnInputRegisterName = (event) =>{
    this.setState({ OnInputRegisterName: event.target.value})
  }
  
  OnInputRegisterEmail =(event) =>{
    this.setState({ OnInputRegisterEmail: event.target.value})
  }

  OnInputRegisterPassword =(event) =>{
    this.setState({ OnInputRegisterPassword: event.target.value})
  }

  OnSubmitRegister = () => {
    fetch('https://stark-reaches-72090.herokuapp.com/register' , 
    {
      method: 'post',
      headers : { 
      'Content-Type': 'application/json'},
      // 'Accept': 'application/json' --> // line added as I was getting an error saying 'Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0'
      body: JSON.stringify({
        name: this.state.OnInputRegisterName,
        email: this.state.OnInputRegisterEmail,
        password: this.state.OnInputRegisterPassword
      })
    }).then(response => response.json())
    .then(user => {
      if (user.id){
        this.props.loaduser(user);
        this.props.onroutechange("homepage");
      }
    })
  }
  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90"    // ask someone why do u have to keep the width here as 'w-90' even when it is the same a email and password
                    type="name"
                    name="name"
                    id="name"
                    onChange={ this.OnInputRegisterName }
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={ this.OnInputRegisterEmail }
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password1"
                    onChange={ this.OnInputRegisterPassword }
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={ this.OnSubmitRegister }
                  className="mt2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br-pill"
                  type="submit"
                  value="Register"
                />
              </div>
              
            </div>
          </main>
        </article>
    );
  } 
}

export default Register;


