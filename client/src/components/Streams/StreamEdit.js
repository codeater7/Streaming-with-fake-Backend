import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm'

class StreamEdit extends React.Component {
	componentDidMount() {
		//this.props tala bata aako kura haru
		this.props.fetchStream(this.props.match.params.id);
    }
    onSubmit =(formValues)=>{
        // going to be used as callback for streamForm
        console.log("values being received in StreamEdit", formValues)

        //below is the action creator and we pass what is needed, the id and the formvalues
        this.props.editStream(this.props.match.params.id, formValues);

    }
	render() {
		console.log(this.props);
		if (!this.props.stream) {
			return <div> Loading...</div>;
		}
		return (<div>
                <h3> Edit a Stream</h3>
                {/* onSubmit call back */}
                {/* initialValues are special props, get only the things we need  */}
                {/* this.props.stream is an object with title and description property */}
                {/* with lodash {_.pick(this.props.stream, "title", "description")] */}
                <StreamForm  initialValues={{title:this.props.stream.title, description: this.props.stream.description}} onSubmit={this.onSubmit} />

            </div>)
	}
}
const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

// mapstatetoProps, actions creator, Ccomponent
export default connect(
	mapStateToProps,
	{ fetchStream, editStream }
)(StreamEdit);
