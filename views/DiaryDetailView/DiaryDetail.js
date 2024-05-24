import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Dimensions} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import { fetchDiaryData } from '../../api/fetchDiaryData';

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

//전체 뷰
const DiaryDetail = (props) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        const getData = async (id) => {
            const tmp = await fetchDiaryData(id);
            setData(tmp);
            setLoading(false);
        }
        if (isFocused) {
            getData(props.route.params.id);
        }
    }, [isFocused])

    if (loading) {
        return(
            <View style={styles.fullScreen}>
                <View style={styles.topCtn}>
                    <TopBar navigation={navigation} title="0000-00-00"/>
                </View>
                <FullScreen data={null}/>
            </View>
        );
    }

    return(
        <View style={styles.fullScreen}>
            <View style={styles.topCtn}>
                <TopBar navigation={navigation} title={data.information.date}/>
            </View>
            <FullScreen data={data.information}/>
        </View>
    );
};


//전체 뷰 정리 (탑바, 저장하기 버튼)
const FullScreen = ({data}) => {
    return(
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.mainBoxCtn}>
                <MainBoard data={data}/>
            </View>
            <View style={styles.saveCtn}>
                    <SaveBtn data={data}/>
            </View>
        </ScrollView>
    );
}


//일기 디테일 보드
const MainBoard = ({data}) => {
    if (data == null) {
        return (
            <View style={styles.boxCtn}>
                <View style={styles.mainBox}>
                    <DiaryTop title="" emotion=""/>
                    <SleepTimePicker/>
                    <DiaryEntry/>
                    <ImageBox/>
                    <DreamInterpret/>
                    <TagManager/>
                    
                </View>
            </View>
        )
    }
    return(
        <View style={styles.boxCtn}>
            <View style={styles.mainBox}>
                <DiaryTop title={data.title} emotion={data.emotion}/>
                <SleepTimePicker start={data.start_sleep} end={data.end_sleep}/>
                <DiaryEntry content={data.content}/>
                <ImageBox imageSource={data.image_url}/>
                <DreamInterpret interpret={data.interpretation}/>
                <TagManager tags={data.tags}/>
                
            </View>
        </View>
    );
}


//제목, 오늘의 감정
const DiaryTop = ({title, emotion}) => {
    // const [title, setTitle] = useState("");
    // const [emotionModalVisible, setEmotionModalVisible] = useState(false);
    // const [selectedEmotion, setSelectedEmotion] = useState(null);
    // const [selectedImage, setSelectedImage] = useState(null);

    const emotionDict = {
        "FEAR": "두려워요",
        "YEARNING": "그리워요",
        "JOY": "기뻐요",
        "ANGER": "화나요",
        "AWKWARDNESS": "찝찝해요",
        "ABSURDITY": "황당해요",
        "EXCITED": "흥분돼요",
        "THRILL": "설레요",
        "MYSTERY": "미스테리해요",
    };

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

    let emotionImage;

    emotions.forEach((e) => {
        (e.text == emotionDict[emotion]) ? (emotionImage = e.image) : ()=>{}
    })

    return (
        <View style={styles.diaryTopCtn}>
            <Text style={styles.input} placeholderTextColor="#434343">{title}</Text>

            <View style={styles.iconCtn}>
                <Text style={styles.iconText}>오늘의 감정</Text>
                <Image source={emotionImage} style={styles.emotionImage} />
            </View>

            {/* <EmotionPickerModal 
                emotionModalVisible={emotionModalVisible}
                setEmotionModalVisible={setEmotionModalVisible}
                setSelectedEmotion={setSelectedEmotion}
                setSelectedImage={setSelectedImage}
            /> */}
        </View>
    );
};

//시간 작성 => 서버 연결 후 저장페이지에서 작성한 시간으로 띄우기 수정!
const SleepTimePicker = ({start, end}) => {
    // const [isBedTimePickerVisible, setBedTimePickerVisibility] = useState(false);
    // const [isWakeTimePickerVisible, setWakeTimePickerVisibility] = useState(false);
    // const [bedTime, setBedTime] = useState(new Date());
    // const [wakeTime, setWakeTime] = useState(new Date());

    // const showBedTimePicker = () => {
    //     setBedTimePickerVisibility(true);
    // };

    // const hideBedTimePicker = () => {
    //     setBedTimePickerVisibility(false);
    // };

    // const handleConfirmBedTime = (date) => {
    //     setBedTime(date);
    //     hideBedTimePicker();
    // };

    // const showWakeTimePicker = () => {
    //     setWakeTimePickerVisibility(true);
    // };

    // const hideWakeTimePicker = () => {
    //     setWakeTimePickerVisibility(false);
    // };

    // const handleConfirmWakeTime = (date) => {
    //     setWakeTime(date);
    //     hideWakeTimePicker();
    // };

    return (
    <View style={styles.timeCtn}>
        <View style={styles.touchable}>
            <Text style={styles.text}>취침 시간</Text>
            <Text style={styles.text}>{start}</Text>
        </View>
        {/* <DateTimePickerModal
            isVisible={isBedTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmBedTime}
            onCancel={hideBedTimePicker}
            headerTextIOS="취침 시작시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        /> */}

        <View style={styles.touchable}>
            <Text style={styles.text}>기상 시간</Text>
            <Text style={styles.text}>{end}</Text>
        </View>
        {/* <DateTimePickerModal
            isVisible={isWakeTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmWakeTime}
            onCancel={hideWakeTimePicker}
            headerTextIOS="일어난 시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        /> */}
    </View>
    );
};


