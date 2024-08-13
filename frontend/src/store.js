import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";  // Correct import
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from './reducers';
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  noteList: noteListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
});

let userInfoFromStorage = null;
try {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
} catch (error) {
  console.error("Error parsing userInfo from localStorage:", error);
}

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
//   rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
