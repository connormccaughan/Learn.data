import { UserProgress, LessonData, AIFeedback } from '../types';

const PROGRESS_KEY = 'learnDataUserProgress';
const CONTENT_CACHE_PREFIX = 'learnDataContent-';


export const loadProgress = (): UserProgress => {
  try {
    const savedProgress = localStorage.getItem(PROGRESS_KEY);
    const loaded = savedProgress ? JSON.parse(savedProgress) : {};

    // Migration logic for old structure to new structure { courses: {}, activityLog: {} }
    if (!loaded.courses && typeof loaded.activityLog !== 'object') {
        const migratedProgress: UserProgress = {
            courses: {},
            activityLog: {}
        };
        Object.keys(loaded).forEach(key => {
            if (key === 'activityLog' && typeof loaded.activityLog === 'object') {
                migratedProgress.activityLog = loaded.activityLog;
            } else if (key !== 'activityLog') {
                migratedProgress.courses[key] = loaded[key];
            }
        });
        return migratedProgress;
    }

    if (!loaded.activityLog) {
        loaded.activityLog = {};
    }
     if (!loaded.courses) {
        loaded.courses = {};
    }

    return loaded as UserProgress;

  } catch (error) {
    console.error("Failed to load progress from localStorage", error);
    return { courses: {}, activityLog: {} };
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress to localStorage", error);
  }
};

// For Lessons (LessonData object)
export const getCachedLessonData = (key: string): LessonData | null => {
    try {
        const item = localStorage.getItem(`${CONTENT_CACHE_PREFIX}${key}`);
        if (!item) return null;
        const data = JSON.parse(item);
        // A valid lesson data is an object with an assignment property
        if (typeof data === 'object' && data !== null && data.assignment) {
            return data as LessonData;
        }
        return null;
    } catch (error) {
        console.error("Failed to load lesson data from localStorage", error);
        return null;
    }
};

export const setCachedLessonData = (key: string, content: LessonData): void => {
    try {
        localStorage.setItem(`${CONTENT_CACHE_PREFIX}${key}`, JSON.stringify(content));
    } catch (error) {
        console.error("Failed to save lesson data to localStorage", error);
    }
};

// For Module Intros (string content)
export const getCachedModuleIntro = (key: string): string | null => {
    try {
        const item = localStorage.getItem(`${CONTENT_CACHE_PREFIX}${key}`);
        if (!item) return null;
        const data = JSON.parse(item);
         // New format: intro is stored as a plain string
        if (typeof data === 'string') {
            return data;
        }
        // Backwards compatibility for old format: { lessonContent: string, assignment: null }
        if (typeof data === 'object' && data !== null && data.assignment === null && typeof data.lessonContent === 'string') {
            return data.lessonContent;
        }
        return null;
    } catch (error) {
        console.error("Failed to load module intro from localStorage", error);
        return null;
    }
};

export const setCachedModuleIntro = (key: string, content: string): void => {
    try {
        localStorage.setItem(`${CONTENT_CACHE_PREFIX}${key}`, JSON.stringify(content));
    } catch (error) {
        console.error("Failed to save module intro to localStorage", error);
    }
};


// For Project Guides (string content)
export const getCachedProjectGuide = (key: string): string | null => {
    try {
        const item = localStorage.getItem(`${CONTENT_CACHE_PREFIX}project-guide-${key}`);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Failed to load project guide from localStorage", error);
        return null;
    }
};

export const setCachedProjectGuide = (key: string, content: string): void => {
    try {
        localStorage.setItem(`${CONTENT_CACHE_PREFIX}project-guide-${key}`, JSON.stringify(content));
    } catch (error) {
        console.error("Failed to save project guide to localStorage", error);
    }
};

// For Project Feedback (AIFeedback object)
export const getCachedProjectFeedback = (key: string): AIFeedback | null => {
    try {
        const item = localStorage.getItem(`${CONTENT_CACHE_PREFIX}project-feedback-${key}`);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Failed to load project feedback from localStorage", error);
        return null;
    }
};

export const setCachedProjectFeedback = (key: string, feedback: AIFeedback): void => {
    try {
        localStorage.setItem(`${CONTENT_CACHE_PREFIX}project-feedback-${key}`, JSON.stringify(feedback));
    } catch (error) {
        console.error("Failed to save project feedback to localStorage", error);
    }
};