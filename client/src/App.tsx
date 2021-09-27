import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./GlobalStyles.css";
import { myContext } from "./Context";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import LoginPage from "./components/LoginPage/LoginPage";

const App = () => {
    const user = useContext(myContext);
    console.log(user);
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" component={Homepage} exact />
                <Route path="/login" component={LoginPage} exact />
            </Switch>
        </Router>
    );
};

export default App;
