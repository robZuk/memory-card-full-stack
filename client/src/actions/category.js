import axios from 'axios';
import { setAlert } from './alert';

import { ADD_CATEGORY, CATEGORY_ERROR } from './types';

// Add post
export const addCategory = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/categories`, formData, config);

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });

    dispatch(setAlert('Category Created', 'success'));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
