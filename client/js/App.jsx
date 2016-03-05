const MAX_LENGTH = 140;

// App component - represents the whole app
App = React.createClass({

  // For two-way binding state variable with tweet text
  mixins: [ReactMeteorData, React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      tweetText: "",
    };
  },

  getMeteorData() {
    let data = {
      currentUser: null,
      tweets: null,
      following: null,
      followers: null,
    };
    if (Meteor.user()) {

      const subHandles = [
        Meteor.subscribe('followings', Meteor.user().username),
        Meteor.subscribe('followers', Meteor.user().username),
        Meteor.subscribe('tweets', Meteor.user().username)
      ];
      const subsReady = _.all(subHandles, function (handle) {
        return handle.ready();
      });

      if (subsReady) {
        data.currentUser = Meteor.user();
        data.tweets =  Tweets.find({ user: Meteor.user().username }).count();
        data.following = Relationships.find({ follower: Meteor.user().username }).count();
        data.followers = Relationships.find({ following: Meteor.user().username }).count();
      }
    }
    return data;
  },

  submitTweet() {
    Meteor.call('insertTweet', this.state.tweetText, (err, res) => {
      (err) && console.log(error);
    });
    this.setState({tweetText: ""});
  },

  logOutUser() {
    Meteor.logout();
  },

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-xs-4">

          <div className="user-container">
            <div className="panel panel-default userBox">
              <div className="panel-body">
                {
                  this.data.currentUser ?
                  //Message for logged in user
                  <div>
                    <p>Hello <strong>{this.data.currentUser.username}</strong>,
                      Welcome to Panorama, the 360&deg; social network</p>
                    <button
                      type="button"
                      className="btn btn-info fullbutton"
                      id="logout"
                      onClick={this.logOutUser}>
                      Log out
                    </button>

                    <table className="table">
                      <tr>
                        <td className="tableHeader">Tweets</td>
                        <td className="tableHeader">Following</td>
                        <td className="tableHeader">Followers</td>
                      </tr>
                      <tr>
                        <td className="tableContent">{this.data.tweets}</td>
                        <td className="tableContent">{this.data.following}</td>
                        <td className="tableContent">{this.data.followers}</td>
                      </tr>
                    </table>

                  </div>
                  :
                  <div>
                    <Login />
                    <Signup />
                  </div>
                }
              </div>
            </div>
          </div>

          { this.data.currentUser ? <FollowUsers /> : "" }

        </div>
        <div className="col-md-8 col-xs-8">
          <div className="tweetbox-container">
            <div className="panel panel-default tweetbox">
              <div className="panel-body">
                {/* Text box for tweet content */}
                <textarea
                  ref="textarea"
                  id="tweetText"
                  className="form-control"
                  placeholder="What's happening?"
                  rows="3"
                  valueLink={this.linkState('tweetText')}></textarea>
                {/* Character count & button */}
                <div className="pull-right btnGroup">
                  <strong className={ (this.state.tweetText.length > MAX_LENGTH) ? "errCharCount" : "charCount" }>
                    { MAX_LENGTH - this.state.tweetText.length }
                  </strong>
                  <button
                    className="btn btn-info pull-right"
                    type="button"
                    onClick={ this.submitTweet }
                    disabled={ (!this.data.currentUser || this.state.tweetText.length <= 0 || this.state.tweetText.length > MAX_LENGTH) ? true : false }>
                    { this.data.currentUser ? "Tweet" : "Please Log In" }
                  </button>
                </div>
              </div>
            </div>
          </div>
          { this.data.currentUser ? <TweetFeed /> : ""}
        </div>
      </div>
    );
  }
});

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  React.render(<App />, document.getElementById("app"));
});
