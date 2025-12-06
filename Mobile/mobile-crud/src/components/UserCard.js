import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const UserCard = ({ user, onEdit, onDelete }) => {

  const styles = {
    card: {
      backgroundColor: '#e9cfcfff',
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      shadowColor: '#000000ff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: '#666',
    },
    actions: {
      flexDirection: 'row',
    },
    editButton: {
      backgroundColor: '#c98eacff',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      marginRight: 8,
    },
    deleteButton: {
      backgroundColor: '#b60900ff',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
  };

  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(user)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(user.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;