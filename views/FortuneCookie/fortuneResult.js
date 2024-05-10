import React from 'react';
import { View,Text,Image,StyleSheet, Dimensions, ImageBackground } from 'react-native';
import TopBar from '../../ChatView/TopBar';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height; 

// 쿠키 화면 컴포넌트
const FortuneResult = () => {

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

        <View style={styles.BtnCtn}>
            <Image source = {require('../../assets/images/fortuneResult.png')} style={styles.fortuneImage}/>
            <ImageBackground
                source = {require('../../assets/images/foutuneResultText.png')}
                style={styles.fortuneResult}>
                    {/*포춘쿠키 결과 텍스트 연결 */}
                    <Text style={styles.fortuneText}>마음을 편하게 먹고 조급해하지 마세요</Text>
            </ImageBackground>
            
        </View>
        

      </LinearGradient>
            
  );


  

}

// 오늘의 날짜 가져오기
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
  },
  fortuneText:{
    color: '#434343', 
    fontSize: 16,
    fontWeight: '700',
    marginTop: 55,
    marginLeft: 65
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
    marginBottom: 30
  }

});

export default FortuneResult;