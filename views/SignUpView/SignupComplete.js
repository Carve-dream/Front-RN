import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SignupComplete = (props) => {
    const navigation = useNavigation();

    const name = props.route.params;

    const handleStart = () => {
        navigation.navigate('SignIn');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>


            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/back-white.png')} style={styles.back} />
                </TouchableOpacity>

                <StatusBar barStyle="light-content" />
                <View style={styles.info}>
                    <Text style={styles.textInfo}>{name} 님{"\n"}회원가입을 축하드려요!</Text>
                    <Image source={require('../../assets/images/signup-star.png')} style={styles.star} />

                </View>
                <View>
                    <Text style={styles.textStart}>꾸미와 함께{"\n"}내면의 꿈 속 세계로 여행을 떠나볼까요?</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleStart}>
                    <Text style={styles.buttonText}>시작하기</Text>
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
    info: {
        paddingTop: 122,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInfo: {
        color: 'white',
        fontSize: 25,
        marginLeft: 40,
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
        marginTop: 230,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    textStart: {
        color: 'white',
        fontSize: 18,
        marginLeft: 40,
        marginTop: 20,
    },

});

export default SignupComplete;
