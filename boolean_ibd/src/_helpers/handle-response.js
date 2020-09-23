// The handleResponse function checks responses from the api to see if the request was unauthorised, forbidden or unsuccessful.
// If the response status is 401 Unauthorized or 403 Forbidden then the user is automatically logged out 
// This handles if the user token is no longer valid for any reason. 
// If the response contains an error then a rejected promise is returned that includes the error message.
// Otherwise if the request was successful then the response data is returned as a JSON object.

import { authenticationService } from '../_services/authentication.service';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                Location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}