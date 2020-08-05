import React from 'react';
import './Styles/App.scss';
import "./Styles/styles.scss";
import {Provider} from "react-redux";
import AppRouter from "./Components/AppRouter";

interface MainProps {
    store: any;
}

const App: React.FC<MainProps> = ({store}) => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );
};

export default App;

