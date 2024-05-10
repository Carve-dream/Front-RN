
import { useState } from "react";

const Validation = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true); // 이메일 유효성 상태
    const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 유효성 상태


    // 이메일 형식 검사 => string@gamil.com 형식
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // 비밀번호 형식 검사 => 영문, 숫자, 특수문자 포함 8자 이상
    const validatePassword = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;//최소 8자 이상, 최대(20) 설정하고 싶으면 {8,20}
        return re.test(password);
    };

    // 이메일 입력 처리
    const handleEmailChange = (email) => {
        setEmail(email);
        setEmailValid(validateEmail(email)); // 이메일 유효성 검사
    };

    // 비밀번호 입력 처리
    const handlePasswordChange = (password) => {
        setPassword(password);
        setPasswordValid(validatePassword(password)); // 비밀번호 유효성 검사
    };

    return { email, emailValid, handleEmailChange, password, passwordValid, handlePasswordChange};
};

export default Validation;

