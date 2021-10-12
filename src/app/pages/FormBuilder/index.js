import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { FormBuilder as Builder } from '@formio/react';
import 'formiojs/dist/formio.full.min.css';
import 'formiojs/dist/formio.builder.min.css';
import 'formiojs/dist/formio.embed.min.css';
import 'formiojs/dist/formio.form.min.css';
import '../../assets/bootstrap.scss';

const FormBuilder = props => {

    const location = useLocation();
    const history = useHistory();

    const process = location.state?.process; //Process of the activity
    const action = location.state?.action; //AddActivity module action (edit or new)
    const activity = location.state?.activity; //Current activity
    const xml = location.state?.xml; //Model of BPMN that is working now

    const optionsTemplate = () => {

        const leftTemplate = (
            <>

            </>
        );

        const rightTemplate = (
            <>
                <button
                    class="p-button p-component p-button-danger p-mx-1"
                    style={{ width: '93px' }}>
                        <span class="p-button-icon p-c pi pi-times p-button-icon-left"></span>
                        <span class="p-button-label p-c">Cancel</span>
                </button>
                <button
                    class="p-button p-component p-button-success"
                    style={{ width: '93px' }}>
                        <span class="p-button-icon p-c pi pi-save p-button-icon-left"></span>
                        <span class="p-button-label p-c">Save</span>
                </button>
            </>
        );

        return (
            <div className="card p-mb-3 p-pb-2 p-shadow-3" style={{ borderRadius: '17px' }}>
                <div className="p-grid">
                    <div className="p-col" style={{ textAlign: 'left' }}>{ leftTemplate }</div>
                    <div className="p-col" style={{ textAlign: 'right' }}>{ rightTemplate }</div>
                </div>
            </div>
        );
    }

    return (
        <>

            <h2 style={{ textAlign: 'center' }}>
                <i className={`${(action == 'edit') ? 'pi pi-pencil' : 'pi pi-plus'} p-mr-2`} style={{ fontSize: '1.5rem' }}></i>
                { (action == 'edit') ? 'Edit' : 'Build' } form at <i><a>"{activity?.text}"</a></i>
            </h2>

            { optionsTemplate() }

            <div id="bootstrap">
                <Builder form={{display: 'form'}} options={ options } />
            </div>
        </>
    )
}

const options = {
    language: 'sp',
}

FormBuilder.propTypes = {

}

export default FormBuilder