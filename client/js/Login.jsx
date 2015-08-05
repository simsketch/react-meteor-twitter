Login = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      username: "",
      password: "",
    };
  },

  logIn(e) {
    e.preventDefault();

    Meteor.loginWithPassword(
      this.state.username,
      this.state.password,
      (error) => {
        (error) && alert(error);
      }
    );
  },

  render() {
    return (
      <div>
        <h4>Already have an account?</h4>
        <form onSubmit={this.logIn}>
          <div className="form-group">
            <input
              className="form-control input-sm"
              id="login-username"
              placeholder="Username"
              valueLink={this.linkState('username')} />
            <input
              className="form-control input-sm"
              id="login-password"
              placeholder="Password"
              type="password"
              valueLink={this.linkState('password')} />
          </div>

          <button
            type="submit"
            className="btn btn-info fullbutton login"
            id="login">
            Log in
          </button>
        </form>
      </div>
    );
  }

});
