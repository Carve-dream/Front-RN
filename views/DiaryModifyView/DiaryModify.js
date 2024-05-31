import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Dimensions} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import EmotionPickerModal from '../DiaryWriteView/EmotionModal';
import { fetchDiaryData } from '../../api/fetchDiaryData';
import { checkToken, getToken } from '../../ManageToken';

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

//전체 뷰
const DiaryModify = (props) => {
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
        return (
            <View style={styles.fullScreen}>
                <View style={styles.topCtn}>
                    <TopBar title="0000-00-00"/>
                </View>
                <FullScreen/>
            </View>
        )
    }

    return(
        <View style={styles.fullScreen}>
            <View style={styles.topCtn}>
                <TopBar title={data.information.date}/>
            </View>
            <FullScreen data={data.information}/>
        </View>
    );
};

//전체 뷰 정리 (탑바, 저장하기 버튼)
const FullScreen = ({data}) => {

    const diaryTitle = useState(null);
    const selectedEmotion = useState(null);
    const bedTime = useState("00:00");
    const wakeTime = useState("00:00");
    const diaryText = useState(null);
    const imageSource = useState(null);
    const text = useState(null);
    const tags = useState([]);

    const diaryId = useState(null);
    const diaryDate = useState(null);

    useEffect(() => {
        if (data) {
            diaryTitle[1](data.title);
            selectedEmotion[1](data.emotion);
            bedTime[1](data.start_sleep);
            wakeTime[1](data.end_sleep);
            diaryText[1](data.content);
            imageSource[1](data.image_url);
            text[1](data.interpretation);
            tags[1](data.tags ? data.tags : []);

            diaryId[1](data.id);
            diaryDate[1](data.date);
        }
    }, [data])

    const setter = {
        diaryTitle: diaryTitle, 
        selectedEmotion: selectedEmotion, 
        bedTime: bedTime, 
        wakeTime: wakeTime, 
        diaryText: diaryText, 
        imageSource: imageSource, 
        text: text, 
        tags: tags
    };

    return(
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainBoxCtn}>
            <MainBoard setter={setter} data={data}/>
        </View>
        <View style={styles.saveCtn}>
            <SaveBtn setter={setter} id={diaryId[0]} date={diaryDate[0]}/>
        </View>
    </ScrollView>
    );
}

//일기 수정 보드
const MainBoard = ({setter, data}) => {
    return(
        <View style={styles.boxCtn}>
            <View style={styles.mainBox}>
                <DiaryTop pDiaryTitle={setter.diaryTitle} pSelectedEmotion={setter.selectedEmotion}/>
                <SleepTimePicker pBedTime={setter.bedTime} pWakeTime={setter.wakeTime}/>
                <DiaryEntry pDiaryText={setter.diaryText}/>
                <ImageBox pImageSource={setter.imageSource} data={data}/>
                <DreamInterpret pText={setter.text} data={data}/>
                <TagManager pTags={setter.tags}/>
                
            </View>
        </View>
    );
}


//제목, 오늘의 감정
const DiaryTop = ({pDiaryTitle, pSelectedEmotion}) => {

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

    const [diaryTitle, setDiaryTitle] = pDiaryTitle;
    const [emotionModalVisible, setEmotionModalVisible] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = pSelectedEmotion;
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        emotions.forEach((e) => {
            (e.text == emotionDict[selectedEmotion]) ? (setSelectedImage(e.image)) : ()=>{}
        })
    })

    return (
        <View style={styles.diaryTopCtn}>
            <TextInput
                // value={diaryTitle}
                defaultValue={diaryTitle}
                onChangeText={setDiaryTitle}
                style={styles.input}
                placeholderTextColor="#434343"
            />

            <TouchableOpacity onPress={() => setEmotionModalVisible(true)} style={styles.iconCtn}>
                <Text style={styles.iconText}>오늘의 감정</Text>
                {selectedImage && <Image source={selectedImage} style={styles.emotionImage} />}
            </TouchableOpacity>

            <EmotionPickerModal 
                emotionModalVisible={emotionModalVisible}
                setEmotionModalVisible={setEmotionModalVisible}
                setSelectedEmotion={setSelectedEmotion}
                setSelectedImage={setSelectedImage}
            />
        </View>
    );
};

