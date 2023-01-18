import React, {useReducer} from 'react';

const initialState = {
  owner: 'angular',
  repo: 'angular-cli',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_DATA':
      return {
        ...state,
        issue: action.issue,
      };

    default:
      return state;
  }
}

const useIssueStore = () => {
  const state = useReducer(reducer, initialState);

  return state;
};
export default useIssueStore;

export const IssueDispatch = React.createContext(null);
