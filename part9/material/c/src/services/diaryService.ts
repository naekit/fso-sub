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

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
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
    findById,
    addDiary
};