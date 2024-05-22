import React from 'react';
import { View,Text,Image,TouchableOpacity,StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { checkToken, getToken } from '../../ManageToken';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height; 

// 쿠키 화면 컴포넌트
const CookieView = () => {
  const navigation = useNavigation();


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

  const handlePress = async () => {
    const fortune = await fetchFortuneCookie();
    navigation.navigate('fortuneResult', { fortune });
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
          {/*사용자 이름 연결 */}
          <Text style={styles.uesrText} >  00님을 위한 오늘의 포춘쿠키 </Text>
          <CurrentDateDisplay/>
        </View>

        <TouchableOpacity style={styles.BtnCtn} onPress={handlePress}>
            <Image source = {require('../../assets/images/fortuneGummi.png')} style={styles.fortuneImage}/>
            <Text style={styles.fortuneText}>터치해서 오늘의 포춘쿠키 확인하기</Text>
        </TouchableOpacity>
        

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
    marginBottom: 40,
  },
  fortuneText:{
    color: '#434343', 
    fontSize: 16,
    fontWeight: '700',
  },
  BtnCtn: {
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 50,
  }

});

export default CookieView;