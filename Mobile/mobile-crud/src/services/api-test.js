import ApiService from './api';

// Função para testar a conexão com o backend
export const testarConexao = async () => {
  try {
    console.log('🧪 Testando conexão com o backend...');
    
    // Testar endpoint raiz
    const response = await fetch('http://localhost:3002/');
    console.log('✅ Backend respondendo:', response.status);
    
    // Testar lista de usuários
    const usuarios = await ApiService.getUsuarios();
    console.log('✅ Usuários carregados:', usuarios);
    
    return true;
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
    return false;
  }
};