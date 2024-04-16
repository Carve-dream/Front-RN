import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { SquareButton, BubbleButton}  from './SquareButton';
import MainViewModel from './MainViewModel'; 
import { NavigationContainer } from '@react-navigation/native';
import CustomTabBar from '../CustomTabBar/CustomTabBar.js';


const MainView = () => {
  const { searchQuery, setSearchQuery, handleSearch } = MainViewModel();

  return (
    <NavigationContainer>
      <View style={styles.container}>
      <ButtonsView  
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onButtonPress={handleSearch} 
      />
      </View>
    <CustomTabBar />
  </NavigationContainer>
  );
};


//MARK:- bottomView
const ButtonsView = ({ searchQuery, setSearchQuery, onButtonPress }) => {
  return (
    <View style={styles.BtnContainer}>
      <View style={styles.TopBtnContainer}>
        <SquareButton
          onPress={() => setSearchQuery(searchQuery)}
          title="대화목록 보기"
          imageSource={require('../assets/images/primary.png')}  // 프로젝트 루트를 기준으로 한 상대 경로
        />
        <SquareButton
          onPress={onButtonPress}
          title="오늘의 포춘쿠키"
          imageSource={require('../assets/images/primary.png')}  // 프로젝트 루트를 기준으로 한 상대 경로
        />
      </View>
      <BubbleButton
        onPress={onButtonPress}
        bubbleText="오늘은 어떤 꿈을 꾸셨나요?"
        buttonText="꾸미와 이야기하기"
        bubbleImageSource={require('../assets/images/TalkBtn.png')}  // 프로젝트 루트를 기준으로 한 상대 경로
      />
      <View style={styles.square}></View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  BtnContainer: {
    flex: 1,
  },
  TopBtnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginBottom: 60,
    width: '100%'
  },
  square: {
    width: 207,
    height: 246,
    backgroundColor: '#D9D9D9',
    marginLeft: 115
  }
});

export default MainView;
