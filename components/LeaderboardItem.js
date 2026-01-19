import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LeaderboardItem({ item }) {
  // Determine rank badge style based on position
  const getRankStyle = () => {
    if (item.rank === 1) return styles.rankGold;
    if (item.rank === 2) return styles.rankSilver;
    if (item.rank === 3) return styles.rankBronze;
    return styles.rankDefault;
  };

  const getRankEmoji = () => {
    if (item.rank === 1) return '🥇';
    if (item.rank === 2) return '🥈';
    if (item.rank === 3) return '🥉';
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.rankBadge, getRankStyle()]}>
        <Text style={styles.rankText}>
          {getRankEmoji()} {item.rank}
        </Text>
      </View>
      <Text style={styles.username}>{item.username}</Text>
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankBadge: {
    width: 60,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  rankGold: {
    backgroundColor: '#FFD700',
  },
  rankSilver: {
    backgroundColor: '#C0C0C0',
  },
  rankBronze: {
    backgroundColor: '#CD7F32',
  },
  rankDefault: {
    backgroundColor: '#e9ecef',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  ratingBadge: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
