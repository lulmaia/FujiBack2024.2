import axios from 'axios';

// Interface para descrever a estrutura da resposta da API ViaCep
interface ViaCepResponse {
  erro?: boolean; // Se o CEP for inválido, a API retorna { erro: true }
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

// Serviço para verificar se o CEP é válido
export const verifyCep = async (cep: string): Promise<boolean> => {
  try {
    const response = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
    return !response.data.erro; // Retorna true se o CEP for válido
  } catch (error) {
    console.error('Error verifying CEP:', error);
    throw new Error('Failed to verify CEP');
  }
};
