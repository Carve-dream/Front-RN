import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileTopBar from './ProfileTopBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileView = ({ title }) => {
    const navigation = useNavigation();

    // 확인 버튼 눌렀을 때 마이페이지 화면으로 전환
    const ConfirmPress = () => {
        navigation.navigate('MyPageView')
    };

    //유저 정보에 따라 프로필 사진, 이름, 생년월일, 성별, 이메일 주소, 가입 날짜 수정
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ProfileTopBar title="프로필" />
                <StatusBar barStyle="light-content" />
                <View style={{ alignItems: 'center'}}>
                    <Image source={require('../../assets/images/basic-profile.png')} style={styles.profileImage} />
                </View>
                <View>
                    <Text style={styles.text}>이름</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>김꾸미</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.rowText}>생년월일</Text>
                        <Text style={styles.rowText}>성별</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.birthInput}>2000/01/01</Text>
                        </View>

                        <View style={styles.genderButton}>
                            <Text style={styles.genderText}>남성</Text>
                        </View>
                        <View style={styles.genderButton}>
                            <Text style={styles.genderText}>여성</Text>
                        </View>
                    </View>

                    <Text style={styles.text}>이메일 주소</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>abc@gmail.com</Text>
                    </View>

                    <Text style={styles.text}>가입한 날짜</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>2024/04/08</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={ConfirmPress} style={styles.button}>
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#464E82',
        height: 750,
    },
    profileImage: {
        width: 60,
        height: 60,
        marginTop: 50,
    },
    textInfo: {
        color: 'white',
        fontSize: 25,
        marginLeft: 40,
        marginRight: 30,
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
    delete: {
        width: 18,
        height: 18,
    },
    button: {
        backgroundColor: '#EF82A1',
        marginHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 15,
        marginTop: 40,
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
    rowText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 40,
        marginTop: 40,
        marginRight: 80,
    },
    inputContainer: { // TextInput 스타일
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 40,
        marginTop: 4,
        borderWidth: 1,
        padding: 10,
        borderColor: '#464E82',
        borderBottomColor: '#EF82A1',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 18,
    },
    birthInput: {
        color: 'white',
        fontSize: 18,
        marginRight: 20,
        width: 90,
    },
    genderButton: { // 버튼 초기 스타일
        width: 74,
        height: 37,
        padding: 10,
        marginTop: 18,
        marginLeft: -20,
        marginRight: 30,
        borderWidth: 1,
        borderColor: '#EF82A1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedGender: { // 선택된 성별 버튼
        backgroundColor: '#464E82', // 남색
        borderWidth: 1,
        borderColor: '#EF82A1',
        backgroundColor: '#EF82A1',
    },
    genderText: { // 성별 텍스트 초기 스타일
        color: '#EF82A1', //분홍색
        fontSize: 16,
    },
    selectedGenderText: { // 선택된 성별 텍스트
        color: '#FFFFFF',
    },


});

export default ProfileView;
