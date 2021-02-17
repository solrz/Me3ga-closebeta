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
            "id": 24227,
            "shortname": "1092.1151",
            "fullname": "1092.1151.肝膽排石廢棄物處理條例",
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
            "id": 108690,
            "message": '<h1>鯊鯊復鯊鯊，莎莎當莎莎</h1>',
            "modified": 1700000000,
            "name": "「誹」句"
        }
    ],
    homeworks: [
        {
            "id": 30,
            "name": "交大滅校之探討",
            "intro": "併校一時爽，一直併校笑到併軌",
            "duedate": 1612108799,
            "course":
                {
                "id": 24227,
                "shortname": "1092.6357",
                "fullname": "1092.6357.學生過客假說",
                "name": "學生過客假說"
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
