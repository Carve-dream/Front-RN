import React, { useState,useEffect, useCallback  } from 'react';
import { View, Text, StyleSheet,ImageBackground, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import { fetchUserData } from '../../api/userData';

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

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    useEffect(() => {
        loadUserData();
    }, []);

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
                    <Image source={require('../../assets/images/fortune.png')} style={styles.fortuneImage}/>
                    <Text style={styles.fortuneUser}>{userName} 님의 포춘쿠키</Text>

                    <ImageBackground
                        source = {require('../../assets/images/foutuneResultText.png') }
                        style={styles.fortuneResult}>
                            <View style={styles.fortuneTextCtn}>
                                 {/*포춘쿠키 해당 날짜 연결 */}
                                <Text style={styles.fortuneText}>2024.04.15</Text>
                                {/*포춘쿠키 결과 텍스트 연결 */}
                                <Text style={styles.fortuneText}>마음을 편하게 먹고 조급해하지 마세요</Text>
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
                        <TouchableOpacity>
                            <Text style={styles.settingMenuText}> 로그아웃 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
    email:{
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
        height: 99,
    },
    fortuneUser: {
        color: '#333333', 
        fontSize: 18,
        fontWeight: '600', 
    },
    fortuneResult:{
        width: 330, 
        height: 130,
        marginTop: 10
    },
    fortuneText:{
        textAlign: 'center', 
        color: '#333333', 
        fontSize: 14,
        fontWeight: '600',
        marginBottom:20,
    },
    fortuneTextCtn:{
        marginTop: 30,
    },
    fortuneResultCtn : {
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
        alignItems:'flex-start',
        marginHorizontal: 38,
        marginTop:15,
    },
    settingText : {
        color: 'white', 
        fontSize: 18, 
        fontWeight: '600',
        marginBottom: 5
    },
    settingMenuText : {
        color: 'white', 
        fontSize: 16, 
        fontWeight: '400',
        marginTop:15     
    },
    settingMenuDelete: {
        color: '#F34F45', 
        fontSize: 16, 
        fontWeight: '400',
        marginTop:15   
    }

});

export default MyPageView;
