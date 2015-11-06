import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function resetVote(state) {
  const currentRound = state.getIn(['vote', 'round'])
  if ((state.getIn(['votedFor', 'round']) != currentRound)) {
    return state.remove('votedFor');
  } else {
    return state;
  }
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  const currentRound = state.getIn(['vote', 'round'])
  if (currentPair && currentPair.includes(entry)) {
    return state.set('votedFor', Map({
        entry: entry,
        round: currentRound
      })
    );
  } else {
    return state;
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));

  case 'VOTE':
    return vote(state, action.entry);
  }
  return state;
}
