import React from 'react';
import FormBuilder from './FormBuilder';
import FormViewer from './FormViewer';

const Example = props => {
    return (
        <div>
            <FormBuilder />
            <hr/>
            <FormViewer />
        </div>
    )
}

Example.propTypes = {

}

export default Example
