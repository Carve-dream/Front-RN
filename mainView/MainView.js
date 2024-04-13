import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { SquareButton, SearchInput}  from './SquareButton';
import MainViewModel from './MainViewModel';

const MainView = () => {
  const { searchQuery, setSearchQuery, handleSearch } = MainViewModel();

  return (
    <View style={styles.container}>
      <ButtonsView  
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      onButtonPress={handleSearch} 
      />
    </View>
  );
};



//MARK:- bottomView
const ButtonsView = ({ searchQuery, setSearchQuery, onButtonPress}) => {
    return (
        <View style={styles.BtnContainer}>
          <View style={styles.SearchBtnContainer}>
                <SearchInput 
                    placeholder="꾸미에게 물어보기"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onButtonPress={onButtonPress}
                />
          </View>
         <View style={styles.buttonContainer}>
            <SquareButton title="오늘의 일기" onPress={() => alert('오늘의 일기 버튼')} />
            <SquareButton title="감정 지도" onPress={() => alert('감정지도 버튼')} />
            <SquareButton title="포춘 쿠키" onPress={() => alert('포춘쿠키 버튼')} />
         </View>
      </View>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  BtnContainer: {
    maxWidth: 500,
    maxHeight: 400,
    marginBottom: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
}, 
SearchBtnContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 10,
  marginBottom: 50,
}
});

export default MainView;
