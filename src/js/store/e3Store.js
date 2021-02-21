import {writable, get} from 'svelte/store';

export const createWritableStore = (key, startValue) => {
    const {subscribe, set, update} = writable(startValue);

    var obj = {
        subscribe,
        set,
        useLocalStorage: () => {
            const json = localStorage.getItem(key);
            if (json != 'undefined' && json) {
                set(JSON.parse(json));
            }

            subscribe(current => {
                localStorage.setItem(key, JSON.stringify(current));
            });
        }
    };
    obj.update = (extend) => update(() => ({...get(obj), ...extend}))
    return obj;
}

const previewConfig = {
    studentID: "0800-092-000"
};
export const newe3Config = createWritableStore('newe3Config', previewConfig);
const previewCache = {
    allCourses: [
        {
            "id": 24227,
            "shortname": "1092.6357",
            "fullname": "1092.6357.學生過客假說",
        },
        {
            "id": 24228,
            "shortname": "1092.1151",
            "fullname": "1092.1151.肝膽排石廢棄物處理條例",
        },
        {
            "id": 24229,
            "shortname": "1092.6303",
            "fullname": "1092.6303.教授別當我",
        },
        {
            "id": 24431,
            "shortname": "1092.5289",
            "fullname": "1092.5289.廣告位歡迎沒學生的課在此宣傳",
        },
        {
            "id": 23312,
            "shortname": "1092.5275",
            "fullname": "1092.5275.你的下一個e3，何必是newE3",
        },
        {
            "id": 23313,
            "shortname": "1092.1146",
            "fullname": "1092.1146.梅竹一家，陽明必勝",
        },
    ], discussions: [
        {
            "course": {
                id: 24227,
                "shortname": "1092.1151",
                "fullname": "1092.1151.肝膽排石廢棄物處理條例",
                name: "肝膽排石廢棄物處理條例"
            },
            "created": 1700000000,
            "id": 99999999,
            "name": "對不起 ｜ 清大鯊鯊NTHUPekosasa",
            "message": '<h1>鯊鯊復鯊鯊，莎莎當莎莎</h1>',
            "modified": 1700000000
        },
        {
            "course": {
                id: 24227,
                "shortname": "1092.1151",
                "fullname": "1092.1151.肝膽排石廢棄物處理條例",
                name: "林奇宏"
            },
            "created": 1700000000,
            "id": 999999999,
            "name": "我們懷念他",
            "message": '<h1>交大已死</h1>',
            "modified": 1700000000
        },
        {
            "course": {
                "id": 23312,
                "shortname": "1092.5275",
                "fullname": "1092.5275.你的下一個e3，何必是newE3",
                name: "學生過客假說"
            },
            "created": 1612108801,
            "id": 9999999999,
            "name": "交大滅校竣工時間",
            "message": '<h1>併校一時爽，一直併校笑到併軌</h1>',
            "modified": 1612108801
        }
    ],
    homeworks: [
        {
            "id": 30,
            "name": "交大滅校之探討",
            "intro": "併校一時爽，一直併校笑到併軌",
            "duedate": 1612108801,
            "courseName": "學生過客假說",
            "course":
                {
                    "id": 24227,
                    "shortname": "1092.6357",
                    "fullname": "1092.6357.學生過客假說",
                    "name": "學生過客假說"
                }
        },
        {
            "id": 60,
            "name": "陽明主義統一交大",
            "intro": "",
            "duedate": 1614700799-86400*4,
            "courseName": "肝膽排石廢棄物處理條例",
            "course":
                {
                    "id": 24227,
                    "shortname": "1092.6357",
                    "fullname": "1092.6357.學生過客假說",
                    "name": "肝膽排石廢棄物處理條例"
                }
        },
        {
            "id": 60,
            "name": "你以為的開學時間",
            "intro": "",
            "duedate": 1614700799,
            "courseName": "教授別當我",
            "course":
                {
                    "id": 24229,
                    "shortname": "1092.6303",
                    "fullname": "1092.6303.教授別當我",
                }
        },
        {
            "id": 62,
            "name": "實際上的開學時間",
            "intro": "",
            "duedate": 1614009599,
            "courseName": "教授別當我",
            "course":
                {
                    "id": 24229,
                    "shortname": "1092.6303",
                    "fullname": "1092.6303.教授別當我",
                }
        },
    ],
    userInfo: {
        "id": 0,
        "username": "129+113=129",
        "fullname": "我來我見我併校系 / YMU 林奇宏",
        "department": "我來我見我併校系 / YMU",
        "profileimageurlsmall": "https://e3.nycu.edu.tw/theme/image.php/dcpc/core/1612774492/u/f2",
        "profileimageurl": "https://e3.nycu.edu.tw/theme/image.php/dcpc/core/1612774492/u/f1"
    }
};
export const newe3Cache = createWritableStore('newe3Cache', previewCache);
export const newe3UserConfig = createWritableStore('newe3UserConfig',
    {
        semester: '1092',
        readAnnouncements: [],
        readHomeworks: [],
    }
);
