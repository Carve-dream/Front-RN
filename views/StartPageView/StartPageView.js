import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StartPageView = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Main')} // 'Main'은 메인 화면으로 이동하기 위한 라우트 이름
      activeOpacity={0.7} // 클릭 시 불투명도 조절
    >
      <Text>Welcome to the Start Page</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default StartPageView;
