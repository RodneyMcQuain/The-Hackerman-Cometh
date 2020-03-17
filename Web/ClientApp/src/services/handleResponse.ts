﻿export const handleResponse = (navigate: any, response: any) => {
    const responseStatus = response.status;
    // ******PLEASE DO THINGS HERE
    // if (responseStatus === 401) {
    //    history.push('/unauthorizedError');
    //    throw new Error("401");
    // } else if (responseStatus === 404) {
    //    history.push('/notFoundError');
    //    throw new Error("404");
    // } else if (responseStatus >= 500) {
    //    history.push('/serverError');
    //    throw new Error(responseStatus.toString());
    // } else if (response.ok) { // If response is ok, return the response
    //    return response;
    // } else {
    //    history.push('/error');
    //    throw new Error("Unhandled " + responseStatus);
    // }

     return response;
}; 