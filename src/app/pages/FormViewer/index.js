import React, { useEffect } from 'react';
import Formio from 'formiojs/Formio';
import { useHistory, useLocation } from 'react-router';
import { getFormByActivity } from '../../redux/actions/form.actions';

const FormViewer = props => {

    const location = useLocation();
    const history = useHistory();

    //if (!location.state?.activity) history.push('/admin/processes');
    const activity = location.state?.activity;
    const token = location.state?.token;

    useEffect(() => {
        getFormByActivity(activity?.id, token).then(data => {
            if (data?.data?.json_body) {
                Formio.createForm(document.getElementById('builder'), data?.data?.json_body);
            } else {
                Formio.createForm(document.getElementById('builder'), formExample);
            }
        });
    }, [])

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Form of <i><a>"{ activity?.name }"</a></i></h2>
            <div id="bootstrap">
                <div id="builder" />
            </div>
        </div>
    )
}

FormViewer.propTypes = {

}

export default FormViewer;

const formExample = {
    "display": "form",
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    },
    "components": [
        {
            "label": "Username",
            "placeholder": "Write your username",
            "tableView": true,
            "case": "uppercase",
            "validate": {
                "required": true
            },
            "unique": true,
            "key": "name",
            "type": "textfield",
            "input": true
        },
        {
            "label": "Password",
            "placeholder": "Write your password",
            "tableView": false,
            "key": "password",
            "type": "password",
            "input": true,
            "protected": true
        },
        {
            "label": "Date of birth",
            "placeholder": "Write your date of birth",
            "tableView": false,
            "enableMinDateInput": false,
            "datePicker": {
                "disableWeekends": false,
                "disableWeekdays": false
            },
            "enableMaxDateInput": false,
            "key": "dateOfBirth",
            "type": "datetime",
            "input": true,
            "widget": {
                "type": "calendar",
                "displayInTimezone": "viewer",
                "locale": "en",
                "useLocaleSettings": false,
                "allowInput": true,
                "mode": "single",
                "enableTime": true,
                "noCalendar": false,
                "format": "yyyy-MM-dd hh:mm a",
                "hourIncrement": 1,
                "minuteIncrement": 1,
                "time_24hr": false,
                "minDate": null,
                "disableWeekends": false,
                "disableWeekdays": false,
                "maxDate": null
            }
        },
        {
            "label": "Upload",
            "tableView": false,
            "storage": "base64",
            "webcam": false,
            "fileTypes": [
                {
                    "label": "",
                    "value": ""
                }
            ],
            "key": "file",
            "type": "file",
            "input": true
        },
        {
            "type": "button",
            "label": "Submit",
            "key": "submit",
            "disableOnInvalid": true,
            "input": true,
            "tableView": false
        }
    ]
}