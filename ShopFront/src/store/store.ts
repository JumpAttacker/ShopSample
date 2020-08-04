import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import itemsReducer from "./Items/Slice";
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import userDataReducer from "./userData/Slice";

const history = createBrowserHistory();

const middleware = [...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
        }
    },
), routerMiddleware(history)];

export default configureStore({
    reducer: {
        items: itemsReducer,
        userData: userDataReducer,
    },
    middleware
});
