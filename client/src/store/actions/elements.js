import { ADD_ELEMENT, SELECT_ELEMENT, EDIT_ELEMENT, SET_ELEMENTS, CLEAR_ELEMENTS } from './constants';
 
export const setElementsDispatcher = (payload) => ({
    type: SET_ELEMENTS,
    payload
});

export const setElements = pageId => async dispatch => {
    try {
        let response = await fetch(`${process.env.REACT_APP_API}/api/element/${pageId}`);
        let data = await response.json();
        if(response.status == 200){
            dispatch(setElementsDispatcher(data));
        }
    } catch( err ) {
        console.log(err)
    }
}

export const clearElements = () => ({
    type: CLEAR_ELEMENTS
});

export const addElementDispatcher = (payload) => ({
    type: ADD_ELEMENT,
    payload
});

export const addElement = (element) => async (dispatch, getState) => {
    let pageId = getState().selectedPage._id;
    console.log(pageId, element)
    try {
        let response = await fetch(`${process.env.REACT_APP_API}/api/element`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pageId, element })
          });
        console.log(response)
        let data = await response.json();
        if(response.status == 201){
            dispatch(addElementDispatcher(data));
        }
    } catch(err) {
        console.log(err);
    }
}

export const editElementDispatcher = (payload) => ({
    type: EDIT_ELEMENT,
    payload
});

export const editElement = (element) => async (dispatch, getState) => {
    let pageId = getState().selectedPage._id;
    try {
        let response = await fetch(`${process.env.REACT_APP_API}/api/element/edit/${element._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pageId, element})
        });
        console.log(response)
        let data = await response.json();
        if(response.status == 200){
            dispatch(editElementDispatcher(data));
        }
    } catch(err) {
        console.log(err);
    }
}

export const selectElementDispatcher = (payload) => ({
    type: SELECT_ELEMENT,
    payload
});