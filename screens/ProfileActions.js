export const profileFetch = () => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/profile`)
        .on('value', (snapshot) => {
          dispatch({ type: PROFILE_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
  };
  
  export const profileSave = ({ firstName, lastName, email }) => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/profile`)
        .set({ firstName, lastName, email })
        .then(() => {
          dispatch({ type: PROFILE_SAVE_SUCCESS });
          Actions.profileEdit({ type: 'reset' });
        });
    };
  };
  
  export const profileUpdate = ({ prop, value }) => {
    return {
      type: PROFILE_UPDATE,
      payload: { prop, value }
    };
  };