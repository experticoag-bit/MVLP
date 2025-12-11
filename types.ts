export interface AIRequestOptions {
  text: string;
  instruction: string;
  context?: string;
}

export enum EditorMode {
  WRITE = 'WRITE',
  SPLIT = 'SPLIT',
  PREVIEW = 'PREVIEW'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  status: 'upcoming' | 'passed' | 'ready';
  content?: string;
}

export interface Subject {
  id: string;
  name: string;
  targetGrade: number;
  currentGrade: number;
  color: string;
}

export interface Goal {
  id: string;
  type: 'short' | 'mid' | 'long';
  title: string;
  description: string;
  metric?: {
    label: string;
    value: string | number;
    target?: number;
  };
  icon: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
}