import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import store from "./store/store";

ReactDOM.render(
    <App store={store} />,
    document.getElementById("root")
);

serviceWorker.unregister();
