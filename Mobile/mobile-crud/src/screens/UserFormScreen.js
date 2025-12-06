import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@biblioteca_senac_usuarios';

export default function UserFormScreen({ route, navigation }) {
  const { usuario } = route.params || {};
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('estudante');

  
  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setTipo(usuario.tipo);
    }
  }, [usuario]);

  // VALIDAR FORMULÁRIO
  const validarFormulario = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Por favor, informe o nome');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Atenção', 'Por favor, informe o e-mail');
      return false;
    }
    return true;
  };

  // CARREGAR USUÁRIOS EXISTENTES
  const carregarUsuarios = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      return dadosSalvos ? JSON.parse(dadosSalvos) : [];
    } catch (error) {
      return [];
    }
  };

  // SALVAR USUÁRIO
  const salvarUsuario = async () => {
    if (!validarFormulario()) return;

    try {
      const usuariosExistentes = await carregarUsuarios();
      const usuarioData = {
        id: usuario ? usuario.id : Date.now(),
        nome: nome.trim(),
        email: email.trim(),
        tipo: tipo
      };

      let novosUsuarios;

      if (usuario) {
        // EDITAR: Atualizar usuário existente
        novosUsuarios = usuariosExistentes.map(u => 
          u.id === usuario.id ? usuarioData : u
        );
      } else {
        // NOVO: Adicionar usuário
        novosUsuarios = [usuarioData, ...usuariosExistentes];
      }

      // Salvar no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosUsuarios));
      
      // Mostrar mensagem e voltar
      Alert.alert(
        'Sucesso!', 
        usuario ? 'Usuário atualizado com sucesso!' : 'Usuário adicionado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o usuário');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {usuario ? 'Editar Usuário' : 'Novo Usuário'}
          </Text>

          {/* NOME */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* EMAIL */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* TIPO DE USUÁRIO */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Tipo de Usuário</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  tipo === 'estudante' && styles.radioButtonSelected
                ]}
                onPress={() => setTipo('estudante')}
              >
                <Text style={[
                  styles.radioText,
                  tipo === 'estudante' && styles.radioTextSelected
                ]}>
                  🎓 Estudante
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  tipo === 'professor' && styles.radioButtonSelected
                ]}
                onPress={() => setTipo('professor')}
              >
                <Text style={[
                  styles.radioText,
                  tipo === 'professor' && styles.radioTextSelected
                ]}>
                  👨‍🏫 Professor
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BOTÕES */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={salvarUsuario}
            >
              <Text style={styles.saveButtonText}>
                {usuario ? 'Atualizar' : 'Salvar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3c8c8ff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#7a0029ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  radioButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#c4005bff',
    borderColor: '#c4005bff',
  },
  radioText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  radioTextSelected: {
    color: '#FFFFFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#c4005bff',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});