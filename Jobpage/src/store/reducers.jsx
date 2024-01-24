// /store/reducers.jsx

const initialState = {
  jobs: [],
  companyJobs: [],
  favorites: [],  // Inizializza con un array vuoto
  favoriteJobs: [],
};

const reducer = (state = initialState, action) => {
  console.log("Action:", action.type);

  switch (action.type) {
    case 'SET_JOBS':
      console.log("Setting jobs:", action.payload);
      return {
        ...state,
        jobs: action.payload,
      };

    case 'SET_COMPANY_JOBS':
      console.log("Setting company jobs:", action.payload);
      return {
        ...state,
        companyJobs: action.payload,
      };

    case 'ADD_TO_FAVORITES':
      console.log("Adding to favorites:", action.payload);
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case 'REMOVE_FROM_FAVORITES':
      console.log("Removing from favorites:", action.payload);
      return {
        ...state,
        favorites: state.favorites.filter((company) => company !== action.payload),
      };

    case 'SET_FAVORITE_JOBS':
      console.log("Setting favorite jobs:", action.payload);
      return {
        ...state,
        favoriteJobs: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
