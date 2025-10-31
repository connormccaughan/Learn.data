export type Language = 'python' | 'r' | 'sql' | 'scala';

export interface Lesson {
  id: string;
  title: string;
}

export interface Class {
  id:string;
  title: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  classes: Class[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

// Types for the new Projects section
export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  tags: string[];
}


// Types for Progress Tracking
export interface CourseProgress {
  completedLessons: string[]; // Array of unique lesson IDs: `${moduleId}-${classId}-${lessonId}`
}

// Activity log for the dashboard calendar
export type UserActivity = {
  [date: string]: number; // key: 'YYYY-MM-DD', value: number of lessons completed
};

export interface UserProgress {
  courses: {
    [courseId: string]: CourseProgress;
  };
  activityLog: UserActivity;
}


// Types for Content and Assignments
export interface Assignment {
  problemDescription: string;
  starterCode: string;
  solution: string;
  databaseSetup?: string; // For SQL assignments to create tables/data
  dataSetup?: string;     // For R assignments to create data frames/tibbles
}

export interface LessonData {
  lessonContent: string;
  assignment: Assignment;
}

// Types for AI Code Feedback
export interface FeedbackIssue {
  issue: string;
  suggestion: string;
}

export interface AIFeedback {
  score: number;
  generalAssessment: string;
  strengths: string[];
  issuesAndSuggestions: FeedbackIssue[];
  optimizedCode: string;
}

// Types for AI Chatbot
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// App Context Type
export interface AppContextType {
  selectedLanguage: Language;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<Language>>;
  viewMode: 'courses' | 'projects' | 'dashboard';
  setViewMode: React.Dispatch<React.SetStateAction<'courses' | 'projects' | 'dashboard'>>;
  selectedCourseId: string | null;
  setSelectedCourseId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedModuleId: string | null;
  setSelectedModuleId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedLessonId: string | null;
  setSelectedLessonId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProjectId: string | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string | null>>;
  progress: UserProgress;
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  isCourseNavVisible: boolean;
  toggleCourseNav: () => void;
  isAdminPanelOpen: boolean;
  toggleAdminPanel: () => void;
  currentTheme: any; // Assuming Theme type from themes.ts
  setCurrentTheme: React.Dispatch<React.SetStateAction<any>>;
  isThemePanelOpen: boolean;
  toggleThemePanel: () => void;
  isChatOpen: boolean;
  toggleChat: () => void;
  selectedCourse: Course | null;
  selectedModule: Module | null;
  selectedClass: Class | null;
  selectedLesson: Lesson | null;
  selectedProject: Project | null;
  goToNextLesson: () => void;
  goToPreviousLesson: () => void;
  currentLessonIndex: number;
  totalLessonsInCourse: number;
}