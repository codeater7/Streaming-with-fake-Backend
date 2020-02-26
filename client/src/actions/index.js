import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, EDIT_STREAM, FETCH_STREAM, DELETE_STREAM } from './types';

export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};


export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;

	// latter part is going to be added, here formvalues and userId
	const response = await streams.post('/streams', { ...formValues, userId });

	// After we get the action, we are going to dispatch an action with type and payload

	dispatch({
		//why data? upon response from axios, respose object has ton of info about response but we only care about the stuff
		//made inside the request.

		type: CREATE_STREAM,
		payload: response.data,
	});

    // what do we do after going there?? redirect, this is called programmatic navigation
	history.push('/');
};

export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams');

	dispatch({
		type: FETCH_STREAMS,
		payload: response.data,
	});
};

export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`);

	dispatch({
		type: FETCH_STREAM,
		payload: response.data,
	});
};

// update ko lagi chai we need to pass in the parameter which we are going and also the thing we need to put in there

export const editStream = (id, formValues) => async dispatch => {

    // patch vs put; put for wholoshale, patch for only few
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({
		type: EDIT_STREAM,
		payload: response.data,
    });
    history.push('/')
};

export const deleteStream = id => async dispatch => {
	// const response = empty
	await streams.delete(`/streams/${id}`);

	dispatch({
		type: DELETE_STREAM,
		//only here is the id 
		payload: id,
	});
	history.push('/');
};


// Post Request with axios

// this is going to be called with list of all the values we listed in out form as an argument
//Everytime we are going to make async. action createor, we need to use Redux-thunk
// So steps:
// ARROW function from action creator=> first argument is dispatch function
// inner function will have to call async await o
// export const createStream = formValues => {
// 	return dispatch => {};
// };

// we need to put all the form values there