//시간 작성
const SleepTimePicker = ({pBedTime, pWakeTime}) => {
    const [isBedTimePickerVisible, setBedTimePickerVisibility] = useState(false);
    const [isWakeTimePickerVisible, setWakeTimePickerVisibility] = useState(false);
    const [bedTime, setBedTime] = pBedTime;
    const [wakeTime, setWakeTime] = pWakeTime;

    const showBedTimePicker = () => {
        setBedTimePickerVisibility(true);
    };

    const hideBedTimePicker = () => {
        setBedTimePickerVisibility(false);
    };

    const handleConfirmBedTime = (date) => {
        setBedTime(` ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`);
        hideBedTimePicker();
    };

    const showWakeTimePicker = () => {
        setWakeTimePickerVisibility(true);
    };

    const hideWakeTimePicker = () => {
        setWakeTimePickerVisibility(false);
    };

    const handleConfirmWakeTime = (date) => {
        setWakeTime(` ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`);
        hideWakeTimePicker();
    };

    return (
    <View style={styles.timeCtn}>
        <TouchableOpacity style={styles.touchable} onPress={showBedTimePicker}>
            <Text style={styles.text}>취침 시간</Text>
            <Text style={styles.text}>{bedTime}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isBedTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmBedTime}
            onCancel={hideBedTimePicker}
            headerTextIOS="취침 시작시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        />

        <TouchableOpacity style={styles.touchable} onPress={showWakeTimePicker}>
            <Text style={styles.text}>기상 시간</Text>
            <Text style={styles.text}>{wakeTime}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isWakeTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmWakeTime}
            onCancel={hideWakeTimePicker}
            headerTextIOS="일어난 시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        />
    </View>
    );
};


//일기 작성
const DiaryEntry = ({pDiaryText}) => {
    const [diaryText, setDiaryText] = pDiaryText;

    return (
        <View>
            <View style={styles.textInputWrapper}>
                
                <View style={styles.placeholderContainer}>
                    <Text style={styles.titlePlaceholder}>일기내용</Text>
                    
                    <TextInput
                        style={styles.textInput}
                        multiline
                        onChangeText={setDiaryText}
                        defaultValue={diaryText}
                    />
                
                </View>
                
            </View>
        </View>
    );
};


const ModifyBtn = ({ onPress, imageSource }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={imageSource} style={styles.modifyBtnImage} />
        </TouchableOpacity>
    );
};

const deleteImgIpt = async (mode, id) => {

    let dest;

    if (mode == 'image') {
        dest = {
            'id': id,
            'url': null,
        }
    } else {
        dest = {
            'id': id,
            'content': null,
        }
    }

    await checkToken();
    const [accessToken, refreshToken] = await getToken();
    const response = fetch('http://carvedrem.kro.kr:8080/api/diary/' + mode, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(dest),
    });
    response.then(result => result.json()).then(res => {
        console.log(res);
        if (res.check != null && res.check == false) {
            console.log(mode + " 삭제 실패");
        } else {
            console.log(mode + " 삭제 성공");
        }
    });
}

