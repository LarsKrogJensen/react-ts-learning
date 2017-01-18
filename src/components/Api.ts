/**
 * Created by Lena on 2017-01-18.
 */
// import {fetch} from 'whatwg-fetch'

// namespace Api
// {
export interface AccessToken
{
    access_token?: string;
    error?: string;
    error_description?: string;
}

export function isNullOrEmpty(val: string) : boolean {
    return val == null || val == undefined || val == ""
}

export async function fetchAccessToken(usr: string, pwd: string): Promise<AccessToken>
{
    let init: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                                 client_id: usr,
                                 client_secret: pwd
                             }),
        credentials: 'include',
    };
    let response: Response = await fetch("https://larskj-gql.herokuapp.com/authenticate", init)
    return await response.json()
}
//}