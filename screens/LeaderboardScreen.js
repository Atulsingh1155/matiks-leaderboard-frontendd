import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LeaderboardItem from '../components/LeaderboardItem';

// Backend URL deployed on Render
const API_URL = 'https://matiks-leaderboard-backend.onrender.com';

export default function LeaderboardScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchLeaderboard = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/leaderboard?limit=100`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const json = await response.json();
      setData(json);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const seedUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/seed?count=10000`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to seed users');
      }
      // After seeding, fetch the leaderboard
      await fetchLeaderboard();
    } catch (err) {
      setError(err.message);
      console.error('Error seeding users:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    // Auto-refresh every 5 seconds to show live updates
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLeaderboard();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Rank</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Username</Text>
        <Text style={styles.headerText}>Rating</Text>
      </View>
      <Text style={styles.updateText}>
        Last updated: {lastUpdate.toLocaleTimeString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading leaderboard...</Text>
        {data.length === 0 && (
          <TouchableOpacity style={styles.seedButton} onPress={seedUsers}>
            <Text style={styles.seedButtonText}>Seed 10,000 Users</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <Text style={styles.errorHint}>
          Make sure the backend server is running on {API_URL}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchLeaderboard}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No users found</Text>
        <TouchableOpacity style={styles.seedButton} onPress={seedUsers}>
          <Text style={styles.seedButtonText}>Seed 10,000 Users</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.username}-${index}`}
        renderItem={({ item }) => <LeaderboardItem item={item} />}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    width: 60,
  },
  updateText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  seedButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  seedButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
