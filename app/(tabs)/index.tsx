import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import HeroBanner from '@/components/HeroBanner';
import DaySummary from '@/components/DaySummary';
import { arcsData } from '@/data/habitsData';
import { BookOpen, Dumbbell } from 'lucide-react-native';

export default function HomeScreen() {
  const [currentArcIndex, setCurrentArcIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  const currentArc = arcsData[currentArcIndex];
  const currentDay = currentArc?.days[currentDayIndex] || { 
    dayNumber: 0, 
    habits: [], 
    totalXp: 0 
  };
  
  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    } else if (currentArcIndex > 0) {
      setCurrentArcIndex(currentArcIndex - 1);
      setCurrentDayIndex(arcsData[currentArcIndex - 1].days.length - 1);
    }
  };
  
  const handleNextDay = () => {
    if (currentDayIndex < currentArc.days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else if (currentArcIndex < arcsData.length - 1) {
      setCurrentArcIndex(currentArcIndex + 1);
      setCurrentDayIndex(0);
    }
  };
  
  const completedHabits = currentDay.habits.filter(h => h.completed).length;
  const totalHabits = currentDay.habits.length;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <HeroBanner
          arc={currentArc}
          dayNumber={currentDay.dayNumber}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
        />
        
        <DaySummary
          completedHabits={completedHabits}
          totalHabits={totalHabits}
        />
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>DAILY CHALLENGES</Text>
          
          <View style={styles.challengeContainer}>
            <View style={styles.challenge}>
              <View style={styles.challengeIconContainer}>
                <BookOpen color="#FF4E4E" size={24} />
              </View>
              
              <View style={styles.challengeMainContent}>
                <View style={styles.challengeTextContent}>
                  <Text style={styles.challengeTitle}>Knowledge Quest</Text>
                  <Text style={styles.challengeDescription}>
                    Read for 45 minutes today instead of the usual 30
                  </Text>
                </View>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, styles.doneButton]}>
                    <Text style={[styles.buttonText, styles.doneButtonText]}>DONE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.skipButton]}>
                    <Text style={[styles.buttonText, styles.skipButtonText]}>SKIP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={styles.challenge}>
              <View style={styles.challengeIconContainer}>
                <Dumbbell color="#FF4E4E" size={24} />
              </View>
              
              <View style={styles.challengeMainContent}>
                <View style={styles.challengeTextContent}>
                  <Text style={styles.challengeTitle}>Mind Training</Text>
                  <Text style={styles.challengeDescription}>
                    Complete a 20-minute focused meditation session
                  </Text>
                </View>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, styles.doneButton]}>
                    <Text style={[styles.buttonText, styles.doneButtonText]}>DONE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.skipButton]}>
                    <Text style={[styles.buttonText, styles.skipButtonText]}>SKIP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    color: '#DCDCDC',
    marginBottom: 16,
    letterSpacing: 1,
  },
  challengeContainer: {
    marginBottom: 24,
  },
  challenge: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    paddingLeft: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    flexDirection: 'row',
    alignItems: 'flex-start',
    overflow: 'hidden',
    minHeight: 160,
    position: 'relative',
  },
  challengeIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 78, 78, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    alignSelf: 'flex-start',
  },
  challengeMainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  challengeTextContent: {
    flex: 1,
    marginRight: 24,
    alignSelf: 'flex-start',
  },
  challengeTitle: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 22,
    color: '#DCDCDC',
    marginBottom: 10,
  },
  challengeDescription: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 16,
    color: '#DCDCDC',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
    minWidth: 100,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 13,
    letterSpacing: 1,
  },
  doneButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
  },
  doneButtonText: {
    color: '#4CAF50',
  },
  skipButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: '#F44336',
  },
  skipButtonText: {
    color: '#F44336',
  },
});