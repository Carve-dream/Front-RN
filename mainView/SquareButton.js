import React from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput, View } from "react-native";

//정사각형 모양의 3가지 버튼 컴포넌트
const SquareButton = ({title, onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

// 검색 입력창 컴포넌트
const SearchInput = ({ placeholder, onChangeText, value, onButtonPress }) => {
    return (
        <View style={styles.inputBtnContainer}>
            <TextInput 
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
            />
            <TouchableOpacity style={styles.searchButton} onPress={onButtonPress}>
                <Text style={styles.text}>🔍</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
      flex: 1, 
      minHeight: 100,
      minWidth: 100,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    text: {
      fontSize: 16,
      color: 'black', 
    },
    input: {
        height: 50,
        flex: 1,
        marginHorizontal: 10,
        paddingLeft: 5,
        borderColor: 'gray',
      },
      searchButton: {
        padding: 10,
      },
      inputBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 300,
      }
  });
  
 export {SquareButton, SearchInput};