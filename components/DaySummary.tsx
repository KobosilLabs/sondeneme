import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DaySummaryProps {
  completedHabits: number;
  totalHabits: number;
}

export default function DaySummary({
  completedHabits,
  totalHabits,
}: DaySummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        <Text style={styles.progressHighlight}>{completedHabits}</Text>
        /{totalHabits} HABITS COMPLETED
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    alignItems: 'center',
  },
  progressText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    color: '#DCDCDC',
    letterSpacing: 1,
  },
  progressHighlight: {
    color: '#FF4E4E',
    fontFamily: 'SpaceMono-Bold',
  },
});