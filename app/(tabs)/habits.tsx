import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { arcsData } from '@/data/habitsData';
import { Plus } from 'lucide-react-native';
import type { Habit } from '@/data/habitsData';

export default function HabitsScreen() {
  const [currentArcIndex, setCurrentArcIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  const currentArc = arcsData[currentArcIndex];
  const currentDay = currentArc?.days[currentDayIndex];
  
  const [habits, setHabits] = useState<Habit[]>(
    currentDay?.habits || []
  );
  
  const handleToggleHabit = (id: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id
          ? { 
              ...habit, 
              completed: !habit.completed,
              progress: habit.completed ? 0.7 : 1
            }
          : habit
      )
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.arcName}>{currentArc.name}</Text>
        <Text style={styles.dayNumber}>DAY {currentDay?.dayNumber}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {habits.map((habit) => (
          <TouchableOpacity 
            key={habit.id}
            style={[
              styles.habitCard,
              habit.completed && styles.habitCardCompleted
            ]}
            onPress={() => handleToggleHabit(habit.id)}
          >
            <View style={styles.habitHeader}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <View style={[
                styles.statusBadge,
                habit.completed && styles.statusBadgeCompleted
              ]}>
                <Text style={[
                  styles.statusText,
                  habit.completed && styles.statusTextCompleted
                ]}>
                  {habit.completed ? 'DONE' : 'TODO'}
                </Text>
              </View>
            </View>
            
            <View style={styles.habitDetails}>
              <Text style={styles.habitDetail}>
                • {habit.category.toUpperCase()}
              </Text>
              {habit.streak > 0 && (
                <Text style={styles.habitDetail}>
                  • {habit.streak} DAY STREAK
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.addButton}>
        <Plus color="#FF4E4E" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#5A5A5A',
  },
  arcName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 32,
    color: '#DCDCDC',
    letterSpacing: 2,
  },
  dayNumber: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    color: '#FF4E4E',
    letterSpacing: 1,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  habitCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  habitCardCompleted: {
    backgroundColor: 'rgba(122, 0, 243, 0.08)',
    borderColor: 'rgba(122, 0, 243, 0.5)',
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 20,
    color: '#DCDCDC',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(90, 90, 90, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  statusBadgeCompleted: {
    backgroundColor: 'rgba(122, 0, 243, 0.1)',
    borderColor: '#7A00F3',
  },
  statusText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#5A5A5A',
    letterSpacing: 1,
  },
  statusTextCompleted: {
    color: '#7A00F3',
  },
  habitDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  habitDetail: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#5A5A5A',
    letterSpacing: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4E4E',
    shadowColor: '#FF4E4E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});