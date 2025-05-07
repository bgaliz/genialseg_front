import api from '../interceptor/api';
import { ClientType } from '../pages/Home/types';

class ClientService {
  async login(username: string, password: string) {
    const response = await api.post('/login', {
      username,
      password
    });
    return response
  } 

  async listClients() {
    const response = await api.get('/listar-clientes');
    return response.data;
  }

  async editClient(id: string, data: ClientType) {
    const response = await api.put("/editar-cliente", data, {
      params: { id }
    });
    return response
  }

  async registerClient(data: ClientType) {
    const response = await api.post("/cadastrar-cliente", data)
    return response
  }
}

// eslint-disable-next-line
export default new ClientService()