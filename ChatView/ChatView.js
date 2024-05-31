import { View, FlatList, StyleSheet, SafeAreaView, Text, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import TopBar from './TopBar';
import Input from './Input';
import Button from './Button';
import Message from './Message';
import BoxComponent from './BoxComponent';
import { useState, useRef, useEffect, useCallback } from 'react';
import { checkToken, getToken } from '../ManageToken';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { fetchUserData } from '../api/userData';
import { fetchDiaryData } from '../api/fetchDiaryData';

const ChatView = () => {

  const route = useRoute();

  StatusBar.setBarStyle('light-content');

  //날짜 표시
  const [messages, setMessages] = useState([
    { id: 'date', text: formatDate(new Date()), sender: 'date' }
  ]);
  const [userName, setUserName] = useState('');

  const loadUserData = async () => {
      const data = await fetchUserData();
      setUserName(data.information.name);
  };

  useFocusEffect(
      useCallback(() => {
          loadUserData();
      }, [])
  );

  const interpretByDiary = async (id) => {
    let diary = await fetchDiaryData(id);
    diary = diary.information;
    await getInterpret(diary.title, diary.date, diary.content);
  }

  const getInterpret = async (title, date, content) => {

    const userMessageId = Date.now().toString();

    const loadingMessage = {
      id: 'loading_' + userMessageId,
      text: 'loading',
      sender: 'loading',
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { id: userMessageId, text: `${title}\n${date}`, sender: 'user' }, // 사용자 메시지 추가
      loadingMessage // 로딩 이미지 추가
    ]);

    await checkToken();
    token = await getToken();
    try {
      const response = await fetch('http://carvedrem.kro.kr:8080/api/gptChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token[0]}`,
        },
        body: JSON.stringify({ question: `'${content}' 이런 꿈을 꿨어` }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.information.answer);

      // 상대방 응답 메시지 추가
      setMessages(messages => messages.filter(message => message.id !== loadingMessage.id)
        .concat({ id: Date.now().toString(), text: data.information.answer, sender: 'other' }));

    } catch (error) {
      console.error('Error:', error);
      setMessages(messages => messages.filter(message => message.id !== loadingMessage.id));
    }
  }

  if (route.params !== undefined) {
    useEffect(() => {
      interpretByDiary(route.params);
    }, [route.params]);
  } else {

  // useEffect(() => {
  //     loadUserData();
  // }, []);

    //채팅창 실행시 환영 인사
    useEffect(() => {
      loadUserData();
      const timer1 = setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, {
          id: '0',
          text: '안녕하세요! 저는 당신의 꿈을 분석하고, 꿈 속 상징들의 의미 파악을 통해 스스로의 감정을 파악할 수 있도록 돕는 가상 심리학자 꾸미예요',
          sender: 'other'
        }]);
      }, 1000); // 1초 후 첫 번째 메시지 추가

      // 두 번째 메시지 설정
      const timer2 = setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, {
          id: '1',
          text: `${userName}님의 무의식 속으로 탐험을 떠나볼까요?`,
          sender: 'other'
        }]);
      }, 2000); // 2초 후 두 번째 메시지 추가

      const timer3 = setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages, {
            id: '2',
            text: '',
            sender: 'buttons'
          }
        ]);
      }, 2001);

      // 컴포넌트 언마운트 시 타이머 제거
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);

      };
    }, [userName]);
  }

  // chat gpt api 연동
  const sendMessage = async (question) => {

    // 사용자가 메시지를 보냄
    if (question.trim().length > 0) {
      const userMessageId = Date.now().toString();

      const loadingMessage = {
        id: 'loading_' + userMessageId,
        text: 'loading',
        sender: 'loading',
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { id: userMessageId, text: question, sender: 'user' }, // 사용자 메시지 추가
        loadingMessage // 로딩 이미지 추가
      ]);

      console.log(`Sending question: ${question}`);
      await checkToken();
      token = await getToken();
      try {
        const response = await fetch('http://carvedrem.kro.kr:8080/api/gptChat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token[0]}`,
          },
          body: JSON.stringify({ question: question }),
        });

        const data = await response.json();
        console.log(data.information.answer);

        // if (question == '꿈일기 불러오기') {
        //   data.information.answer = <BoxComponent />;
        // } else if (question == '감정 분석하기') {
        //   data.information.answer = "감정을 분석해 드릴게요."
        // } else if (question == '상담하기') {
        //   data.information.answer = "상담이 필요하신가요?";
        // }

        // 상대방 응답 메시지 추가
        setMessages(messages => messages.filter(message => message.id !== loadingMessage.id)
          .concat({ id: Date.now().toString(), text: data.information.answer, sender: 'other' }));

      } catch (error) {
        console.error('Error:', error);
        setMessages(messages => messages.filter(message => message.id !== loadingMessage.id));
      }
    }
  }

  const buttonMessage = async (question) => {
    if (question.trim().length > 0) {
      const userMessageId = Date.now().toString();

      const loadingMessage = {
        id: 'loading_' + userMessageId,
        text: 'loading',
        sender: 'loading',
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { id: userMessageId, text: question, sender: 'user' }, // 사용자 메시지 추가
        loadingMessage // 로딩 이미지 추가
      ]);

      let answer;

      if (question == "꿈 일기 불러오기") {
        answer = <BoxComponent />;
      } else if (question == "감정 분석하기") {
        answer = "감정을 분석해 드릴게요. 지금 어떤 감정이신가요?";
      } else if (question == "상담하기") {
        answer = "무엇에 대해 상담해 드릴까요?";
      }
      
      // 상대방 응답 메시지 추가
      setMessages(messages => messages.filter(message => message.id !== loadingMessage.id)
        .concat({ id: Date.now().toString(), text: answer, sender: 'other' }));

    }
  }

  // FlatList ref 생성
  const flatListRef = useRef();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/*상단바*/}
        <View style={styles.topCtn}>
            <TopBar title="꾸미와의 대화" />
        </View>

        {/* 채팅 창 */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.sender === 'buttons') {
              return <Button item={item} sendMessage={buttonMessage} />;
            } else if (item.sender === 'date') {
              return <Text style={styles.dataText}>{item.text}</Text>;
            }
            else {
              return <Message item={item} />;
            }
          }}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 30 }}
          onContentSizeChange={() => setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 1)}
          onLayout={() => setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 1)}
        />

        {/* 메세지 보내기 입력창 */}
        <Input sendMessage={sendMessage} />
      </KeyboardAvoidingView>

    </View>
  );
};


function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464E82',
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  dataText: {
    paddingBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  topCtn : {
        marginTop: 55,
        marginBottom: 20
    },
});

export default ChatView;