//이미지 박스
const ImageBox = ({ pImageSource, data }) => {
    const [imageSource, setImageSource] = pImageSource;
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleModify = () => {
        // 사진 수정 로직 
        setModalVisible(false);
        navigation.navigate('DiaryImageProduce', data)
    };

    const handleDelete = async (id) => {
        // 삭제 로직
        setDeleteModalVisible(false);
        await deleteImgIpt('image', id);
        setImageSource(null);
    };

    return (
        <View style={styles.imageCtn}>
            
            <View style={styles.imageBoxCtn}>
                <View style={styles.modifyTop}>
                    <Text style={styles.imageholder}>사진</Text>
                    <View style={styles.btnCtn}>
                        <ModifyBtn onPress={() => setModalVisible(true)} imageSource={require('../../assets/images/modify.png')} />
                        <ModifyBtn onPress={() => setDeleteModalVisible(true)} imageSource={require('../../assets/images/delete.png')} />
                    </View>
                </View>
                {imageSource ? (
                    <Image src={imageSource} style={styles.image} />
                ) : (
                    <>
                        <Text style={styles.imageSubtitlePlaceholder}>만들어진 꿈 이미지가 존재하지 않아요</Text>
                        <Image source = {require('../../assets/images/gummiEmpty.png')} style={styles.emptyImage}/>
                    </>
                )}
            </View>
        

            {/* 수정 확인 모달 */}
             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <Image source = {require('../../assets/images/gummiCheck.png')} style={styles.CheckImage}/>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>꿈 사진을 수정하시겠습니까? {'\n'}{'\n'} 수정을 진행하면 현재 꿈 사진이 삭제되고 {'\n'} 새 사진으로 바뀌어요!</Text>
                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity style={styles.modalButtonCheck} onPress={handleModify}>
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

             {/* 삭제 확인 모달 */}
             <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <Image source = {require('../../assets/images/gummiCheck.png')} style={styles.CheckImage}/>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>꿈 사진을 삭제하시겠습니까? {'\n'}{'\n'} 한 번 삭제한 사진은 다시 복구가 불가능해요!</Text>
                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity style={styles.modalButtonCheck} onPress={() => handleDelete(data.id)}>
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setDeleteModalVisible(false)}>
                                <Text style={styles.modalButtonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};



//꾸미 분석 내용 
const DreamInterpret = ({pText, data}) => {
    const [text, setText] = pText;
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleModify = () => {
        // 해몽 수정 로직
        setModalVisible(false);
        navigation.navigate('DreamInterpret', data)
        
    };
    const handleDelete = async (id) => {
        // 해몽 삭제 로직
        setDeleteModalVisible(false);
        await deleteImgIpt('interpretation', id);
        setText(null);
    };
    

    return (
        <View style={styles.DreamCtn}>

            <View style={styles.imageBoxCtn}>
                <View style={styles.modifyTop}>
                    <Text style={styles.imageholder}>꾸미 분석 내용</Text>
                    <View style={styles.btnCtn}>
                        <ModifyBtn onPress={() => setModalVisible(true)} imageSource={require('../../assets/images/modify.png')} />
                        <ModifyBtn onPress={() => setDeleteModalVisible(true)} imageSource={require('../../assets/images/delete.png')} />
                    </View>
                </View>
                {text ? (
                    <Text style={styles.interpretText}>{text}</Text>
                ) : (
                    <>
                        <Text style={styles.imageSubtitlePlaceholder}>꾸미 분석 내용이 존재하지 않아요</Text>
                        <Image source = {require('../../assets/images/gummiEmpty.png')} style={styles.emptyImage}/>
                    </>
                )}
            </View>


             {/* 수정 확인 모달 */}
             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <Image source = {require('../../assets/images/gummiCheck.png')} style={styles.CheckImage}/>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>꾸미 분석 내용을 수정하시겠습니까? {'\n'}{'\n'} 수정을 진행하면 현재 분석 내용이 삭제되고 {'\n'} 새 분석으로 바뀌어요!</Text>
                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity style={styles.modalButtonCheck} onPress={handleModify}>
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

             {/* 삭제 확인 모달 */}
             <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <Image source = {require('../../assets/images/gummiCheck.png')} style={styles.CheckImage}/>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>꾸미 분석 내용을 삭제하시겠습니까? {'\n'}{'\n'} 한 번 삭제한 분석은 다시 복구가 불가능해요!</Text>
                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity style={styles.modalButtonCheck} onPress={() => {handleDelete(data.id)}}>
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setDeleteModalVisible(false)}>
                                <Text style={styles.modalButtonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

//태그
const TagManager = ({pTags}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tagText, setTagText] = useState('');
    const [tags, setTags] = pTags;

    const addTag = () => {
        if (tagText.trim() !== '') {
            setTags([...tags, `#${tagText.trim()}`]);
            setTagText(''); // 입력 필드 초기화
            setModalVisible(false); // 모달 숨기기
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, idx) => idx !== index));
    };


    return (
        <View style={styles.tagCtn} >
            <Text style={styles.tags} >태그</Text>

            <ScrollView horizontal style={styles.tagContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ 추가하기</Text>
            </TouchableOpacity>
                    {tags.map((tag, index) => (
                    <View key={index} style={styles.addButton}>
                        <Text style={styles.addButtonText}>{tag}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => removeTag(index)}>
                            <Text style={styles.deleteButtonText}>x</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.tagModalView}>
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
                        placeholderTextColor={'black'}
                    />
                    <TouchableOpacity style={styles.button} onPress={addTag}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
    );
};


//저장하기 버튼
const SaveBtn = ({setter, id, date}) => {
    const navigation = useNavigation();

    const handleSave = async (s) => {

        const rEmotionDict = {
            "두려워요": "FEAR",
            "그리워요": "YEARNING",
            "기뻐요": "JOY",
            "화나요": "ANGER",
            "찝찝해요": "AWKWARDNESS",
            "황당해요": "ABSURDITY",
            "흥분돼요": "EXCITED",
            "설레요": "THRILL",
            "미스테리해요": "MYSTERY",
        };

        await checkToken();

        const [accessToken, refreshToken] = await getToken();

        const response = fetch('http://carvedrem.kro.kr:8080/api/diary', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ 
                'id': id,
                'title': s.diaryTitle[0],
                'content': s.diaryText[0],
                'start_sleep': s.bedTime[0],
                'end_sleep': s.wakeTime[0],
                'date': date,
                'emotion': rEmotionDict[s.selectedEmotion[0]],
                'tags': s.tags[0],
            }),
        });
        response.then(res => res.json()).then(data => {
            console.log(data);
            if (data.check != null && data.check == false) {
                console.log("저장 실패");
            } else {
                console.log("저장 성공");
                navigation.goBack();
            }
        })
        
    }

    return(
        <View>
            <TouchableOpacity  onPress={() => {handleSave(setter)}} style={styles.confirmButton}>
                <Text style={styles.confirmText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    );
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
        fontSize: 15, 
        fontWeight: '700'
        
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        
    },
    tagModalView: {
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
        marginBottom: 20,
        marginTop: 10,
        height: 20,
    },
    subtitlePlaceholder: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
        lineHeight: 14,
    },
    textInput: {
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
        width: 240,
        textAlign: 'center',
    },
    imageSubtitlePlaceholder: {
        fontSize: 14,
        marginTop: 15,
        color: '#89898B',
        fontWeight: '600',
        textAlign: 'center',
        height: 20
    },
    emptyImage:{
        width: 100, 
        height: 140, 
    },
    interpretCtn: {
        width: 300,
        height: 400,
    },
    interpretText: {
        width: 300,
    },



    tags:{
        color: '#434343', 
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        marginTop:8
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
        width: 90, 
        height: 30,
        backgroundColor: '#C1C7F8',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 5,
        marginRight: 8
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
        marginLeft: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
        backgroundColor: '#EF82A1',
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
        marginBottom: 40
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
    },
    btnCtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 0,
        width: 60
    },
    modifyTop:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: 300
    },








    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: '#464E82',
        borderRadius: 20,
        width: 289, 
        height: 188,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'column',
    },
    modalText: {
        marginBottom: 18,
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        marginTop:15
    },
    modalButtonCheck:{
        width: 123.50, 
        height: 32,
        backgroundColor: '#EF82A1', 
        borderRadius: 10,
        justifyContent: 'center'
    },
    modalButtonCancel: {
        width: 123.50, 
        height: 32,
        backgroundColor: '#89898B', 
        borderRadius: 10,
        justifyContent: 'center',
        marginLeft: 15
    },
    modalButtonText : {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 14, 
        fontWeight: '500',
    },
    modalButtonGroup: {
        flexDirection:'row',
        marginTop:10
    },
    CheckImage: {
        width: 56, 
        height: 56,
        marginTop: 40
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default DiaryModify;