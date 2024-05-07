import React, { useState, useEffect } from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const StartPageView = () => {
  const navigation = useNavigation();

  // opacity 값을 관리할 상태 변수 생성
  const [fadeAnim] = useState(new Animated.Value(0)); // 투명도
  const [translateYAnim] = useState(new Animated.Value(30)); // Y축 이동 거리 (아래에서 위로)


  useEffect(() => {
    // 병렬로 두 애니메이션 실행
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);


  return (
    <ImageBackground
      source={require('../../assets/images/star.png')}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Second')}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']}
          style={styles.linearGradient}
        >
          <Animated.Text style={[styles.text, {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
          }]}>
            내가 꾼 꿈이 무슨 뜻인지{"\n"}궁금하신가요?
          </Animated.Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    height: 750,
  },
  touchable: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  linearGradient: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingTop: 360,
  },
  text: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

});

export default StartPageView;
