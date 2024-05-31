import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ProfileTopBar from './ProfileTopBar';
import { fetchUserData } from '../../api/fetchUserData';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileView = ({ title }) => {
    const navigation = useNavigation();

    // 확인 버튼 눌렀을 때 마이페이지 화면으로 전환
    const ConfirmPress = () => {
        navigation.navigate('MyPageView')
    };
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirth] = useState('');
    const [createdDate, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [imageUrl, setProfileImage] = useState(require('../../assets/images/basic-profile.png'));

    const loadUserData = async () => {
        const data = await fetchUserData();
        setUserName(data.information.name);
        setEmail(data.information.email);
        setBirth(data.information.birthDate);
        setDate(data.information.createdDate.split('T')[0]); // YYYY-MM-DD 형식으로 변환
        setGender(data.information.gender);
        const imagePath = images[data.information.imageUrl] || require('../../assets/images/basic-profile.png');
        setProfileImage(imagePath);
        console.log(data.information.imageUrl);
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    useEffect(() => {
        loadUserData();
    }, []);


    //유저 정보에 따라 프로필 사진, 이름, 생년월일, 성별, 이메일 주소, 가입 날짜 수정
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <ProfileTopBar title="프로필" />
                <StatusBar barStyle="light-content" />
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/images/profile-background.png')} style={styles.profileBack} />
                    <Image source={imageUrl} style={styles.profileImage} />
                </View>
                <View>
                    <Text style={styles.text}>이름</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>{userName}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.rowText}>생년월일</Text>
                        <Text style={styles.rowText}>성별</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.birthInput}>{birthDate}</Text>
                        </View>

                        <View style={[styles.genderButton, gender === 'MALE' && styles.selectedGender]}>
                            <Text style={[styles.genderText, gender === 'MALE' && styles.selectedGenderText]}>남성</Text>
                        </View>

                        {/* 여성 버튼 */}
                        <View style={[styles.genderButton, gender === 'FEMALE' && styles.selectedGender]}>
                            <Text style={[styles.genderText, gender === 'FEMALE' && styles.selectedGenderText]}>여성</Text>
                        </View>
                    </View>

                    <Text style={styles.text}>이메일 주소</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>{email}</Text>
                    </View>

                    <Text style={styles.text}>가입한 날짜</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>{createdDate}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={ConfirmPress} style={styles.button}>
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>

            </View>
        </View>

    );
};
const images = {
    FEAR: require('../../assets/emoji/scared.png'),
    YEARNING: require('../../assets/emoji/miss.png'),
    JOY: require('../../assets/emoji/glad.png'),
    ANGER: require('../../assets/emoji/angry.png'),
    AWKWARDNESS: require('../../assets/emoji/uncomfortable.png'),
    ABSURDITY: require('../../assets/emoji/confused.png'),
    EXCITED: require('../../assets/emoji/excited.png'),
    THRILL: require('../../assets/emoji/happy.png'),
    MYSTERY: require('../../assets/emoji/mysterious.png'),
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#464E82',
        height: 750,
    },
    profileBack: {
        width: 70,
        height: 70,
        marginTop: 50,
    },
    profileImage: {
        width: 60,
        height: 60,
        marginTop: 50,
        position: 'absolute',
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
        fontSize: 17,
    },
    birthInput: {
        color: 'white',
        fontSize: 16,
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