//일기 작성 => 저장한 일기 내용 띄우기 수정
const DiaryEntry = ({content}) => {
    // const [diaryText, setDiaryText] = useState('');
    // const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.textInputWrapper} activeOpacity={1}>
                <View style={styles.placeholderContainer}>
                    <Text style={styles.titlePlaceholder}>일기내용</Text>
                    <Text style={styles.subtitlePlaceholder}>{content}</Text>
                </View>
                {/* <TextInput
                    style={styles.textInput}
                    multiline
                    onChangeText={text => setDiaryText(text)}
                    value={diaryText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(diaryText !== '')}
                /> */}
            </TouchableOpacity>
        </View>
    );
};


//이미지 박스
const ImageBox = ({ imageSource }) => {
    // const [imageSource, setImageSource] = useState("");

    return (
        <View style={styles.imageCtn}>
            <View style={styles.imageBoxCtn}>
                <Text style={styles.imageholder}>사진</Text>
                {imageSource ? (
                    <Image src={imageSource} style={styles.image}/>
                
                ) : (
                    <>
                        <Text style={styles.imageSubtitlePlaceholder}>앗 아직 꿈 이미지가 만들어지지 않았어요{'\n'}꿈 이미지 생성하기 버튼으로 꿈 이미지를 생성해보세요!</Text>
                        <Image source = {require('../../assets/images/gummiEmpty.png')} style={styles.emptyImage}/>
                    </>
                )}
            </View>
        </View>
    );
};

//꾸미 분석 내용 
const DreamInterpret = ({interpret}) => {
    // const [text, setText] = useState('');

    return (
        <View style={styles.DreamCtn}>
            
            <View style={styles.imageBoxCtn}>
                <Text style={styles.imageholder}>꾸미 분석 내용</Text>
                {!interpret ? (
                    <>
                        <Text style={styles.imageSubtitlePlaceholder}>아직 꿈 해몽 내용이 없어요{'\n'}꿈 해몽하기 버튼으로 꿈 해몽 내용을 확인해보세요! </Text>
                        <Image source = {require('../../assets/images/gummiEmpty.png')} style={styles.emptyImage}/>
                    </>
                    ) : (
                        <Text style={styles.interpretSubtitlePlaceholder}>{interpret}</Text>
                    )}
            </View>
            
        </View>
    );
}

//태그 => 저장된 테그 띄우기 수정!
const TagManager = ({tags}) => {
    // const [modalVisible, setModalVisible] = useState(false);
    // const [tagText, setTagText] = useState('');
    // const [tags, setTags] = useState([]);

    // const addTag = () => {
    //     if (tagText.trim() !== '') {
    //         setTags([...tags, `#${tagText.trim()}`]);
    //         setTagText(''); // 입력 필드 초기화
    //         setModalVisible(false); // 모달 숨기기
    //     }
    // };

    // const removeTag = (index) => {
    //     setTags(tags.filter((_, idx) => idx !== index));
    // };

    if (!tags) {
        return (
            <View style={styles.tagCtn} >
            <Text style={styles.tags}>태그</Text>

            <ScrollView horizontal style={styles.tagContainer}>
            {/* <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ 추가하기</Text>
            </TouchableOpacity> */}
                
            </ScrollView>
        </View>
        )
    }

    return (
        <View style={styles.tagCtn} >
            <Text style={styles.tags} >태그</Text>

            <ScrollView horizontal style={styles.tagContainer} showsHorizontalScrollIndicator={false}>
            {/* <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ 추가하기</Text>
            </TouchableOpacity> */}
                {tags.map((tag, index) => (
                    <View key={index} style={styles.addButton}>
                        <Text style={styles.addButtonText}>{tag}</Text>
                        {/* <TouchableOpacity style={styles.deleteButton} onPress={() => removeTag(index)}>
                            <Text style={styles.deleteButtonText}>x</Text>
                        </TouchableOpacity> */}
                    </View>
                ))}
            </ScrollView>

            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.Taginput}
                        placeholder="#"
                        value={tagText}
                        onChangeText={setTagText}
                        autoFocus={true}
                        onSubmitEditing={addTag}
                    />
                    <TouchableOpacity style={styles.button} onPress={addTag}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal> */}
        </View>
    );
};


