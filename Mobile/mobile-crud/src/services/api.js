import { API_CONFIG } from './api-config';

export const usuarioService = {
  async getUsuarios() {
    const response = await fetch(API_CONFIG.ENDPOINTS.USUARIOS);
    const data = await response.json();
    return data;
  },

  async createUsuario(usuario) {
    const response = await fetch(API_CONFIG.ENDPOINTS.USUARIOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    return await response.json();
  },

  async updateUsuario(id, usuario) {
    const response = await fetch(`${API_CONFIG.ENDPOINTS.USUARIOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    return await response.json();
  },

  async deleteUsuario(id) {
    const response = await fetch(`${API_CONFIG.ENDPOINTS.USUARIOS}/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
};