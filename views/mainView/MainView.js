import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import { SquareButton, BubbleButton } from './SquareButton';
import MainViewModel from './MainViewModel';
import CustomTabBar from '../../CustomTabBar/CustomTabBar.js';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width; // 전체 화면 너비 가져오기
const screenHeight = Dimensions.get('window').height; // 전체 화면 높이 가져오기

const MainView = () => {
  const { searchQuery, setSearchQuery, handleSearch } = MainViewModel();

  return (


    <LinearGradient
      colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']}
      style={styles.linearGradient}
    >
      <ImageBackground
        source={require('../../assets/images/cloud.png')}
        style={styles.backcontainer}
      >
        <View style={styles.container}>
          <ButtonsView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onButtonPress={handleSearch}
            style={styles.buttonsView}
          />
        </View>
        <View style={styles.customTabBarContainer}>
          <CustomTabBar />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};



//MARK:- bottomView
const ButtonsView = ({ searchQuery, setSearchQuery, onButtonPress }) => {
  const navigation = useNavigation();

  const handleChatNavigation = () => {
    navigation.navigate('ChatView'); // 네비게이션 스택에 정의된 정확한 화면 이름 사용
  };
  const handleFortuneCookiePress = () => {
    navigation.navigate('CookieViewStack');
  };
  return (
    <View style={styles.BtnContainer}>
      <View style={styles.TopBtnContainer}>
        <SquareButton
          onPress={handleFortuneCookiePress}
          title="오늘의 포춘쿠키"
          imageSource={require('../../assets/images/cookie.png')}
        />
      </View>
      <View style={styles.ggumiContainer}>
        <BubbleButton
          onPress={handleChatNavigation}
          bubbleText="오늘은 어떤 꿈을 꾸셨나요?"
          buttonText="꾸미와 이야기하기"
          bubbleImageSource={require('../../assets/images/TalkBtn.png')}
        />
        <View style={styles.square}>
          <Image
            source={require('../../assets/images/ggumi.png')}
            style={styles.image}
            resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  backcontainer: {
    flex: 1,
    height: 750,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 150
  },
  customTabBarContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
  },
  buttonsView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  linearGradient: {
    flex: 1,
    position: 'relative',
    width: screenWidth,
    height: screenHeight,
  },
  BtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -120

  },
  TopBtnContainer: {
    flexDirection: 'row',
    marginTop: 50,
    width: '100%',
    marginBottom: 140,
    marginLeft: 190
  },
  ggumiContainer: {
    maxHeight: 436,
    maxWidth: 258,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 47,
    paddingTop: 140
  },
  square: {
    width: 207,
    height: 246,
    alignSelf: 'center'
  },
  image: {
    width: 207,
    height: 278,
  }

});

export default MainView;