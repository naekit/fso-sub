import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';


const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
        return diaries.map(({ id, date, weather, visibility }) => ({
            id,
            date,
            weather,
            visibility
        }));
};

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addDiary = () => {
    return [];
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary
};