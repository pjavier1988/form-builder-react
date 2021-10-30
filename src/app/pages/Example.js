import React from 'react';
import Builder from './FormBuilder';
import FormViewer from './FormViewer';

const Example = props => {
    return (
        <div>
            <Builder />
            <hr/>
            <FormViewer />
        </div>
    )
}

Example.propTypes = {

}

export default Example
