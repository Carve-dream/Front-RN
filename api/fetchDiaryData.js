import { checkToken, getToken } from "../ManageToken";

export async function fetchDiaryData(id) {
    await checkToken();
    token = await getToken();

    const response = await fetch('http://carvedrem.kro.kr:8080/api/diary/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token[0]}`,
        },
    });
    
    const ret = await response.json();
    console.log(ret);
    if (ret.check == null || ret.check == true) {
        console.log("데이터 불러오기 성공");
        return ret;
    } else {
        console.log("데이터 불러오기 실패");
    }
};