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

export const newe3Config = createWritableStore('newe3Config', {});
export const newe3Cache = createWritableStore('newe3Cache', {});
export const newe3UserConfig = createWritableStore('newe3UserConfig', {semester: '1092'});
