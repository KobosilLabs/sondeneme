import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';
import { arcsData } from '@/data/habitsData';
import ActProgression from '@/components/ActProgression';

export default function ActsScreen() {
  const [currentArcIndex, setCurrentArcIndex] = useState(0);
  
  return (
    <SafeAreaView style={styles.container}>
      <ActProgression
        arcs={arcsData}
        currentArcIndex={currentArcIndex}
        onSelectArc={setCurrentArcIndex}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});