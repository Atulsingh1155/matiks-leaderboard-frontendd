import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import SearchResult from '../components/SearchResult';

// Backend URL deployed on Render
const API_URL = 'https://matiks-leaderboard-backend.onrender.com';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === '') {
      setError('Please enter a username to search');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    Keyboard.dismiss();

    try {
      const response = await fetch(
        `${API_URL}/search?query=${encodeURIComponent(query.trim())}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      
      const json = await response.json();
      setResults(json || []);
    } catch (err) {
      setError(err.message);
      console.error('Error searching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setSearched(false);
  };

  const renderHeader = () => (
    <View style={styles.resultHeader}>
      <Text style={styles.resultCount}>
        {results.length === 0 
          ? 'No results found' 
          : `Found ${results.length} user${results.length !== 1 ? 's' : ''}`}
      </Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Rank</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Username</Text>
        <Text style={styles.headerText}>Rating</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter username (e.g., rahul)"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.searchButton]} 
            onPress={handleSearch}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Searching...' : '🔍 Search'}
            </Text>
          </TouchableOpacity>
          {(query || results.length > 0) && (
            <TouchableOpacity 
              style={[styles.button, styles.clearButton]} 
              onPress={handleClear}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <Text style={styles.errorHint}>
            Make sure the backend server is running on {API_URL}
          </Text>
        </View>
      )}

      {!loading && !error && searched && results.length === 0 && (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            No users found matching "{query}"
          </Text>
          <Text style={styles.hintText}>
            Try searching for: rahul, amit, priya
          </Text>
        </View>
      )}

      {!loading && !error && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item, index) => `${item.username}-${index}`}
          renderItem={({ item }) => <SearchResult item={item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
        />
      )}

      {!loading && !error && !searched && (
        <View style={styles.centerContainer}>
          <Text style={styles.instructionText}>
            🔍 Search for users by username
          </Text>
          <Text style={styles.hintText}>
            Enter a username and tap Search to see their global rank
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    flex: 0.4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  resultHeader: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  resultCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
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
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
