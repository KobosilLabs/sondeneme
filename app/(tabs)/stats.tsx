import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Calendar, Award, Zap, ArrowUp } from 'lucide-react-native';

export default function StatsScreen() {
  // Sample stats data
  const statsData = {
    totalDays: 45,
    totalHabits: 8,
    completionRate: 78,
    currentStreak: 12,
    longestStreak: 21,
    totalXp: 4350,
  };
  
  // Sample habit success rates
  const habitRates = [
    { name: 'Morning Workout', rate: 85 },
    { name: 'Meditation', rate: 92 },
    { name: 'Clean Eating', rate: 67 },
    { name: 'Read 30 Minutes', rate: 71 },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>YOUR STATS</Text>
          <Text style={styles.headerSubtitle}>
            PROGRESS TRACKING
          </Text>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Calendar color="#FF4E4E" size={24} />
            <Text style={styles.statValue}>{statsData.totalDays}</Text>
            <Text style={styles.statLabel}>TOTAL DAYS</Text>
          </View>
          
          <View style={styles.statCard}>
            <Award color="#FF4E4E" size={24} />
            <Text style={styles.statValue}>{statsData.completionRate}%</Text>
            <Text style={styles.statLabel}>COMPLETION</Text>
          </View>
          
          <View style={styles.statCard}>
            <Zap color="#FF4E4E" size={24} />
            <Text style={styles.statValue}>{statsData.currentStreak}</Text>
            <Text style={styles.statLabel}>CURRENT STREAK</Text>
          </View>
          
          <View style={styles.statCard}>
            <ArrowUp color="#FF4E4E" size={24} />
            <Text style={styles.statValue}>{statsData.longestStreak}</Text>
            <Text style={styles.statLabel}>LONGEST STREAK</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HABIT SUCCESS RATES</Text>
          
          {habitRates.map((habit, index) => (
            <View key={index} style={styles.habitRateContainer}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <View style={styles.rateBarContainer}>
                <View 
                  style={[
                    styles.rateBar, 
                    { width: `${habit.rate}%` },
                    habit.rate > 80 
                      ? styles.highRate 
                      : habit.rate > 50 
                        ? styles.mediumRate 
                        : styles.lowRate
                  ]} 
                />
              </View>
              <Text style={styles.rateValue}>{habit.rate}%</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>XP PROGRESS</Text>
          <View style={styles.xpContainer}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpTitle}>TOTAL XP</Text>
              <Text style={styles.xpValue}>{statsData.totalXp}</Text>
            </View>
            
            <View style={styles.levelContainer}>
              <View style={styles.levelInfo}>
                <Text style={styles.levelText}>LEVEL 8</Text>
                <Text style={styles.nextLevelText}>
                  650 XP to Level 9
                </Text>
              </View>
              <View style={styles.levelBarContainer}>
                <View style={styles.levelBar} />
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
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#0F0F0F',
  },
  headerTitle: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 32,
    color: '#DCDCDC',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    color: '#FF4E4E',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  statValue: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#DCDCDC',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#5A5A5A',
    marginTop: 4,
    letterSpacing: 1,
  },
  section: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    color: '#DCDCDC',
    marginBottom: 16,
    letterSpacing: 1,
  },
  habitRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitName: {
    fontFamily: 'Rajdhani-Medium',
    fontSize: 16,
    color: '#DCDCDC',
    width: '30%',
  },
  rateBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  rateBar: {
    height: '100%',
    borderRadius: 4,
  },
  highRate: {
    backgroundColor: '#7A00F3', // Purple for high rates
  },
  mediumRate: {
    backgroundColor: '#FF4E4E', // Red for medium rates
  },
  lowRate: {
    backgroundColor: '#5A5A5A', // Grey for low rates
  },
  rateValue: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    color: '#DCDCDC',
    width: '10%',
    textAlign: 'right',
  },
  xpContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  xpTitle: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    color: '#5A5A5A',
    letterSpacing: 1,
  },
  xpValue: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#FF4E4E',
  },
  levelContainer: {
    marginTop: 8,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelText: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 18,
    color: '#DCDCDC',
  },
  nextLevelText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#7A00F3',
  },
  levelBarContainer: {
    height: 8,
    backgroundColor: 'rgba(15, 15, 15, 0.8)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelBar: {
    width: '35%',
    height: '100%',
    backgroundColor: '#7A00F3',
    borderRadius: 4,
  },
});