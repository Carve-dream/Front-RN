import { checkToken, getToken } from '../ManageToken';

const BASE_URL = 'http://carvedrem.kro.kr:8080/';

export const updateUserData = async (name, birth, gender) => {
    await checkToken();
    token = await getToken();

    try {
        const response = await fetch(`${BASE_URL}api/user`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token[0]}`,
            },
            body: JSON.stringify({
                name: name,
                birthDate: birth,
                gender: gender,
            }),
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const updatedData = await response.json();
        return updatedData;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};
