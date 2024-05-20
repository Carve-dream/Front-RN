import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircleCheckbox from './CircleCheckbox';
import Validation from './validation';
import AsyncStorage from "@react-native-async-storage/async-storage";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const getToken = async (em, pw) => {
    const response = await fetch('http://carvedrem.kro.kr:8080/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": em,
            "password": pw,
        }),
    })
    const data = await response.json();
    if (data.check == null) {
        await AsyncStorage.setItem('accessToken', data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.refreshToken);
    } else {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        console.log(data);
    }
}

const SignIn = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [emailValid, setEmailValid] = useState(true); // 이메일 유효성 상태
    const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 유효성 상태

    const { validateEmail, validatePassword } = Validation(); // 이메일 유효성 검사를 위한 커스텀 훅 사용

    // 로그인 버튼 눌렀을 때 처리할 함수
    const handleLoginPress = async () => {
        console.log('login button');
        if (email == null || password == null) {
            console.log("Invalid Email or Password!");
            if (email == null) {
                setEmailValid(false);
            }
            if (password == null) {
                setPasswordValid(false);
            }
            return;
        }
        if (emailValid && passwordValid) {
            console.log(email + ", " + password);
            await getToken(email, password);
            const at = await AsyncStorage.getItem('accessToken');
            const rt = await AsyncStorage.getItem('refreshToken');
            
            console.log("AccessToken: " + at);
            console.log("RefreshToken: " + rt);
            
            if (at != null && rt != null) {
                await AsyncStorage.setItem('autoLogin', stayLoggedIn.toString());
                console.log("autoLogin: " + stayLoggedIn.toString());
                navigation.navigate("Main");
            } else {
                Alert.alert("경고", "아이디 또는 비밀번호가 일치하지 않습니다!", [
                    {text: "확인"}
                ])
                return;
            }
        } else {
            console.log("Invalid Email or Password!");
        }
    }

    // 회원가입 버튼 눌렀을 때 SignupInfo 화면으로 넘어감
    const handleSignUpPress = () => {
        console.log('sign up button');
        navigation.navigate('SignUpInfo');
    };

    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    // 로그인 유지 체크박스 상태 변경 처리
    const handleStayLoggedInChange = (isChecked) => {
        setStayLoggedIn(isChecked);
    };

    const handleEmailChange = (t) => {
        setEmail(t);
        setEmailValid(validateEmail(t));
    }

    const handlePasswordChange = (t) => {
        setPassword(t);
        setPasswordValid(validatePassword(t));
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                </View>
                <View>
                    <Text style={styles.text}>이메일</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, !emailValid && styles.invalidInput && styles.invalidTextColor]} // 유효하지 않은 경우 빨간색으로 표시
                            placeholder="이메일을 입력해주세요."
                            placeholderTextColor="white"
                            keyboardType="email-address" // 이메일 입력 키보드 형식
                            // value={email} // 이메일 유효성 검사
                            onChangeText={handleEmailChange}
                        />
                        {!emailValid && <Text style={styles.exclamation}>!</Text>}
                    </View>

                    <Text style={styles.text}>비밀번호</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, !passwordValid && styles.invalidInput && styles.invalidTextColor]} // 유효하지 않은 경우 빨간색으로 표시
                            secureTextEntry={true}
                            placeholder="비밀번호를 입력해주세요."
                            placeholderTextColor="white"
                            keyboardType="email-address" // 비밀번호 입력 키보드 형식
                            // value={password} // 비밀번호 유효성 검사
                            onChangeText={handlePasswordChange}
                        />
                        {!passwordValid && <Text style={styles.exclamation}>!</Text>}
                    </View>
                </View>

                <View>
                    <CircleCheckbox
                        checked={stayLoggedIn}
                        onChange={handleStayLoggedInChange}
                        label="로그인 유지" />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignUpPress}>
                    <Text style={styles.signup}>회원가입</Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#464E82',
        height: 750,
    },
    imageContainer: {
        paddingTop: 122,
        alignItems: 'center',
    },
    logo: {
        width: 280,
        height: 167,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#EF82A1',
        marginHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 15,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 40,
        marginTop: 20,
    },
    signup: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 50,
    },
    inputContainer: { // TextInput 스타일
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 40,
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        // color: 'white', // 입력 텍스트 색상
        borderColor: '#464E82',
        borderBottomColor: 'white',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 15,
        
    },
    checkbox: {
        height: 20,
        width: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 8,
    },
    checkboxInner: {
        flex: 1,
        margin: 2,
        backgroundColor: '#464E82',
    },
    checkboxLabel: {
        color: 'white',
        marginLeft: 290,
    },
    invalidInput: { // 유효하지 않을 때의 스타일
        borderColor: '#464E82',
        borderBottomColor: 'red',
    },
    invalidTextColor: {
        color: '#F34F45', // 입력 텍스트의 색상을 빨강색으로 설정
    },
    exclamation: {
        color: '#F34F45',
        fontSize: 15,
    },

});

export default SignIn;
