import axios from "axios";
import qs from 'qs';
import {newe3Config} from '../store/e3';
import {get} from 'svelte/store'
let instance = null;

export const e3Network = axios.create({
    baseURL:'https://e3.nycu.edu.tw/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'json'

})
class E3Api {
    constructor() {
        if(!instance){
            instance = this
        }
    }
    login(studentID, password){
        e3Network.post('login/token.php', qs.stringify({
            service: 'moodle_mobile_app',
            username: studentID,
            password: password
        })).then(function(resp){
            if(resp.data.token){
                const token = resp.data.token
                newe3Config.update({token, studentID})
                console.log('Got Token')
                instance._getUserInfo()
            }else{
                console.error('Server not provide token!')
                console.error('Detail:' + JSON.stringify(resp.data))
            }
        })
    }
    _getUserInfo(studentID){
        const useStudentID = studentID ?? get(newe3Config).studentID
        if(!useStudentID){
            console.error('User has not login yet!')
            return
        }
        let getUserInfoForm = {
            wstoken: get(newe3Config).token,
            wsfunction: 'core_user_get_users_by_field',
            'values[0]': useStudentID,
            field: 'username'
        };
        e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify(getUserInfoForm)).then(function(resp){
            if(!resp.data.error){
                const e3ID = resp.data[0].id
                newe3Config.update({e3ID, studentID})
                console.log('Got E3ID')
            }else{
                console.error('Server not provide token!')
                console.error('Detail:' + JSON.stringify(resp.data))
            }
        })
    }

}
export default new E3Api();


export const getUserConfig = (token, studentID) => axios.create({
    baseURL: 'https://e3new.nctu.edu.tw/webservice/rest/server.php?moodlewsrestformat=json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).post('', qs.stringify({
    wstoken: token,
    wsfunction: 'core_user_get_users_by_field',
    'values[0]': studentID,
    field: 'username'
})); // json[0].id to get newe3 number id
