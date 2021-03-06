import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames'
import {classnameForEntry} from '../utilities';

export default React.createClass({
  mixins: [PureRenderMixin],

  getPair: function() {
    return this.props.pair || [];
  },
  isDisabled: function() {
    return !!this.props.hasVoted;
  },
  hasVotedFor: function(entry) {
    return this.props.hasVoted === entry;
  },
  hasNotVotedFor: function(entry) {
    return (this.props.hasVoted && !this.hasVotedFor(entry));
  },
  render: function() {
    return <div className="voting">
      <p className="round">
        <span className="label">Round</span>
        {this.props.round}
      </p>
      {this.getPair().map(entry =>
        <button key={entry}
                className={classNames(classnameForEntry(entry), {voted: this.hasVotedFor(entry), notvoted: this.hasNotVotedFor(entry)})}
                disabled={this.isDisabled()}
                onClick={() => this.props.vote(entry)}>
          <div className="entry">{entry}</div>
          {this.hasVotedFor(entry) ?
            <div className="label">Voted</div> :
            null}
        </button>
      )}
      <p className="vs">
        vs
      </p>
    </div>;
  }
});
