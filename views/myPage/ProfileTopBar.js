import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//상단바
const ProfileTopBar = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topCtn}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/back.png')} style={styles.back} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        {/* 수정 버튼 */}
        <TouchableOpacity style={styles.menuButton}  onPress={() => navigation.navigate('ProfileEditView')}>
          <Image source={require('../../assets/images/editIcon.png')} style={styles.edit} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center', 
    padding: 10,
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
  edit: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
  topCtn : {
    marginTop: 55,
    marginBottom: 20
  },
});

export default ProfileTopBar;