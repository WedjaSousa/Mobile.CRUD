import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Alert, StyleSheet,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@biblioteca_senac_usuarios';

const usuariosIniciais = [
  {
    id: 1,
    nome: 'Wedja Maria',
    email: 'wedja.sousa@gmail.com',
    tipo: 'estudante',
  },
  {
    id: 2,
    nome: 'Geraldo Gomes',
    email: 'Geraldol@gmailcom',
    tipo: 'professor',
  }
  
];

export default function UserListScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);

  // Carregar dados quando a tela ganhar foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarUsuarios();
    });
    
    return unsubscribe;
  }, [navigation]);

  // CARREGAR USUÁRIOS
  const carregarUsuarios = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosSalvos) {
        setUsuarios(JSON.parse(dadosSalvos));
      } else {
        setUsuarios(usuariosIniciais);
        await salvarUsuarios(usuariosIniciais);
      }
    } catch (error) {
      console.log('Erro ao carregar:', error);
      setUsuarios(usuariosIniciais);
    }
  };

  // SALVAR USUÁRIOS
  const salvarUsuarios = async (novosUsuarios) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosUsuarios));
    } catch (error) {
      console.log('Erro ao salvar:', error);
    }
  };

  // DELETAR USUÁRIO
  const deletarUsuario = async (usuario) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Excluir ${usuario.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            const novosUsuarios = usuarios.filter(u => u.id !== usuario.id);
            setUsuarios(novosUsuarios);
            await salvarUsuarios(novosUsuarios);
            Alert.alert('Excluído!', 'Usuário removido com sucesso!');
          }
        }
      ]
    );
  };

  // EDITAR USUÁRIO
  const editarUsuario = (usuario) => {
    navigation.navigate('UserForm', { 
      usuario: usuario
    });
  };

  // ADICIONAR USUÁRIO
  const adicionarUsuario = () => {
    navigation.navigate('UserForm');
  };

  // RENDER ITEM DA LISTA
  const renderUsuarioItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <View style={[
          styles.avatar,
          item.tipo === 'estudante' ? styles.avatarStudent : styles.avatarTeacher
        ]}>
          <Text style={styles.avatarText}>
            {item.tipo === 'estudante' ? '🎓' : '👨‍🏫'}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.nome}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <Text style={styles.userType}>
            {item.tipo === 'estudante' ? 'Estudante' : 'Professor'}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => editarUsuario(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => deletarUsuario(item)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

   return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {/* HEADER */}
        <View style={styles.header}>
        <Text style={styles.title}>📚Biblioteca Digital📚</Text>
        <Text style={styles.subtitle}>Sistema de Usuários</Text>
      </View>

      {/* BOTÃO ADICIONAR */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={adicionarUsuario}
      >
        <Text style={styles.addButtonText}>➕ Novo Usuário</Text>
      </TouchableOpacity>

      {/* LISTA */}
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUsuarioItem}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>👥</Text>
            <Text style={styles.emptyTitle}>Nenhum usuário cadastrado</Text>
            <Text style={styles.emptySubtitle}>
              Toque em "Novo Usuário" para adicionar o primeiro
            </Text>
          </View>
        }
        contentContainerStyle={usuarios.length === 0 ? styles.emptyList : styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#c781a2ff',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  addButton: {
    backgroundColor: '#c4005bff',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#c4005bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarStudent: {
    backgroundColor: '#88c4ddff',
  },
  avatarTeacher: {
    backgroundColor: '#9be87aff',
  },
  avatarText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  userType: {
    fontSize: 12,
    color: '#888888',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#e082aeff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#df1f15ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});