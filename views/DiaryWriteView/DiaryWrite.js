import React from 'react';
import { View, Button, StyleSheet, Text, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width; // 전체 화면 너비 가져오기
const screenHeight = Dimensions.get('window').height; 

const DiaryWrite = () => {
    return(
        <View style={styles.container}>
            <MainBoard/>
        </View>
    );
};

const MainBoard = () => {
    return(
        <View style={styles.boxCtn}>
            <View style={styles.mainBox}>
                <Text>뭐지</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#464E82',
      position: 'relative',
      width: screenWidth,
      height: screenHeight,
    },
    boxCtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 600
    },
    mainBox: {
        flexDirection: 'column',
        flex: 1,
        width: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        minHeight: 300,
        minWidth: 9,
        alignItems: 'center'
    }
});

export default DiaryWrite;