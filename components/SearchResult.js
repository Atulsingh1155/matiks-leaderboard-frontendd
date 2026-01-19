import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SearchResult({ item }) {
  // Determine rank badge style
  const getRankStyle = () => {
    if (item.rank === 1) return styles.rankGold;
    if (item.rank === 2) return styles.rankSilver;
    if (item.rank === 3) return styles.rankBronze;
    if (item.rank <= 100) return styles.rankTop100;
    return styles.rankDefault;
  };

  const getRankEmoji = () => {
    if (item.rank === 1) return '🥇';
    if (item.rank === 2) return '🥈';
    if (item.rank === 3) return '🥉';
    if (item.rank <= 100) return '⭐';
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.rankBadge, getRankStyle()]}>
        <Text style={styles.rankText}>
          {getRankEmoji()} #{item.rank}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.rankLabel}>Global Rank: {item.rank}</Text>
      </View>
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
    minWidth: 65,
    paddingVertical: 8,
    paddingHorizontal: 10,
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
  rankTop100: {
    backgroundColor: '#90EE90',
  },
  rankDefault: {
    backgroundColor: '#e9ecef',
  },
  rankText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 17,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  rankLabel: {
    fontSize: 12,
    color: '#666',
  },
  ratingBadge: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
