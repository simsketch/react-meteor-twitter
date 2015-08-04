Tweets = new Meteor.Collection("tweets");

let MAX_LENGTH = 140;

// App component - represents the whole app
App = React.createClass({

  // For two-way binding state variable with tweet text
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      tweetText: "",
    };
  },

  submitTweet() {
    Tweets.insert({message: this.state.tweetText});
    this.setState({tweetText: ""});
  },

  render() {
    return (
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
                {this.state.tweetText.length}
              </strong>
              <button
                className="btn btn-info pull-right"
                type="button"
                onClick={ this.submitTweet }
                disabled={ (this.state.tweetText.length <= 0 || this.state.tweetText.length > MAX_LENGTH) ? true : false }>
                Tweet
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
});
