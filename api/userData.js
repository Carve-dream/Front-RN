import { checkToken, getToken } from '../ManageToken';

const BASE_URL = 'http://carvedrem.kro.kr:8080/';


export const fetchUserData = async () => {

    await checkToken();
    token = await getToken();

    try {
        const response = await fetch(`${BASE_URL}api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token[0]}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};
