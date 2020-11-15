import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
  ADD_CARD,
  DELETE_CARD,
} from "../actions/types";

const initialState = {
  categories: [],
  category: null,
  loading: true,
  categoryDeleted: false,
  categoryUpdated: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
        categoryDeleted: false,
        categoryUpdated: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
        categoryDeleted: false,
        categoryUpdated: false,
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
        categoryDeleted: false,
        categoryUpdated: true,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
        categoryDeleted: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
        loading: false,
        categoryDeleted: true,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case ADD_CARD:
      return {
        ...state,
        category: { ...state.category, cards: payload },
        loading: false,
      };
    case DELETE_CARD:
      return {
        ...state,
        categroy: {
          ...state.category,
          cards: state.category.cards.filter((card) => card._id !== payload),
        },
        loading: false,
      };
    default:
      return state;
  }
}
