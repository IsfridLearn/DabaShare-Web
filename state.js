// state.js - shared application state and cached UI references.
// appState stores dynamic values such as active user info and selected filters.
// ui stores references to commonly used DOM elements.
export const appState = {
  activeUser: null,
  priceFilter: 'all',
  activeConvIndex: 0,
};

export const ui = {
  courseSearch: null,
  uniFilter: null,
  chatInput: null,
  modalOverlays: null,
  modalCloseButtons: null,
};
