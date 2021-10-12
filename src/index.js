import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';

window.renderForm = (containerId, history) => {

    ReactDOM.render(
        <App history={ history } />,
        document.getElementById(containerId),
    );

    serviceWorker.unregister();
};

window.unmountForm = containerId => {
    try {
        ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
    } catch (error) {
        console.log('Error: unmountComponentAtNode (Not Found)');        
    }
};

if (!document.getElementById('Form-container')) {

    ReactDOM.render(<App />, document.getElementById('root'));
    serviceWorker.unregister();
}