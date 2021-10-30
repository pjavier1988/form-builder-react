import axios from "axios";
import * as urls from  '../../api/urls';

export const updateActivityTypeByTask = async (taskId, type, token) => {

    const typeData = {
        type: type,
    }

    const response = await axios.put(`${urls.URL_BASE}${urls.urlUpdateActivityTypeByTask}${taskId}`, typeData, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}
