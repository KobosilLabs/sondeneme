import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { arcsData } from '@/data/habitsData';
import { ChevronRight } from 'lucide-react-native';

export default function ActsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ACTS</Text>
        <Text style={styles.headerSubtitle}>CHOOSE YOUR PATH</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {arcsData.map((arc) => (
          <TouchableOpacity 
            key={arc.id}
            style={styles.actCard}
          >
            <View style={styles.imageContainer}>
              <Image 
                source={arc.imageUrl as ImageSourcePropType}
                style={styles.actImage}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.actContent}>
              <View style={styles.actHeader}>
                <Text style={styles.actName}>{arc.name}</Text>
                <ChevronRight color="#FF4E4E" size={20} />
              </View>
              
              <Text style={styles.actDescription}>
                {arc.description}
              </Text>
              
              <View style={styles.actStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {arc.days.length}
                  </Text>
                  <Text style={styles.statLabel}>DAYS</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {arc.days[0].habits.length}
                  </Text>
                  <Text style={styles.statLabel}>HABITS</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  actCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actImage: {
    width: '100%',
    height: '100%',
  },
  actContent: {
    padding: 16,
  },
  actHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#DCDCDC',
    letterSpacing: 1,
  },
  actDescription: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    color: '#5A5A5A',
    marginBottom: 16,
    lineHeight: 20,
  },
  actStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#5A5A5A',
  },
  statItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#5A5A5A',
  },
  statValue: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#DCDCDC',
  },
  statLabel: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#5A5A5A',
    letterSpacing: 1,
    marginTop: 4,
  },
});