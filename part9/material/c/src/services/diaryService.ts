import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';


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

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addDiary
};