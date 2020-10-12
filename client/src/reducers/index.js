import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import category from './categoryReducer';

export default combineReducers({ alert, auth, category });
