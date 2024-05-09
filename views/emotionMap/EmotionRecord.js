import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

//'../../assets/images/ellipse-blank.png'

// 일주일 간 감정 기록 이미지
const EmotionRecord = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/ellipse-blank.png')} style={styles.image} />
            <Image source={require('../../assets/images/ellipse-blank.png')} style={styles.image} />
            <Image source={require('../../assets/images/ellipse-blank.png')} style={styles.image} />
            <Image source={require('../../assets/images/ellipse-blank.png')} style={styles.image} />
            <Image source={require('../../assets/images/ellipse-blank.png')} style={styles.image} />
            <Image source={require('../../assets/images/ellipse-blank.png')} style={styles.image} />
            <Image source={require('../../assets/images/ellipse-blank.png')} style={styles.image} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 10,
        marginTop: 10,
    },
    eText: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 15,
    }
});

export default EmotionRecord;
