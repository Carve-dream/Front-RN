import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//테스트 컴포넌트 파일 (바텀 네바게이션 바)

// 홈 예시
const HomeScreen = () => {
  useEffect(() => {
    console.log('홈 버튼이 눌렸습니다.');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>홈 버튼이 눌렸습니다</Text>
    </View>
  );
};

// 일기 목록 예시
const DreamListScreen = () => {
  useEffect(() => {
    console.log('일기 목록 버튼이 눌렸습니다.');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>일기 목록 버튼이 눌렸습니다</Text>
    </View>
  );
};

// 일기 작성 버튼 예시 (중앙 플러스 버튼에 대응)
const EmptyScreen = () => {
  useEffect(() => {
    console.log('일기 작성 버튼이 눌렸습니다.');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>일기 작성 버튼이 눌렸습니다.</Text>
    </View>
  );
};

// 감정지도 예시
const EmotionMapScreen = () => {
  useEffect(() => {
    console.log('감정지도 버튼이 눌렸습니다.');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>감정지도 버튼이 눌렸습니다.</Text>
    </View>
  );
};

// 마이페이지 예시
const MyPageScreen = () => {
  useEffect(() => {
    console.log('마이페이지 버튼이 눌렸습니다.');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>마이페이지 버튼이 눌렸습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: 200, 
      height: 40,
      alignItems: 'center', 
      padding: 10, 
      borderWidth: 1, 
      borderColor: '#ccc', 
    },
    text: {
      fontSize: 12, 
    }
  });
export { HomeScreen, DreamListScreen, EmptyScreen, EmotionMapScreen, MyPageScreen };
