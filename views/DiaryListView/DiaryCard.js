// DiaryCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DiaryCard = () => {
    return (
        <View>
            <View style={styles.date}>
                <Text style={styles.datetext}>2024.04.15</Text>
            </View>

            <View style={styles.card}>
                <Text>오늘의 꿈 일기 </Text>
                <Image source={require('../../assets/images/test.png')} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>나는 오늘 하늘을 나는 꿈을 꿨다.</Text>
                </View>
             </View>
        </View>
        


        
    );
};



/*const DiaryCard = ({imageSource={require('../../assets/images/cookie.png') diary }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: diary.image_url }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{diary.title}</Text>
                <Text>{diary.content}</Text>
                <Text>{`Date: ${diary.date}`}</Text>
                <Text>{`Emotion: ${diary.emotion}`}</Text>
            </View>
        </View>
    );
}; */




const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 50
    },
    date: {
        flexDirection: 'row',
        width: 188,
        height:24,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 20,
        marginLeft:31,
        justifyContent: 'center',
        alignItems: 'center'
    },
    datetext:{
        textAlign: 'center', 
        color: '#333333',
        fontSize: 14, 
        fontWeight: '400'
    },
    image: {
        width: 300,
        height: 170,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    infoContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 13,
    }
});

export default DiaryCard;
