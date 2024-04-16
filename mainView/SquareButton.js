import React from "react";
import { TouchableOpacity, Text,ImageBackground, StyleSheet, TextInput, View, Image } from "react-native";

//상단 버튼 2개 컴포넌트 : 대화목록, 오늘의 포춘쿠키
const SquareButton = ({title, onPress, imageSource}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Image source={imageSource} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

// 챗봇 버튼 컴포넌트
const BubbleButton = ({ onPress, bubbleText, buttonText, bubbleImageSource }) => {
    return (
      <View style={styles.bubbleContainer}>
      <ImageBackground source={bubbleImageSource} style={styles.bubbleImage} resizeMode="cover">
        <Text style={styles.bubbleText}>{bubbleText}</Text>
        <TouchableOpacity style={styles.talkButton} onPress={onPress}>
          <Text style={styles.talkButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>

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
      width: 140,
      height:40,
      backgroundColor: '#D9D9D9',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 40,
      borderRadius: 10
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
      },
      buttonImage: {
        width: 25,
        height: 25,
        marginRight: 17
      },
      buttonText: {
      fontSize: 14,
      color: '#424242', 
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
      }, 
      bubbleContainer: {
        width: 440,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bubbleImage: {
        width: 258,
        height: 113,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bubbleText: {
        color: '#424242',
        fontSize: 16,
        position: 'absolute',
        top: 12, 
        textAlign: 'center',
      },
      talkButton: {
        marginTop: 10,
        backgroundColor: '#89898B', 
        paddingHorizontal: 30,
        paddingVertical: 7,
        borderRadius: 10,
      }, 
      talkButtonText: {
        fontSize: 16,
        color: '#F2F2F2', // 글씨색은 상황에 맞게 조정
      },
  });
  
 export {SquareButton, SearchInput, BubbleButton};