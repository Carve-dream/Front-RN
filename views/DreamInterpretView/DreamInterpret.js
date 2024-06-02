import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import { checkToken, getToken } from '../../ManageToken';
import Toast from 'react-native-toast-message';
import LoadingModal from '../LoadingModalView/LoadingModal';


const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 


const DreamInterpret = (data) => {
    const navigation = useNavigation();

    const diary = data.route.params;

    return(
        <View style={styles.fullScreen}>
            <View style={styles.topCtn}>
                <TopBar title="꿈 해몽 하기"/>
            </View>
            <FullScreen data={diary}/>
        </View>
    );
};


const FullScreen = ({data}) => {

    const [text, setText] = useState(data.interpretation);

    // useEffect(() => {
    //     const interpret = async () => {
    //         setLoading(true);
    //         try {
    //             if (data.content == "") {
    //                 setText("해몽을 하려면 꿈 일기를 작성해야 해요.");
    //             } else {
    //                 await checkToken();
    //                 const [accessToken, refreshToken] = await getToken();
    //                 const response = await fetch('http://carvedrem.kro.kr:8080/api/diary/interpretation', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `Bearer ${accessToken}`,
    //                     },
    //                     body: JSON.stringify({ 
    //                         'content': data.content,
    //                     }),
    //                 });
    //                 const res = await response.json();
    //                 console.log(res);
    //                 if (res.check != null && res.check === false) {
    //                     console.log("해몽 실패");
    //                 } else {
    //                     setText(res.information.answer);
    //                     console.log("해몽 성공");
    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Error interpret diary:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     interpret();
    // }, [data.content]);

    return(
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ScrollView>
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
                    <DiaryEntry interpret={[text, setText]}/>
                </View>
            </View>
             <View style={styles.saveCtn}>
                <SaveBtn data={data} interpret={[text, setText]}/>
            </View>
        </ScrollView>
    </View>
    );
}


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
                <Text style={styles.tagText}>{data}</Text>
            </View>
        </View>
    );
};


// 꿈 해몽 내용 => 서버에서 받아와서 출력하기!
const DiaryEntry = ({interpret}) => {

    const [interpretation, setInterpretation] = interpret;

    return (
        <View>
            <View style={styles.textInputWrapper}>
                <View style={styles.placeholderContainer}>
                    <Text style={styles.titlePlaceholder}>꿈 해몽 내용</Text>
                    <ScrollView style={styles.subtitleCtn} showsHorizontalScrollIndicator={false}>
                        <Text style={styles.subtitlePlaceholder}>
                            {interpretation ? 
                            interpretation : "아직 해몽이 없습니다."}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};


//꿈 이미지 생성하기 버튼
const SaveBtn = ({data, interpret}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [text, setText] = interpret;
    const id = data.id;

    const handleSave = async () => {
        await checkToken();
        const [accessToken, refreshToken] = await getToken();
        const response = fetch('http://carvedrem.kro.kr:8080/api/diary/interpretation', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'id': id,
                'content': text,
            }),
        });
        response.then(result => result.json()).then(res => {
            console.log(res);
            if (res.check != null && res.check == false) {
                console.log("해몽 저장 실패");
                Toast.show({
                    text1: "해몽을 저장할 수 없습니다.",
                })
            } else {
                console.log("해몽 저장 성공");
                Toast.show({
                    text1: "해몽이 성공적으로 저장되었습니다.",
                })
            }
        });
    }

    const createInterpret = async () => {
        setLoading(true);
        try {
            if (data.content == "") {
                setText("해몽을 하려면 꿈 일기를 작성해야 해요.");
            } else {
                await checkToken();
                const [accessToken, refreshToken] = await getToken();
                const response = await fetch('http://carvedrem.kro.kr:8080/api/diary/interpretation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ 
                        'content': data.content.replaceAll('\n', ' '),
                    }),
                });
                const res = await response.json();
                console.log(res);
                if (res.check != null && res.check === false) {
                    console.log("해몽 실패");
                } else {
                    setText(res.information.answer);
                    console.log("해몽 성공");
                }
            }
        } catch (error) {
            console.error("Error interpret diary:", error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <View style={{marginBottom: 50}}>
            <LoadingModal isVisible={loading} text={"해몽하는중..."}/>
            <TouchableOpacity onPress={() => navigation.navigate('ChatView', id)} style={styles.confirmButton}>
                <Text style={styles.confirmText}>꾸미와 꿈에 대해 이야기하기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {createInterpret()}} style={styles.confirmButton}>
                <Text style={styles.confirmText}>해몽하기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {handleSave()}} style={styles.confirmButton}>
                <Text style={styles.confirmText}>저장하기</Text>
            </TouchableOpacity>
            <Toast position='bottom' bottomOffset={-15}/>
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
        marginTop: 15,
        minHeight: 500,
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
    textInputWrapper: {
        width: 323, 
        height: 200, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
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
        marginBottom: 25,
        marginTop: 10
    },
    subtitlePlaceholder: {
        fontSize: 14,
        color: '#434343',
        fontWeight: '400',
        width: 300,
        height: 'auto',
        textAlign: 'left',
    },
    subtitleCtn: {
        width: 300,
        height: 140,
    },
    DiaryEntryCtn: {
        marginTop:25
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
    },
     
    
});

export default DreamInterpret;
