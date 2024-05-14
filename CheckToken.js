import AsyncStorage from "@react-native-async-storage/async-storage";

async function checkToken() {
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (!refreshToken || refreshToken == 'false') {
        return false;
    }

    const response = await fetch('http://carvedrem.kro.kr:8080/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "refreshToken": refreshToken
        }),
    })
    const data = await response.json();
    console.log(data);

    if (data.check == null) {
        await AsyncStorage.setItem('accessToken', data.accessToken);
        console.log("토큰 갱신 성공");
        return true;
    } else {
        console.log("토큰 갱신 오류");
        return false;
    }
}

export default checkToken;