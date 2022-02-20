import React, { useEffect, useState } from 'react';
import Formio from 'formiojs/dist/formio.full.min'
import MenuOptions from './MenuOptions';
import { useLocation } from 'react-router';
import { getFormByActivity } from '../../redux/actions/form.actions';
import 'formiojs/dist/formio.full.min.css';
import 'formiojs/dist/formio.builder.min.css';
import 'formiojs/dist/formio.embed.min.css';
import 'formiojs/dist/formio.form.min.css';
import '../../assets/bootstrap.scss';

const Builder = props => {

    const location = useLocation();
    const [ formSchema, setFormSchema ] = useState({})

    const process = location.state?.process;
    const activity = location.state?.activity;
    const token = location.state?.token;

    // const [activity, setActivity] = useState({});

    //Custom builders menu
    const builderCustom = {
        basic: { title: 'Fields' },
        advanced: { title: 'Fields Advanced' },
        layout: { title: 'Layout' },
        data: { title: 'Data' },
        premium: { title: 'Others' },
    }

    //Options for Builder
    const optionsBuilder = {
        builder: builderCustom,
    }
    
    useEffect( () => {

        getFormByActivity(activity?.id, token).then(data => {

            const json = data?.data?.json_body;
            if (json) setFormSchema(json);

            Formio.builder(document.getElementById('builder'), (json) ? json:{}, optionsBuilder).then((builder) => {
                builder.on('change', (schema) => {
                    setFormSchema(schema);
                });
            });
        });

    }, [ activity, token ])

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>
                Form builder for <a>{ activity?.name }</a>
            </h2>

            <MenuOptions
                activity={ activity }
                process={ process }
                token={ token }
                formSchema={ formSchema } />

            <div id="bootstrap">
                {/* Div builder container */}
                <div id="builder" />
            </div>
        </>
    )
}

export default Builder;