// Constantes e dados da aplicação

export interface Barbeiro {
  id: string;
  nome: string;
  whatsapp: string; // Número no formato: 5511999999999 (sem caracteres especiais)
  foto?: string;
}

export interface Servico {
  id: string;
  nome: string;
  valor: number;
}

// Lista de barbeiros
export const BARBEIROS: Barbeiro[] = [
  {
    id: 'guilherme',
    nome: 'Guilherme',
    whatsapp: '5511999999999', // Substitua pelo número real
    foto: '/barbeiros/guilherme.jpg' // Placeholder - adicione as fotos na pasta public
  },
  {
    id: 'rafael',
    nome: 'Rafael',
    whatsapp: '5511999999999', // Substitua pelo número real
    foto: '/barbeiros/rafael.jpg'
  },
  {
    id: 'douglas',
    nome: 'Douglas',
    whatsapp: '5511999999999', // Substitua pelo número real
    foto: '/barbeiros/douglas.jpg'
  }
];

// Lista de serviços disponíveis
export const SERVICOS: Servico[] = [
  { id: 'corte-degrade', nome: 'Corte degradê', valor: 50 },
  { id: 'corte-social', nome: 'Corte social', valor: 25 },
  { id: 'corte-navalhado', nome: 'Corte navalhado', valor: 10 },
  { id: 'cabelo-barba', nome: 'Cabelo + barba', valor: 70 },
  { id: 'sobrancelha', nome: 'Sobrancelha', valor: 20 }
];

// Horários disponíveis (08:00 às 21:00, intervalo de 1 hora)
export function gerarHorariosDisponiveis(): string[] {
  const horarios: string[] = [];
  for (let hora = 8; hora <= 21; hora++) {
    horarios.push(`${hora.toString().padStart(2, '0')}:00`);
  }
  return horarios;
}

// Função para formatar data para YYYY-MM-DD
export function formatarData(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Função para formatar data para exibição
export function formatarDataExibicao(data: string): string {
  const [year, month, day] = data.split('-');
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  return `${day} de ${meses[parseInt(month) - 1]} de ${year}`;
}

