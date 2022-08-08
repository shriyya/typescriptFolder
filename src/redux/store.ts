import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducer/index";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);
export default store;
