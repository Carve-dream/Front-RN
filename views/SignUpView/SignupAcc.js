import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Validation from '../LoginView/validation';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SignupAcc = (props) => {
    // console.log(props.route.params); // 넘어온 정보 출력

    const name = props.route.params[0];
    const birth = props.route.params[1].replaceAll('/', '-');
    const gender = props.route.params[2].toUpperCase();

    const navigation = useNavigation();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [emailValid, setEmailValid] = useState(false); // 이메일 유효성 상태
    const [passwordValid, setPasswordValid] = useState(false); // 비밀번호 유효성 상태

    const { validateEmail, validatePassword } = Validation(); // 이메일 유효성 검사를 위한 커스텀 훅 사용

    const handleComplete = async () =>{
        // 회원가입 로직 추가
        const response = await fetch('http://carvedrem.kro.kr:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "gender": gender,
                "birthDate": birth,
                "imageUrl": 'JOY',
            }),
        })
        const data = await response.json();
        console.log(data);
        if (data.check == null) {
            navigation.navigate('SignUpComplete', name);
        }
    }

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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/back-white.png')} style={styles.back} />
                </TouchableOpacity>

                <StatusBar barStyle="light-content" />
                <View style={styles.info}>
                    <Text style={styles.textInfo}>사용하실 이메일과{"\n"}비밀번호를 입력해주세요</Text>
                    <Image source={require('../../assets/images/signup-star.png')} style={styles.star} />
                </View>
                <View>
                    <Text style={styles.text}>이메일 주소</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, !emailValid && styles.invalidInput && styles.invalidTextColor]} // 유효하지 않은 경우 빨간색으로 표시
                            placeholder="abc@email.com"
                            placeholderTextColor="#BDBDBD"
                            keyboardType="email-address" // 이메일 입력 키보드 형식
                            // value={email} // 이메일 유효성 검사
                            onChangeText={handleEmailChange}
                        />
                        {emailValid && email != '' ? (
                            <Image source={require('../../assets/images/check.png')} style={styles.check} />
                        ) : !emailValid && <Text style={styles.exclamation}>!</Text>}
                    </View>
                    {!emailValid && <Text style={styles.warning}>올바른 이메일 주소를 입력해주세요</Text>}

                    <Text style={styles.text}>비밀번호</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, !passwordValid && styles.invalidInput && styles.invalidTextColor]} // 유효하지 않은 경우 빨간색으로 표시
                            secureTextEntry={true}
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            placeholderTextColor="#BDBDBD"
                            keyboardType="email-address" // 비밀번호 입력 키보드 형식
                            // value={password} // 비밀번호 유효성 검사
                            onChangeText={handlePasswordChange}
                        />
                        {passwordValid && password != '' ? (
                            <Image source={require('../../assets/images/check.png')} style={styles.check} />
                        ) : !passwordValid && <Text style={styles.exclamation}>!</Text>}
                        
                    </View>
                    {!passwordValid && <Text style={styles.warning}>올바른 비밀번호를 입력해주세요</Text>}
                </View>


                
                <TouchableOpacity style={[styles.button, !(emailValid && passwordValid && email != '' && password != '') && styles.buttonDisabled]}  
                    onPress={handleComplete}
                    disabled={!( emailValid && passwordValid && email != '' && password != '')} //email ,pwd 모두 유효한 경우에만 버튼 활성화
                    >
                    <Text style={styles.buttonText}>다음</Text>
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
    back: {
        marginTop: 53,
        marginLeft: 13,
        width: 32,
        height: 32,
    },
    textInfo: {
        color: 'white',
        fontSize: 25,
        marginLeft: 40,
    },
    info: {
        paddingTop: 122,
        alignItems: 'center',
        flexDirection: 'row',
    },
    star: {
        width: 95,
        height: 89,
    },
    button: {
        backgroundColor: '#EF82A1',
        marginHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 15,
        marginTop: 80,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#B9B9B9', // 비활성화 시의 배경색 설정
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
        borderColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 15,
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
    warning: {
        color: '#F34F45',
        fontSize: 15,
        marginLeft: 152,
        marginTop: -10,
    },
    check:{
        width: 20,
        height:20,
    },

});

export default SignupAcc;
