import React from 'react';
import PropTypes from 'prop-types';
import { updateActivityTypeByTask } from '../../redux/actions/activity.actions';
import { createForm } from '../../redux/actions/form.actions';
import { useHistory } from 'react-router';

const MenuOptions = ({ process, token, form, activity }) => {

    const history = useHistory();

    const handleSave = () => {

        const dataForm = {
            formSchema: form,
            activityId: activity?.id,
        }
        
        if (!activity?.type) {
            createForm(dataForm, token).then(response => {
                updateActivityTypeByTask(activity?.task_id, 'form', token).then(responseActivity => {
                    console.log(responseActivity);
                });
            });
        } else {
            console.log(form);
        }
    }

    const leftTemplate = (
        <>
            <button
                className="p-button p-component p-button-danger p-mx-1"
                style={{ width: '93px' }}
                onClick={() => history.push({
                    pathname: '/bpmn/builder',
                    state: {
                        process: process,
                    },
                })} >
                    <span className="p-button-icon p-c pi pi-times p-button-icon-left"></span>
                    <span className="p-button-label p-c">Cancel</span>
            </button>
        </>
    );

    const rightTemplate = (
        <>
            <button
                className="p-button p-component p-button-success"
                style={{ width: '93px' }}
                onClick={ handleSave } >
                    <span className="p-button-icon p-c pi pi-save p-button-icon-left"></span>
                    <span className="p-button-label p-c">Save</span>
            </button>
        </>
    );

    return (
        <div className="card p-mb-3 p-pb-2 p-shadow-3" style={{ borderRadius: '7px' }}>
            <div className="p-grid">
                <div className="p-col" style={{ textAlign: 'left' }}>{ leftTemplate }</div>
                <div className="p-col" style={{ textAlign: 'right' }}>{ rightTemplate }</div>
            </div>
        </div>
    );
}

MenuOptions.propTypes = {
    process: PropTypes.object,
    activity: PropTypes.object,
    form: PropTypes.object,
    token: PropTypes.string,
}

export default MenuOptions
