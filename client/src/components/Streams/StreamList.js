import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import {Link} from 'react-router-dom'

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
    }
    
    renderAdmin(stream){
        if (stream.userId ===this.props.currentUserId){
            return (
                <div className= "right floated content">
                 <Link  to ={ `/streams/edit/${stream.id}`} className="ui button primary">Edit </Link>

                <Link to = {`/streams/delete/${stream.id}`} className= "ui button negative"> Delete</Link>
                </div>
            )
        }
    }

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>

                    {this.renderAdmin(stream)}

					<i className="large middle aligned icon camera" />

					<div className="content">
						{stream.title}
						<div className="description"> {stream.description}</div>

					</div>
                    
				</div>
			);
		});
    }
    
    renderCreateButtonForSignedInUser ( ){
        if (this.props.isSignedIn){
            return (<div style= {{textAlign:"right"}} > 
                <Link to="/streams/new" className="ui button primary">Create Stream</Link>
            </div>)
        }

    }
	render() {
		console.log('from the StreamList', this.props.streams);
		return (
			<div clasName="ui container">
				<h2>Streams</h2>
				<div className="ui celled list"> {this.renderList()}</div>

                {this.renderCreateButtonForSignedInUser()}
			</div>
		);
	}
}
const mapStateToProps = state => {
    return { 
        // how Object.values??
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn:state.auth.isSignedIn};
};
export default connect(
	mapStateToProps,
	{ fetchStreams }
)(StreamList);
