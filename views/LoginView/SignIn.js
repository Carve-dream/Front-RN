import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircleCheckbox from './CircleCheckbox';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    // 로그인 버튼 눌렀을 때 처리할 함수

    
    // 회원가입 버튼 눌렀을 때 처리할 함수
    const handleSignUpPress = () => {
        console.log('button');

    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                </View>
                <View>
                    <Text style={styles.text}>이메일</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="이메일을 입력해주세요."
                        placeholderTextColor="white" 
                        keyboardType="email-address" // 이메일 입력 키보드 형식
                    />
                    <Text style={styles.text}>비밀번호</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="비밀번호를 입력해주세요."
                        placeholderTextColor="white" 
                        keyboardType="email-address" // 이메일 입력 키보드 형식
                    />
                </View>

                <View style={styles.checkboxContainer}>
                    <CircleCheckbox label="로그인 유지"/>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
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
    input: { // TextInput 스타일
        height: 50,
        marginHorizontal: 40,
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        color: 'white', // 입력 텍스트 색상
        borderColor: '#464E82',
        borderBottomColor: 'white',
        fontSize: 15,
        marginBottom: 20,
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

});

export default SignIn;
