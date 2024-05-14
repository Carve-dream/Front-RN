const Validation = () => {

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

    return { validateEmail, validatePassword };
};

export default Validation;

