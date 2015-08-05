Signup = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      username: "",
      password: "",
      fullname: "",
    };
  },

  signUp(e) {
    e.preventDefault();

    let newUser = {
      username: this.state.username,
      password: this.state.password,
      profile: {fullname: this.state.fullname},
    };
    Accounts.createUser(
      newUser,
      (error) => {(error) && alert(error)}
    );
  },

  render() {
    return (
      <div>
        <h4>New User?</h4>
        <form onSubmit={this.signUp}>
          <div className="form-group">
            <input
              className="form-control input-sm"
              id="signup-username"
              placeholder="Username"
              valueLink={this.linkState('username')} />
            <input
              className="form-control input-sm"
              id="signup-fullname"
              placeholder="Full Name (Optional)"
              valueLink={this.linkState('fullname')} />
            <input
              className="form-control input-sm"
              id="signup-password"
              placeholder="Password"
              type="password"
              valueLink={this.linkState('password')}/>
          </div>

          <button
            type="submit"
            className="btn btn-info fullbutton"
            id="signup">
            Sign up
          </button>
        </form>
      </div>
    );
  }

});
