import axios from "axios";
import { setAlert } from "./alert";

import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
  ADD_CARD,
  DELETE_CARD,
} from "./types";

// Get categories
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/categories");

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add category
export const addCategory = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/categories`, formData, config);

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });

    dispatch(setAlert("Category Created", "green"));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get category by id
export const getCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/categories/${id}`);

    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete category
export const deleteCategory = (id) => async (dispatch) => {
  if (window.confirm("Delete category? This can NOT be undone"))
    try {
      await axios.delete(`/api/categories/${id}`);

      dispatch({
        type: DELETE_CATEGORY,
        payload: id,
      });

      dispatch(setAlert("Category Removed", "green"));
    } catch (err) {
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

//Update category
export const updateCategory = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/categories/${id}`, formData, config);
    // console.log(res.data);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });

    dispatch(setAlert("Category Updated", "green"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "red")));
    }
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card
export const addCard = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/categories/${id}`, formData, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });

    dispatch(setAlert("Card added", "green"));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete card
export const deleteCard = (id, cardId) => async (dispatch) => {
  try {
    await axios.delete(`/api/categories/${id}/${cardId}`);
    dispatch({
      type: DELETE_CARD,
      payload: cardId,
    });

    dispatch(setAlert("Card Removed", "green"));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
