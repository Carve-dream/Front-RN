import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, Text, StyleSheet, ImageBackground, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import { fetchUserData, logoutUser, deleteUserAccount } from '../../api/fetchUserData';
import { checkToken, getToken } from "../../ManageToken";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MyPageView = ({ title }) => {
    const navigation = useNavigation();

    // 프로필 눌렀을 때 프로필 확인하는 화면으로 전환
    const handleProfilePress = () => {
        navigation.navigate('ProfileView')
    };

    const handleFortunePress = () => {
        navigation.navigate('FortuneRecordView')
    };

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const loadUserData = async () => {
        const data = await fetchUserData();
        setUserName(data.information.name);
        setEmail(data.information.email);
    };

    //최근 포춘쿠키 조회
    const [latestFortune, setLatestFortune] = useState({ date: '', content: '' }); // 최신 포춘쿠키 상태
    // 현재 날짜를 가져와서 year와 month를 설정
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1 더하기
    const loadLatestFortune = async () => {
        await checkToken();
        const token = await getToken();
        const response = await fetch('http://carvedrem.kro.kr:8080/api/fortune?year=' + year + '&month=' + month, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token[0]}`,
            },
        });
        const data = await response.json();
        if (data.check && data.information.length > 0) {
            const latest = data.information[data.information.length - 1];
            setLatestFortune({
                date: latest.createAt.split('T')[0],
                content: latest.content
            });
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
            loadLatestFortune();
        }, [])
    );

    useEffect(() => {
        loadUserData();
        loadLatestFortune();
    }, []);

    const handleLogout = async () => { //로그아웃 후 로그인화면으로 전환
        await logoutUser();
        navigation.navigate('LogIn');
    }

    const handleDeleteAccount = async () => { //탈퇴하기 후 로그인화면으로 전환
        Alert.alert(
            '정말 탈퇴하시겠습니까?',
            '탈퇴 후 복구가 불가능합니다.',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: async () => {
                        await deleteUserAccount();
                        navigation.navigate('LogIn');
                    },
                },
            ],
            { cancelable: false }
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar title="마이페이지" />
                <StatusBar barStyle="light-content" />

                <TouchableOpacity onPress={handleProfilePress} style={styles.button}>
                    <View style={styles.profileContainer}>
                        <Image source={require('../../assets/images/basic-profile.png')} style={styles.profileImage} />
                        <View>
                            <Text style={styles.name}>{userName} 님의 프로필</Text>
                            <Text style={styles.email}>{email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <View style={styles.fortuneBox}>
                    <Image source={require('../../assets/images/fortune.png')} style={styles.fortuneImage} />
                    <Text style={styles.fortuneUser}>{userName} 님의 포춘쿠키</Text>

                    <ImageBackground
                        source={require('../../assets/images/foutuneResultText.png')}
                        style={styles.fortuneResult}>
                        <View style={styles.fortuneTextCtn}>
                            {/*포춘쿠키 해당 날짜 연결 */}
                            <Text style={styles.fortuneText}>{latestFortune.date}</Text>
                            {/*포춘쿠키 결과 텍스트 연결 */}
                            <Text style={styles.fortuneText} numberOfLines={2} ellipsizeMode='tail'>{latestFortune.content}</Text>
                        </View>
                    </ImageBackground>

                    <TouchableOpacity onPress={handleFortunePress} style={styles.fortuneResultCtn}>
                        <Text style={styles.fortuneText}>이전 포춘쿠키 기록 확인하러 가기</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.setting}></View>
                    <View style={styles.settingCtn}>
                        <Text style={styles.settingText}>설정</Text>
                        <TouchableOpacity>
                            <Text style={styles.settingMenuText}> 서비스 설정 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.settingMenuText}> 로그아웃 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteAccount}>
                            <Text style={styles.settingMenuDelete}> 탈퇴하기 </Text>
                        </TouchableOpacity>

                    </View>

                </View>

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
    email: {
        fontSize: 15,
        color: 'white',
        textAlign: 'left',
        marginTop: 5,
    },
    fortuneBox: {
        marginHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        marginTop: 30,
        height: 360,
        backgroundColor: '#C1C7F8',
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: "center"

    },
    fortuneImage: {
        width: 165,
        height: 110,
    },
    fortuneUser: {
        color: '#333333',
        fontSize: 18,
        fontWeight: '600',
    },
    fortuneResult: {
        width: 330,
        height: 130,
        marginTop: 10
    },
    fortuneText: {
        textAlign: 'center',
        color: '#333333',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
    },
    fortuneTextCtn: {
        marginTop: 30,
        marginHorizontal: 30,
    },
    fortuneResultCtn: {
        marginTop: 23
    },
    setting: {
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: '#464E82',
        borderBottomColor: '#FFFFFF',
        marginHorizontal: 30,
    },
    settingCtn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: 38,
        marginTop: 15,
    },
    settingText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5
    },
    settingMenuText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 15
    },
    settingMenuDelete: {
        color: '#F34F45',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 15
    }

});

export default MyPageView;
