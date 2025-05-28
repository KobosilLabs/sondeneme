export interface Habit {
  id: string;
  name: string;
  category: 'training' | 'meditation' | 'diet' | 'reading' | 'other';
  completed: boolean;
  progress: number;
  streak: number;
}

export interface Arc {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  days: Day[];
}

export interface Day {
  id: string;
  dayNumber: number;
  date: string;
  habits: Habit[];
  totalXp: number;
}

export const arcsData: Arc[] = [
  {
    id: 'arc-1',
    name: 'Redemption Arc',
    imageUrl: 'https://images.pexels.com/photos/2531904/pexels-photo-2531904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Master your mind through anger inside.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-01-15',
        habits: [
          {
            id: 'habit-1',
            name: 'Morning Reading',
            category: 'reading',
            completed: true,
            progress: 1,
            streak: 3,
          },
          {
            id: 'habit-2',
            name: 'Meditation',
            category: 'meditation',
            completed: true,
            progress: 1,
            streak: 5,
          },
          {
            id: 'habit-3',
            name: 'Study Session',
            category: 'reading',
            completed: false,
            progress: 0.7,
            streak: 2,
          },
          {
            id: 'habit-4',
            name: 'Evening Review',
            category: 'reading',
            completed: false,
            progress: 0.5,
            streak: 0,
          },
        ],
        totalXp: 150,
      },
      {
        id: 'day-2',
        dayNumber: 2,
        date: '2025-01-16',
        habits: [
          {
            id: 'habit-1',
            name: 'Morning Reading',
            category: 'reading',
            completed: false,
            progress: 0.3,
            streak: 3,
          },
          {
            id: 'habit-2',
            name: 'Meditation',
            category: 'meditation',
            completed: true,
            progress: 1,
            streak: 6,
          },
          {
            id: 'habit-3',
            name: 'Study Session',
            category: 'reading',
            completed: true,
            progress: 1,
            streak: 3,
          },
          {
            id: 'habit-4',
            name: 'Evening Review',
            category: 'reading',
            completed: false,
            progress: 0.2,
            streak: 0,
          },
        ],
        totalXp: 120,
      },
    ],
  },
  {
    id: 'arc-2',
    name: 'Beast Mode',
    imageUrl: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Transform your body and mind through intense training',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-01-17',
        habits: [
          {
            id: 'habit-1',
            name: 'Morning Workout',
            category: 'training',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Meditation',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-3',
            name: 'Clean Eating',
            category: 'diet',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-4',
            name: 'Evening Stretch',
            category: 'training',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
];