import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import Alert from '../../components/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { updateActivityTypeByTask } from '../../redux/actions/activity.actions';
import { createForm, getFormByActivity, updateForm } from '../../redux/actions/form.actions';
import { useHistory } from 'react-router';
import { AlertTitle, DialogContent, Snackbar } from '@mui/material';

const MenuOptions = ({ process, token, formSchema, activity }) => {

    const history = useHistory();
    const [ deleteDilog, setDeleteDilog ] = useState(false);
    const [ toast, setToast ] = useState({ open: false, vertical: 'top', horizontal: 'right', msg: undefined, title: 'Success'});
    const { open, vertical, horizontal, msg, title } = toast;

    const handleSave = () => {

        // Body for create a new form in this activity
        const dataForm = {
            formSchema: formSchema,
            activityId: activity?.id,
        }
        
        // If activity doesn´t have form, survey or social asigned
        if (!activity?.type) {

            // Create a new form for this activity
            createForm(dataForm, token).then(response => {

                // Update activity type as 'form'
                // For have asigned a form with this activity
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
                updateForm(data?.data?.id, formSchema, token).then(response => {
                    setToast({
                        ...toast,
                        open: true,
                        msg: 'Form saved',
                    });
                });
            });

        }
    }

    const handleDelete = () => {
        updateActivityTypeByTask(activity?.task_id, '', token).then(responseActivity => {
            console.log(responseActivity);
            // getFormByActivity(activity?.id, token).then(data => {                
            //     setToast({
            //         ...toast,
            //         open: true,
            //         msg: 'Form deleted',
            //     });
            // });
        });
    }

    const leftTemplate = (
        <>
            <button
                className="p-button p-component p-button-danger p-mr-1 p-mr-1"
                style={{ width: '93px' }}
                onClick={ () => setDeleteDilog(true) }
                disabled={ (activity?.type) ? false:true } >
                    <span className="p-button-icon p-c pi pi-trash p-button-icon-left"></span>
                    <span className="p-button-label p-c">Delete</span>
            </button>
            <button
                className="p-button p-component p-button-success"
                style={{ width: '93px' }}
                onClick={ handleSave } >
                    <span className="p-button-icon p-c pi pi-save p-button-icon-left"></span>
                    <span className="p-button-label p-c">
                        { (activity?.type) ? 'Save':'Create' }
                    </span>
            </button>
        </> 
    );

    const rightTemplate = (
        <>
            <button
                className="p-button p-component p-button-warning p-mx-1"
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
                    <span className="p-button-icon p-c pi pi-arrow-left p-button-icon-left"></span>
                    <span className="p-button-label p-c">Back</span>
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

            <Dialog 
                onClose={ () => setDeleteDilog(false) } 
                open={ deleteDilog } >

                <DialogTitle className='bg-dark color-white p-text-center'>
                    Are you sure you want to delete this form?
                </DialogTitle>

                <DialogContent className='bg-dark color-white'>
                    <div className='p-mx-3 p-mb-3'>
                        <p>
                            If you delete this form you will not be able to recover it
                        </p>
                    </div>
                    <div className='p-text-right'>
                        <button
                            className="p-button p-component p-button-text p-button-warning p-mr-1 p-mr-1"
                            style={{ width: '93px' }}
                            onClick={ () => setDeleteDilog(false) } >
                                <span className="p-button-icon p-c pi pi-times p-button-icon-left"></span>
                                <span className="p-button-label p-c">Cancel</span>
                        </button>
                        <button
                            className="p-button p-component p-button-text p-button-danger"
                            style={{ width: '93px' }}
                            onClick={ handleDelete } >
                                <span className="p-button-icon p-c pi pi-trash p-button-icon-left"></span>
                                <span className="p-button-label p-c">Delete</span>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

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
    formSchema: PropTypes.object,
    token: PropTypes.string,
}

export default MenuOptions
