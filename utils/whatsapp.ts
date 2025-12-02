// Função para gerar link do WhatsApp com mensagem formatada

import { Barbeiro } from './constants';

export interface DadosAgendamento {
  nome: string;
  barbeiro: string;
  data: string;
  horario: string;
  servicos: string[];
  valorTotal: number;
}

export function gerarLinkWhatsApp(
  barbeiro: Barbeiro,
  dados: DadosAgendamento
): string {
  // Formatar lista de serviços
  const servicosTexto = dados.servicos.join(', ');
  
  // Criar mensagem formatada
  const mensagem = `Olá! Gostaria de confirmar meu agendamento:\n\n` +
    `Nome: ${dados.nome}\n` +
    `Barbeiro: ${dados.barbeiro}\n` +
    `Data: ${dados.data}\n` +
    `Horário: ${dados.horario}\n` +
    `Serviços: ${servicosTexto}\n` +
    `Total: R$ ${dados.valorTotal.toFixed(2)}`;
  
  // Codificar mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagem);
  
  // Gerar link do WhatsApp
  const link = `https://wa.me/${barbeiro.whatsapp}?text=${mensagemCodificada}`;
  
  return link;
}

