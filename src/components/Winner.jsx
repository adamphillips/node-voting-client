import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames'
import {classnameForEntry} from '../utilities';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="winner">
      <div className={classNames('container', classnameForEntry(this.props.winner))}>
        <h1>{this.props.winner} wins!</h1>
      </div>
    </div>;
  }
});
