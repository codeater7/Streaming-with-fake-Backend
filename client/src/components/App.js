import React from 'react';
//React router cares only what is after the domin and port Definition.
import { Router, Route } from 'react-router-dom';
import StreamList from './Streams/StreamList';
import StreamCreate from './Streams/StreamCreate';
import StreamDelete from './Streams/StreamDelete';
import StreamEdit from './Streams/StreamEdit';
import StreamShow from './Streams/StreamShow';
import Header from './Header';
import history from '../history'

const App = () => {
	return (
		<div className= 'ui container'>
			{/* creating own history object */}
			<Router history={history}>
				<div>
                <Header/>
					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" exact component={StreamCreate} />
					{/* : is imp */}
					<Route path="/streams/edit/:id" exact component={StreamEdit} />
					<Route path="/streams/delete/:id" exact component={StreamDelete} />
					<Route path="/streams/show" exact component={StreamShow} />
				</div>
			</Router>
		</div>
	);
};
export default App;
