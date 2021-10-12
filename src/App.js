import React from "react";
import FormBuilder from "./app/pages/FormBuilder";
import FormViewer from "./app/pages/FormViewer";
import Example from "./app/pages/Example";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const defaultHistory = createBrowserHistory();

function App({ history = defaultHistory }) {
    return (
        <Router history={ history }>
            <Route exact path="/" component={ Example } />
            <Route exact path="/form-builder" component={ FormBuilder } />
            <Route exact path="/form-viewer" component={ FormViewer } />
        </Router>
    );
}

export default App;