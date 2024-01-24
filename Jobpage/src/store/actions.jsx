// /store/actions.jsx

export const fetchData = (searchQuery) => async (dispatch) => {
  try {
    const response = await fetch(`https://strive-benchmark.herokuapp.com/api/jobs?search=${searchQuery}&limit=20`);
    if (response.ok) {
      const { data } = await response.json();
      dispatch(setJobs(data));
    } else {
      console.error('Error fetching results');
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchCompanyJobs = (company) => async (dispatch) => {
  try {
    console.log(`Fetching jobs for company: ${company}`);
    const response = await fetch(`https://strive-benchmark.herokuapp.com/api/jobs?company=${company}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`Jobs fetched successfully: ${JSON.stringify(data)}`);
      dispatch(setCompanyJobs(data));
    } else {
      console.error('Error fetching results');
    }
  } catch (error) {
    console.error(error);
  }
};
export const addToFavorites = (companyName) => {
  return {
    type: 'ADD_TO_FAVORITES',
    payload: companyName,
  };
};

export const removeFromFavorites = (companyName) => {
  return {
    type: 'REMOVE_FROM_FAVORITES',
    payload: companyName,
  };
};

export const setJobs = (jobs) => ({
  type: 'SET_JOBS',
  payload: jobs,
});

export const setCompanyJobs = (companyJobs) => ({
  type: 'SET_COMPANY_JOBS',
  payload: companyJobs,
});

export const setFavoriteJobs = (favoriteJobs) => ({
  type: 'SET_FAVORITE_JOBS',
  payload: favoriteJobs,
});
