import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//상단바
const TopBar = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/back.png')} style={styles.back} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {/* 메뉴 버튼 */}
      <TouchableOpacity style={styles.menuButton}  onPress={() => navigation.navigate('Main')}>
        <Image source={require('../assets/images/close.png')} style={styles.close} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center', // 좌우 여백이 동일하도록 설정. menu기능 뺄 경우 center로 수정.
    padding: 10,
    height: 60,
  },
  headerContainer: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#464E82',
  },
  back:{
    width: 30,
    height: 30,
  },
  close: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
});

export default TopBar;