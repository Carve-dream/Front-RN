import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MyPageView = ({ title }) => {
    const navigation = useNavigation();

    // 프로필 눌렀을 때 프로필 확인하는 화면으로 전환
    const handleProfilePress = () => {
        navigation.navigate('ProfileView')
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar title="마이페이지" />
                <StatusBar barStyle="light-content" />

                <TouchableOpacity onPress={handleProfilePress} style={styles.button}>
                    <View style={styles.profileContainer}>
                        <Image source={require('../../assets/images/basic-profile.png')} style={styles.profileImage} />
                        {/*유저 이름, 이메일 수정*/}
                        <View>
                            <Text style={styles.name}>김꾸미 님의 프로필</Text>
                            <Text style={styles.email}>abc@gmail.com</Text>
                        </View>
                    </View>
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
    profileContainer: {
        flexDirection: 'row',
    },
    profileImage: {
        width: 50,
        height: 50,
        marginLeft: 50,
        marginRight: 20,
    },
    button: {
        backgroundColor: '#EF82A1',
        marginHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        marginTop: 30,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    email:{
        fontSize: 15,
        color: 'white',
        textAlign: 'left',
        marginTop: 5,
    },
});

export default MyPageView;
