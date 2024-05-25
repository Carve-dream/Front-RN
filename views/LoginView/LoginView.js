import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {checkToken} from '../../ManageToken';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginView = () => {
    const navigation = useNavigation();

    // 로그인 버튼 눌렀을 때 SignIn 화면으로 이동
    const handleSingInPress = async () => {
        
        const autoLogin = await AsyncStorage.getItem('autoLogin');
        if (autoLogin && autoLogin == 'true') {
            const checking = await checkToken();
            if (checking) {
                navigation.navigate("Main");
                return;
            }
        }
        navigation.navigate('SignIn');
    }

    // 회원가입 버튼 눌렀을 때 처리할 함수
    const handleSignUpPress = async () => {
        await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove); // 삭제 예정 (토큰과 자동로그인 정보 삭제하는 코드)
        navigation.navigate('SignUpInfo');
    };

    useEffect(() => {
        const checkFirst = async () => {
            const first = await AsyncStorage.getItem('first');
            if (!first) {
                navigation.navigate("Start");
            }
        }
        checkFirst();
    })

    return (
        <View style={styles.container}>
            <StatusBar  barStyle="light-content" />
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Image source={require('../../assets/images/login-ggumi.png')} style={styles.ggumi} />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSingInPress}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
                <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#464E82',
        height: 750,
    },
    imageContainer:{
        paddingTop: 122,
        alignItems: 'center',
    },
    logo: {
        width: 280,
        height: 167,
    },
    ggumi:{
        width: 172,
        height: 231,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#EF82A1',
        marginHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 15,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

});

export default LoginView;
