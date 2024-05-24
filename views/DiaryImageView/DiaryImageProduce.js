// DiaryCard.js
import React, { useState } from 'react';
import { View, Text, Image,TextInput, StyleSheet, TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import { checkToken, getToken } from '../../ManageToken';


const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 


const DiaryImageProduce = (data) => {
    const navigation = useNavigation();

    const diary = data.route.params;

    console.log(diary);

    return(
        <View style={styles.fullScreen}>
            <View style={styles.topCtn}>
                <TopBar navigation={navigation} title="꿈 이미지 생성"/>
            </View>
            <FullScreen data={diary}/>
        </View>
    );
};

const FullScreen = ({data}) => {

    const [diaryText, setDiaryText] = useState('');

    const [img, setImg] = useState(data.image_url);

    return(
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
            <View style={styles.backCtn}>
                
                <View style={styles.card}>
                    <TopView title={data.title} date={data.date}/>
                    <ScrollView style={styles.infoContainer}>
                        <Text style={styles.content}>{data.content}</Text>
                    </ScrollView>
                    <ScrollView horizontal={true} style={styles.TagCtn} showsHorizontalScrollIndicator={false}>
                        {data.tags.map((element, index) => {
                            return (
                                <Tag data={element} key={index}/> 
                            )
                        })}
                    </ScrollView>
                </View>
                 
                 <View style={styles.DiaryEntryCtn}>
                    <DiaryEntry state={[diaryText, setDiaryText]}/>
                 </View>
                 <ImageBox source={img}/>
             </View>
        </View>
        <View style={styles.saveCtn}>
                <SaveBtn id={data.id} text={diaryText} image={[img, setImg]}/>
        </View>
    </ScrollView>
    );
}


//AI 생성 이미지 박스
const ImageBox = ({ source }) => {
    // const [imageSource, setImageSource] = useState(source);

    const imageSource = source;

    return (
        <View style={styles.imageBoxCtn}>
            <Text style={styles.imageholder}>AI 생성이미지</Text>
            <View style={styles.imageCtn}>
                {imageSource ? (
                    <Image src={imageSource} style={styles.image} />
                ) : (
                    <Text>이미지를 생성해보세요</Text>
                )}
            </View>
        </View>
    );
};



// 일기장 제목, 날짜
const TopView = ({title, date}) => {
    return (
        <View style={styles.topView}>
            <Text style={styles.title}>{title}</Text>
            <Text>{date}</Text>
        </View>
    );
};



//태그 컴포넌트
const Tag = ({data}) => {
    return(
        <View>
            <View style={styles.tagBox} >
                <Text style={styles.tagText}> {data} </Text>
            </View>
        </View>
    );
};


//이미지 내용
const DiaryEntry = ({state}) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [diaryText, setDiaryText] = state;

    return (
        <View>
            <View style={styles.textInputWrapper}>
                
                <View style={styles.placeholderContainer}>
                    <Text style={styles.titlePlaceholder}>이미지 내용</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        onChangeText={text => setDiaryText(text)}
                        value={diaryText}
                        placeholder='꿈 이미지 내용을 적어주세요'
                        placeholderTextColor={'black'}
                    />
                </View>
                
            </View>
        </View>
    );
};

//새로운 이미지 생성, 이미지 생성(저장)버튼
const SaveBtn = ({id, text, image}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [img, setImg] = image;

    const handleCreateImage = async () => {
        setLoading(true);
        await checkToken();
        const [accessToken, refreshToken] = await getToken();
        const response = fetch('http://carvedrem.kro.kr:8080/api/diary/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ 
                'content': text,
            }),
        });
        response.then(result => result.json()).then(res => {
            console.log(res);
            if (res.check != null && res.check == false) {
                console.log("이미지화 실패");
            } else {
                setImg(res.information.answer);
                console.log("이미지화 성공");
            }
        });
        setLoading(false);
    }

    const handleSave = async () => {
        await checkToken();
        const [accessToken, refreshToken] = await getToken();
        const response = fetch('http://carvedrem.kro.kr:8080/api/diary/image', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'id': id,
                'url': img,
            }),
        });
        response.then(result => result.json()).then(res => {
            console.log(res);
            if (res.check != null && res.check == false) {
                console.log("이미지 저장 실패");
            } else {
                console.log("이미지 저장 성공");
                navigation.goBack();
            }
        });
    }

    return(
        <View>
            <TouchableOpacity onPress={() => handleCreateImage()} style={styles.confirmButton}>
                <Text style={styles.confirmText}>새로운 이미지 생성하기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {handleSave()}} style={styles.confirmButton}>
                <Text style={styles.confirmText}>이미지 저장하기</Text>
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
    backCtn: {
        flexDirection: 'column',
        flex: 1,
        width: 330,
        marginHorizontal: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        minHeight: 550,
        minWidth: 370,
        alignItems: 'center',
        justifyContent: 'center'

    },
    card : {
        width: 330, 
        height: 210, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 25,
    },
    infoContainer: {
        height: 50,
        width: 300,
        paddingHorizontal: 10,
    },
    title: {
        textAlign: 'center', 
        color: '#333333', 
        fontSize: 16, 
        fontWeight: '700',
        marginBottom: 5
    },
    content: {
        color: '#434343', 
        fontSize: 14, 
        fontWeight: '400',
        textAlign: 'left',
    },
    topView: {
        width: 300,
        height: 50, 
        alignItems: 'flex-start', 
        flexDirection:'column',
        marginLeft: 20,
        marginTop: 10,
    },
    
    tagBox: {
        width: 88, 
        height: 30,
        backgroundColor: '#C1C7F8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginTop:10
    },
    tagText: {
        margin: 4,
        color: '#F2F2F2', 
        fontSize: 14, 
        fontWeight: 'bold',
    },
    TagCtn:{
        flex:1,
        height: 'auto',
        width: 300,
        flexDirection: 'row',
        marginBottom : 10,
        paddingHorizontal: 10,
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
        marginLeft: 72,
        marginBottom:20
    },
    textInputWrapper: {
        width: 323, 
        height: 140, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        marginBottom: 25,
    },
    placeholderContainer: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        alignItems: "center",
    },
    titlePlaceholder: {
        fontSize: 14,
        color: '#434343',
        fontWeight: '600', 
        marginBottom: 15,
        marginTop: 10
    },
    textInput: {
        fontSize: 14,
        color: '#434343',
        fontWeight: '400',
        width: 300,
        height: 90,
    },
    DiaryEntryCtn: {
        marginTop:25
    },
    imageBoxCtn : {
        width: 323, 
        height: 300, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCtn: {
        width: 270,
        height: 270,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageholder: {
        fontSize: 14,
        color: '#434343',
        fontWeight: '600',
        textAlign: 'center',

    },
    image: {
        width: 270,
        height: 270,
    }
});

export default DiaryImageProduce;