//꿈 이미지 생성하기, 꿈 해몽하기 버튼
const SaveBtn = ({data}) => {
    const navigation = useNavigation();

    if (data) {
        return(
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('DiaryImageProduce', data)} style={styles.confirmButton}>
                    <Text style={styles.confirmText}>꿈 이미지 생성하기</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('DreamInterpret', data)} style={styles.confirmButton}>
                    <Text style={styles.confirmText}>꿈 해몽하기</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}




const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#464E82',
        width: screenWidth,
        height: screenHeight,
        
    },
    container: {
      flex:1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    topCtn : {
        marginTop: 55,
        marginBottom: 20
    },
    boxCtn: {
        justifyContent: 'center',
        alignItems: 'center',
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
        minHeight: 530,
        minWidth: 360,
        alignItems: 'center'
    },
    mainBoxCtn: {
        flex: 1,
        width: '100%',
    },
    input: {
        width: 330, 
        height: 35, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: "center",
        marginTop: 5,
        paddingLeft: 15,
        paddingTop: 6,
        fontSize: 15, 
        fontWeight: '700',
        textAlign: 'left',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    diaryTopCtn:{
        width: 340, 
        height: 90, 
        margin:10,
        marginLeft: 14,
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    iconCtn : {
        width: 140, 
        height: 35, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15
    },
    iconText:{
        color: '#434343',
        fontSize: 15, 
        fontWeight: '700',
        marginLeft: 15,
        marginRight: 27,
    },
    emotionImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    touchable: {
        width: 130, 
        height: 66, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: "center",
        padding: 10,
        marginBottom:20,
    },
    text: {
        fontSize: 15, 
        fontWeight: '700',
        color: '#434343',
        padding: 3,
        marginBottom: -3
    },
    timeCtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 320,
        marginHorizontal: 'auto',
        margin:5,
    },
    textInputWrapper: {
        width: 323, 
        height: 'auto', 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    placeholderContainer: {
        top: 0,
        height: 'auto',
        alignItems: 'center',
    },
    titlePlaceholder: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '600', 
        marginBottom: 25,
        marginTop: 10
    },
    subtitlePlaceholder: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
        lineHeight: 14,
        width: 300,
    },


    imageCtn: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: 10
    },
    
    DreamCtn: {
        marginTop: 10
    },
 
    imageBoxCtn: {
        width: 325, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        paddingHorizontal: 40,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 110,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    imageholder:{
        fontSize: 14,
        color: '#333333',
        fontWeight: '600', 
        marginBottom: 25,
    },
    imageSubtitlePlaceholder: {
        fontSize: 14,
        marginTop: 15,
        color: '#89898B',
        fontWeight: '600',
        textAlign: 'center',
        width: 325,
    },
    interpretSubtitlePlaceholder: {
        fontSize: 14,
        marginTop: 15,
        color: '#89898B',
        fontWeight: '600',
        textAlign: 'center',
        width: 300,
    },
    image:{
        width: 200,
        height: 200,
    },
    emptyImage:{
        width: 100, 
        height: 140, 
    },



    tags:{
        color: '#434343', 
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        marginTop:8
    },
    textInput: {
        height: '100%',
        fontSize: 16,
        color: 'black',
        textAlignVertical: 'top'
    },

    tagCtn:{
        width: 325, 
        height: 73, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        marginTop: 25,
        marginBottom: 20
    },

    addButton: {
        width: 88, 
        height: 30,
        backgroundColor: '#C1C7F8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:7,
    },
    addButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        marginBottom:-10
    },
    deleteButtonText: {
        color: 'white',
        paddingHorizontal: 5,
        fontSize: 12,
        marginLeft:55,
        marginTop: -20
    },
    tagContainer: {
        marginTop: 10,
        minHeight: 40,
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    Taginput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 200,
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 5,
        marginBottom: 20,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#434343',
    },
    confirmButton: {
        width: 240,
        height: 40,
        padding: 10,
        backgroundColor: '#EF82A1',
        borderRadius: 10,
        marginBottom: 15
    },
    confirmText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    saveCtn: {
        marginTop: 40,
        flexDirection: 'column',
        marginLeft: 72
    }
});

export default DiaryDetail;