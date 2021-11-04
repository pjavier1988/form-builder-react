import axios from "axios";
import * as urls from  '../../api/urls';

export const createForm = async (data, token) => {

    const form = {
        json_body: data?.formSchema,
        activity_id: data?.activityId,
        status: 1,
    };

    const response = await axios.post(`${urls.URL_BASE}${urls.urlCreateForm}`, form, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}

export const getFormByActivity = async (activityId, token) => {

    const response = await axios.get(`${urls.URL_BASE}${urls.urlGetFormByActivity}${activityId}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}

export const updateForm = async (id, formSchema, token) => {

    const data = {
        json_body: formSchema,
    };

    const response = await axios.put(`${urls.URL_BASE}${urls.urlUpdateForm}${id}`, data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}