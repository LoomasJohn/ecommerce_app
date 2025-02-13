import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Profile = () => {
  interface User {
    name: string;
    email: string;
    orderHistory: string[];
  }

  const [users, setUsers] = useState<User[]>([]); // Array to hold multiple users
  const [newUser, setNewUser] = useState<User>({
    name: '',
    email: '',
    orderHistory: [],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which user is being edited

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Please fill in both fields.');
      return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUser.email)) {
      alert('Please enter a valid email address.');
      return;
    }

console.log('Current Users:', users);
console.log('New User:', newUser);

    if (editingIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = newUser;
      setUsers(updatedUsers);
      setEditingIndex(null); // Reset editing index
    } else {
      // Add new user
      setUsers([...users, newUser]);
    }

    // Reset newUser state
    setNewUser({ name: '', email: '', orderHistory: [] });
    console.log('Updated Users:', [...users, newUser]);
  };

const handleEditProfile = (index: number) => {
    // Populate newUser with the selected user's information for editing
    setNewUser(users[index]);
    setEditingIndex(index); // Set the index of the user being edited
};

const handleViewOrderHistory = (orderHistory: string[]) => {
    // Logic to view order history (e.g., navigate to an order history screen)
    console.log('Order History:', orderHistory);
};

  const renderUser = ({ item, index }: { item: any, index: number }) => (
    <View style={styles.userInfo}>
      <Text style={styles.userInfoText}>Name: {item.name}</Text>
      <Text style={styles.userInfoText}>Email: {item.email}</Text>
      <Button title="Edit Profile" onPress={() => handleEditProfile(index)} />
      <Button title="View Order History" onPress={() => handleViewOrderHistory(item.orderHistory)} />
      <Text style={styles.orderHistoryTitle}>Order History:</Text>
      <FlatList
        data={item.orderHistory}
        keyExtractor={(orderItem, orderIndex) => orderIndex.toString()}
        renderItem={({ item: orderItem }) => (
          <TouchableOpacity>
            <Text style={styles.orderItem}>{orderItem}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profiles</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newUser.name}
        onChangeText={(text) => setNewUser({ ...newUser, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newUser.email}
        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
      />
      <Button title={editingIndex !== null ? "Update User" : "Add User"} onPress={handleAddUser} />

      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderUser}
        />
      ) : (
        <Text style={styles.placeholderText}>No users added yet.</Text>
      )}
    </View>
  );
};

// if the stylesheet part is redundant because of _layout.tsx, can prob just get rid of it
// only keeping what is here so if needed, might be able to change margins and sizes of boxes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  userInfo: {
    marginTop: 20,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  userInfoText: {
    fontSize: 18,
  },
  orderHistoryTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  orderItem: {
    fontSize: 16,
    padding: 5,
  },
  placeholderText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Profile;
