import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { 
  Settings,
  Trophy,
  Share2,
  Shield,
  Clock,
  Cog
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  // Sample user data
  const userData = {
    name: 'NIGHTCRAWLER',
    level: 8,
    daysActive: 45,
    achievements: 12,
    avatarUrl: 'https://images.pexels.com/photos/2531904/pexels-photo-2531904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={['rgba(122, 0, 243, 0.8)', 'rgba(255, 78, 78, 0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: userData.avatarUrl }} 
                style={styles.profileImage} 
              />
            </View>
            
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileLevel}>LEVEL {userData.level}</Text>
            
            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.statValue}>{userData.daysActive}</Text>
                <Text style={styles.statLabel}>DAYS</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.profileStat}>
                <Text style={styles.statValue}>{userData.achievements}</Text>
                <Text style={styles.statLabel}>ACHIEVEMENTS</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            <View style={styles.achievement}>
              <View style={styles.achievementIcon}>
                <Trophy color="#FF4E4E" size={24} />
              </View>
              <Text style={styles.achievementName}>First Blood</Text>
              <Text style={styles.achievementDesc}>Complete first day</Text>
            </View>
            
            <View style={styles.achievement}>
              <View style={styles.achievementIcon}>
                <Shield color="#FF4E4E" size={24} />
              </View>
              <Text style={styles.achievementName}>Guardian</Text>
              <Text style={styles.achievementDesc}>7-day streak</Text>
            </View>
            
            <View style={styles.achievement}>
              <View style={styles.achievementIcon}>
                <Clock color="#FF4E4E" size={24} />
              </View>
              <Text style={styles.achievementName}>Time Lord</Text>
              <Text style={styles.achievementDesc}>30-day milestone</Text>
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACTIONS</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share2 color="#DCDCDC" size={20} />
            <Text style={styles.actionText}>Share Progress</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Settings color="#DCDCDC" size={20} />
            <Text style={styles.actionText}>Customize Habits</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Cog color="#DCDCDC" size={20} />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
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
  profileHeader: {
    height: 320,
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#DCDCDC',
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 2,
  },
  profileLevel: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 1,
    opacity: 0.9,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 16,
    backgroundColor: 'rgba(15, 15, 15, 0.3)',
    borderRadius: 12,
  },
  profileStat: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(220, 220, 220, 0.3)',
  },
  statValue: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    letterSpacing: 1,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    color: '#DCDCDC',
    marginBottom: 16,
    letterSpacing: 1,
  },
  achievementsContainer: {
    paddingBottom: 8,
    paddingRight: 20,
  },
  achievement: {
    width: 120,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 78, 78, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 16,
    color: '#DCDCDC',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDesc: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 12,
    color: '#5A5A5A',
    textAlign: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  actionText: {
    fontFamily: 'Rajdhani-Medium',
    fontSize: 16,
    color: '#DCDCDC',
    marginLeft: 12,
  },
});