FollowUsers = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      searchText: "",
      foundUser: null,
      recommendedUsers: [],
    };
  },

  componentDidMount() {
    Meteor.call('recommendUsers', (err, res) => {
      (err) && console.log(error);
      (res) && this.setState({ recommendedUsers: res});
    });
  },

  findUser(e) {
    e.preventDefault();

    Meteor.call('findUser', this.state.searchText, (err, res) => {
      (err) && alert(error);
      (res) && this.setState({foundUser: res});
    });
  },

  followUser(_user) {
    Meteor.call('followUser', _user, (err, res) => {
      (err) && console.log(error);
    });
  },

  render() {
    return (
      <div className="follow-container">
        <div className="panel panel-default followBox">
          <div className="panel-body">

            {/* Input box for user to follow */}
            <form className="form-inline" onSubmit={this.findUser}>
              <input
                type="text"
                className="form-control"
                id="searchUser"
                placeholder="Search for user"
                valueLink={this.linkState('searchText')} />
              &nbsp;
              <button type="submit" className="btn btn-info">Search</button>
            </form>

            {/* Display box found through search */}
            { (this.state.foundUser) ?
              <div className="found-user">
                <button
                  type="button"
                  className="btn btn-default"
                  id="follow"
                  onClick={this.followUser.bind(this, this.state.foundUser)}>
                  Follow @{this.state.foundUser.username}</button>
              </div> : "" }

            {/* List of people to follow */}
            <div className="recommend-users">
              <h5>Who to follow:</h5>
              { this.state.recommendedUsers.map( (recUser, idx) => {
                return (
                  <p key={idx}>
                    <button
                      type="button"
                      className="btn btn-default"
                      id="followRec"
                      onClick={this.followUser.bind(this, recUser)}>
                      Follow @{recUser.username}
                    </button>
                  </p>);
                })
              }
            </div>

          </div>
        </div>
      </div>
    );
  }

});
