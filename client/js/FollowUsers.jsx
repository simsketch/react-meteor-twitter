FollowUsers = React.createClass({

  mixins: [ReactMeteorData, React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      searchText: "",
      foundUser: null,
    };
  },

  getMeteorData() {
    let data = {recommendedUsers: []};
    if (Meteor.user()) {

      const subHandles = [
        Meteor.subscribe('users', Meteor.user().username),
        Meteor.subscribe('followings', Meteor.user().username),
      ];
      const subsReady = _.all(subHandles, function (handle) {
        return handle.ready();
      });

      if ( subsReady && Meteor.user() ) {
        let currentFollowings = UserUtils.findFollowings(Meteor.user().username);

        data.recommendedUsers = Meteor.users.find({
          username: {
            $nin: currentFollowings
          }
        }, {
          fields: { 'username': 1 },
          limit: 5
        }).fetch();
      }
    }
    return data;
  },

  findUser(e) {
    e.preventDefault();

    Meteor.call('findUser', this.state.searchText, (err, res) => {
      (err) && alert(err);
      (res) && this.setState({foundUser: res});
    });
  },

  followUser(_user) {
    Meteor.call('followUser', _user.username, (err, res) => {
      (err) && console.log(err);
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
              { this.data.recommendedUsers.map( (recUser) => {
                return (
                  <p key={recUser._id}>
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
