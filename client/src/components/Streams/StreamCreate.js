import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
	// we need to pass as the prop named onSubmit
	onSubmit = formValues => {
		this.props.createStream(formValues);
	};

	render() {
		return (
			<div>
				<h3> Create a StreamForm</h3>
				<StreamForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(
	null,
	{ createStream }
)(StreamCreate);
