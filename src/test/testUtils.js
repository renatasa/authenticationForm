import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import moxios from 'moxios';
import authReducer from "../Authorization/store/reducers/auth";
import todosReducer from "../Todos/store/reducers/reducer";

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};

export const creatingStore = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    todos: todosReducer,
  });

  return createStore(rootReducer, applyMiddleware(thunk));
};

export const mockRequest=(responseStatus, responseData)=>{
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    return request.respondWith({
      status: responseStatus,
      response: responseData,
    });
  });
}
