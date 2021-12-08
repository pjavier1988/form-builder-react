import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import Alert from '../../components/Alert';
import { updateActivityTypeByTask } from '../../redux/actions/activity.actions';
import { createForm, getFormByActivity, updateForm } from '../../redux/actions/form.actions';
import { useHistory } from 'react-router';
import { AlertTitle, Snackbar } from '@mui/material';

const MenuOptions = ({ process, token, form, activity }) => {

    const history = useHistory();
    const [ toast, setToast ] = useState({ open: false, vertical: 'top', horizontal: 'right', msg: undefined, title: 'Success'});
    const { open, vertical, horizontal, msg, title } = toast;

    const handleSave = () => {

        const dataForm = {
            formSchema: form,
            activityId: activity?.id,
        }
        
        if (!activity?.type) { //Create form if activity type is null

            createForm(dataForm, token).then(response => {
                updateActivityTypeByTask(activity?.task_id, 'form', token).then(responseActivity => {
                    setToast({
                        ...toast,
                        open: true,
                        msg: 'Form created and saved',
                    });
                });
            });

        } else if (activity?.type.toLowerCase() === 'form'.toLowerCase()) { //Update form if activity type is form
            
            getFormByActivity(activity?.id, token).then(data => {
                updateForm(data?.data?.id, form, token).then(response => {
                    setToast({
                        ...toast,
                        open: true,
                        msg: 'Form saved',
                    });
                });
            });

        }
    }

    const leftTemplate = (
        <>
            <button
                className="p-button p-component p-button-danger p-mx-1"
                style={{ width: '93px' }}
                onClick={() => {
                    if (process) {
                        history.push({
                            pathname: '/bpmn/builder',
                            state: {
                                process: process,
                            },
                        })
                    } else {
                        history.goBack();
                    }
                }} >
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

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
          return;
        }
    
        setToast({
            ...toast,
            open: false,
        });
    };

    return (
        <>
            <Snackbar 
                anchorOrigin={{ vertical, horizontal }} open={ open }
                autoHideDuration={ 2000 } onClose={ handleClose } 
                TransitionComponent={ Slide } >

                <Alert onClose={ handleClose } severity="success" sx={{ width: '100%' }}>
                    <AlertTitle>{ title }</AlertTitle>
                    { msg }
                </Alert>

            </Snackbar>

            <div className="card p-mb-3 p-pb-2 p-shadow-3" style={{ borderRadius: '7px' }}>
                <div className="p-grid">
                    <div className="p-col" style={{ textAlign: 'left' }}>{ leftTemplate }</div>
                    <div className="p-col" style={{ textAlign: 'right' }}>{ rightTemplate }</div>
                </div>
            </div>
        </>
    );
}

MenuOptions.propTypes = {
    process: PropTypes.object,
    activity: PropTypes.object,
    form: PropTypes.object,
    token: PropTypes.string,
}

export default MenuOptions
