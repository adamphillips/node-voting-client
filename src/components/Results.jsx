import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import classNames from 'classnames'
import * as actionCreators from '../action_creators';
import {classnameForEntry} from '../utilities';

export const Results = React.createClass({
  mixins: [PureRenderMixin],

  getPair: function() {
    return this.props.pair || [];
  },

  getVotes: function(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },

  getMaxVotes: function() {
    const voteCounts = this.getPair()
                       .map(entry => this.getVotes(entry))
                       .toJS();
    return Math.max(...voteCounts);
  },

  getVotesBlockWidth: function(entry) {
    return (this.getVotesRatio(entry) * 100) + '%';
  },

  getVotesOpacity: function(entry) {
    return (this.getVotesRatio(entry) / 2) + 0.5;
  },

  getVotesRatio: function(entry) {
    return this.getVotes(entry) / this.getMaxVotes();
  },

  render: function() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="tally">
        {this.getPair().map(entry =>
          <div key={entry} className="entry">
            <span className={classNames('thumbnail', classnameForEntry(entry))}></span>
            <h1>{entry}</h1>
            <div className="voteVisualization">
              <div className="votesBlock"
                   style={{
                      width: this.getVotesBlockWidth(entry),
                      opacity: this.getVotesOpacity(entry)
                    }}>
              </div>
            </div>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
      <div className="management">
        <button ref="next"
                className="next"
                onClick={this.props.next}>
          Next
        </button>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
