import React, { useEffect, useState } from 'react';
import Formio from 'formiojs/dist/formio.full.min'
import MenuOptions from './MenuOptions';
import { useLocation } from 'react-router';
import 'formiojs/dist/formio.full.min.css';
import 'formiojs/dist/formio.builder.min.css';
import 'formiojs/dist/formio.embed.min.css';
import 'formiojs/dist/formio.form.min.css';
import '../../assets/bootstrap.scss';
import { getFormByActivity } from '../../redux/actions/form.actions';

const Builder = props => {

    const location = useLocation();
    const [ form, setForm ] = useState({})

    const process = location.state?.process;
    const activity = location.state?.activity;
    const token = location.state?.token;

    //Custom builders menu
    const builderCustom = {
        basic: { title: 'Fields' },
        advanced: { title: 'Fields Advanced' },
        layout: { title: 'Layout' },
        data: { title: 'Data' },
        premium: { title: 'Others' },
    }
    
    useEffect( () => {

        getFormByActivity(activity?.id, token).then(data => {

            const json = data?.data?.json_body;
            if (json) setForm(json);

            Formio.builder(document.getElementById('builder'), (json) ? json:{}, { builder: builderCustom }).then((builder) => {
                builder.on('change', (schema) => {
                    setForm(schema);
                });
            });

        });
    }, [])

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>
                Build form at <i><a>"{activity?.name}"</a></i>
            </h2>

            <MenuOptions
                activity={ activity }
                process={ process }
                token={ token }
                form={ form } />

            <div id="bootstrap">

                {/* Div builder container */}
                <div id="builder" />
            </div>
        </>
    )
}

export default Builder;