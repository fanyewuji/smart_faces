import React, {Component} from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signinEmail:'',
            signinPassword:''
        }
    }

    onEmailChange = (event) => {
        this.setState({signinEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch('https://magicai.herokuapp.com/signin', {
            method: 'post',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        }).then (resp => resp.json())
        .then( user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onSignInClick('home');
            } else {
                alert('error signing in')
            }
        })
    }

    render () {
        const { onSignInClick } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-70-m w-25-l mw7 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Welcome to Fan's Magic</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
                            onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
                            onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn}/>
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" className="f5 link dim black db pointer" 
                            onClick={() => onSignInClick('register')}>Register</a>
                        </div>
                    </div>
                </main>
            </article>  
        );
    }
}

export default SignIn;