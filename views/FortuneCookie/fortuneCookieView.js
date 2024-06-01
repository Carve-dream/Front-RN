import React, {useCallback, useEffect, useState} from 'react';
import { View,Text,Image,TouchableOpacity,StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { checkToken, getToken } from '../../ManageToken';
import { fetchUserData } from '../../api/userData';
import LoadingModal from '../LoadingModalView/LoadingModal';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height; 

// 쿠키 화면 컴포넌트
const CookieView = () => {
  const [userName, setUserName] = useState('');

  const loadUserData = async () => {
      const data = await fetchUserData();
      setUserName(data.information.name);
  };

  useFocusEffect(
      useCallback(() => {
          loadUserData();
      }, [])
  );

  useEffect(() => {
      loadUserData();
  }, []);

  const fetchFortuneCookie = async () => {
    await checkToken();
    token = await getToken()
    try {
      const response = await fetch('http://carvedrem.kro.kr:8080/api/fortune', {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token[0]}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      return data;

    } catch (error) {
      console.error('Error fetching fortune cookie:', error);
        return 'Error retrieving fortune.';
    }
  };

  const [isTouched, setIsTouched] = useState(false);
  const [fortune, setFortune] = useState("");

  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    const fetch = await fetchFortuneCookie();
    console.log(fetch);
    if (fetch.information.content) {
      console.log("포춘 생성 완료");
      setFortune(fetch.information.content);
    } else {
      setFortune(fetch.information.answer);
    }
    setIsTouched(true);
    setLoading(false);
    // navigation.navigate('fortuneResult', { fortune: fortune });
  };

  return (
    <LinearGradient
        colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']}
        style={styles.linearGradient}
      >
        <View style={styles.topCtn}>
            <TopBar title="포춘쿠키"/>
        </View>

        <View style={styles.textCtn}>
          <Text style={styles.uesrText} >{userName}님을 위한 오늘의 포춘쿠키 </Text>
          <CurrentDateDisplay/>
        </View>

        <LoadingModal isVisible={loading} text={"포춘쿠키\n열어보는 중..."}/>

        {!isTouched ? (
          <TouchableOpacity style={styles.BtnCtn} onPress={handlePress}>
            <Image source={require('../../assets/images/fortuneGummi.png')} style={styles.fortuneImage}/>
            <Text style={styles.fortuneText}>터치해서 오늘의 포춘쿠키 확인하기</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.BtnCtn}>
            <Image source={require('../../assets/images/fortuneResult.png')} style={styles.fortuneImage}/>
            <ImageBackground
                source={require('../../assets/images/foutuneResultText.png')}
                style={styles.fortuneResult}>
                    <Text style={styles.fortuneText}>{fortune}</Text>
                    
            </ImageBackground>
          </View>
        )}

      </LinearGradient>
  );
}


const CurrentDateDisplay = () => {
  const currentDate = new Date();

  const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

  return (
      <Text style={styles.dateStyle}>
          {formattedDate}
      </Text>
  );
};

const styles = StyleSheet.create({ 
  linearGradient: {
    flex: 1,
    position: 'relative',
    width: screenWidth,
    height: screenHeight,
  },
  topCtn : {
    marginTop: 55
  },
  uesrText: {
    textAlign: 'center', 
    color: 'white', 
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 15
  },
  dateStyle: {
    textAlign: 'center', 
    color: 'white', 
    fontSize: 24, 
    fontWeight: '700'
  },
  textCtn: {
    width: 220,
    height: 70,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 35,
    marginLeft: 90,
  },
  fortuneImage:{
    width: 207, 
    height: 278,
    marginBottom: 0,
  },
  fortuneText:{
    color: '#434343', 
    fontSize: 16,
    fontWeight: '700',
    height: 'auto',
    width: 320,
    paddingRight: 10,
    textAlign: 'center',
    paddingBottom: 10,
  },
  BtnCtn: {
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 50,
  },
  fortuneResult: {
    width: 371, 
    height: 131,
    alignItems: 'center',
    justifyContent: 'center',
  }

});

export default CookieView;