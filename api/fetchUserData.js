import { checkToken, getToken } from '../ManageToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; // Alert 모듈 임포트


const BASE_URL = 'http://carvedrem.kro.kr:8080/';

//유저 정보 가져오기
export const fetchUserData = async () => {

    await checkToken();
    const token = await getToken();

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

//로그아웃 api
export const logoutUser = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken'); // 저장된 refreshToken 가져오기
    
    const response = await fetch('http://carvedrem.kro.kr:8080/auth/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if(response.ok){
        console.log('로그아웃 성공');
        console.log(response.status);
    } else {
        console.log('로그아웃 실패');
    }

    // 로그아웃이 성공하면 로컬 스토리지에서 토큰 삭제
    await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
};

//탈퇴하기 api
export const deleteUserAccount = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken'); // 저장된 refreshToken 가져오기
    
    const response = await fetch('http://carvedrem.kro.kr:8080/auth', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if(response.ok){
        console.log('탈퇴하기 성공');
        console.log(response.status);
    } else {
        console.log('탈퇴하기 실패');
    }

    await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
};