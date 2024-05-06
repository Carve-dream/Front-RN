import React from 'react';
import { View, Text,Image, TouchableOpacity, Modal, StyleSheet} from 'react-native';


    // 이모티콘 및 해당 이미지 목록
    const emotions = [
        { text: '설레요', image: require('../../assets/emoji/happy.png') },
        { text: '그리워요', image: require('../../assets/emoji/miss.png') },
        { text: '두려워요', image: require('../../assets/emoji/scared.png') },
        { text: '찝찝해요', image: require('../../assets/emoji/uncomfortable.png') },
        { text: '미스테리해요', image: require('../../assets/emoji/mysterious.png') },
        { text: '황당해요', image: require('../../assets/emoji/confused.png') },
        { text: '흥분돼요', image: require('../../assets/emoji/excited.png') },
        { text: '기뻐요', image: require('../../assets/emoji/glad.png') },
        { text: '화나요', image: require('../../assets/emoji/angry.png') }
     ];


    //감정 선택 모달
    const EmotionPickerModal = ({emotionModalVisible, setEmotionModalVisible, setSelectedEmotion, setSelectedImage }) => {

        const handleSelectEmotion = (emotion) => {
            setSelectedEmotion(emotion.text);
            setSelectedImage(emotion.image);
            setEmotionModalVisible(false);
        };

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={emotionModalVisible}
                onRequestClose={() => {
                    setEmotionModalVisible(!emotionModalVisible);
                }}
            >
             <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {emotions.map((emotion, index) => (
                        <TouchableOpacity key={index} style={styles.button} onPress={() => handleSelectEmotion(emotion)}>
                            <Image source={emotion.image} style={styles.image} />
                            <Text>{emotion.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};
    const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        width: '30%', 
        margin: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 5 
    },
    text: {
        fontSize: 14
    }
});


export default EmotionPickerModal;


