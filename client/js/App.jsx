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
    return {
      currentUser: Meteor.user(),
    };
  },

  submitTweet() {
    if (Meteor.user()) {
      Tweets.insert({
        message: this.state.tweetText,
        user: Meteor.user().username,
      });
    }
    this.setState({tweetText: ""});
  },

  logOutUser() {
    Meteor.logout();
  },

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <div className="user-container">
            <div className="panel panel-default userBox">
              <div className="panel-body">
                {
                  this.data.currentUser ?
                  //Message for logged in user
                  <div>
                    <p>Hello <strong>{this.data.currentUser.username}</strong>,
                      welcome to twitterClone</p>
                    <button
                      type="button"
                      className="btn btn-info fullbutton"
                      id="logout"
                      onClick={this.logOutUser}>
                      Log out
                    </button>
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
        </div>
        <div className="col-md-8 col-sm-8">
          <div className="tweetbox-container">
            <div className="panel panel-default tweetbox col-md-6">
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
        </div>
      </div>
    );
  }
});

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  React.render(<App />, document.getElementById("app"));
});
