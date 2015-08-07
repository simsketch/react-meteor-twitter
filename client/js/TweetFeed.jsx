TweetFeed = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {tweetFeed: []};
    if (Meteor.user()) {
      const subHandles = [
        Meteor.subscribe('tweets', Meteor.user().username),
        Meteor.subscribe('ownTweets', Meteor.user().username),
      ];
      const subsReady = _.all(subHandles, function (handle) {
        return handle.ready();
      });

      if (subsReady) {
        data.tweetFeed = Tweets.find({}, {sort: {timestamp: -1}, limit: 10})
      }
    }
    return data;
  },

  render() {
    return (
      <div className="tweetfeed-container">
        <div className="panel panel-default tweetfeed">
          <div className="panel-body">

            {/* Text box for tweet content */
              this.data.tweetFeed.map((tweet) => {
                return (
                  <div key={tweet._id} className="panel panel-info">
                    <div className="panel-heading">
                      <h3 className="panel-title">@{tweet.user}
                        <span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
                        {tweet.timestamp ? tweet.timestamp.toString() : ""}
                      </h3>
                    </div>
                    <div className="panel-body">
                      {tweet.message}
                    </div>
                  </div>);
                })
              }

          </div>
        </div>
      </div>
    );
  }

});
