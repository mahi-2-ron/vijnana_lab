
import { LucideIcon } from 'lucide-react';

export enum SubjectType {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  BIOLOGY = 'Biology',
  MATH = 'Math',
  CS = 'CS',
}

export interface VivaQuestion {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ObservationTable {
    columns: string[];
    rows?: number;
}

export interface LabContent {
  aim: string;
  requirements: string[];
  theory: string;
  procedure: string[];
  objectives: string[];
  safety?: string[];
  realWorldApplications?: string[];
  vivaQuestions?: VivaQuestion[];
  quizQuestions?: QuizQuestion[];
  observationTable?: ObservationTable;
}

export interface LabExperiment {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  category: string; 
  content?: LabContent;
}

export interface SubjectData {
  id: string;
  name: SubjectType;
  icon: LucideIcon;
  color: string; // Tailwind color name (e.g. 'blue')
  hex: string; // Specific hex for glows/canvas
  description: string;
  labs: LabExperiment[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}