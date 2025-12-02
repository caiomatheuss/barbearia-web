// Funções para gerenciar agendamentos no Firestore

import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

// Interface para agendamento
export interface Agendamento {
  barbeiro: string;
  data: string; // YYYY-MM-DD
  horario: string; // HH:00
  clienteNome: string;
  servicos: string[];
  valorTotal: number;
  status: 'confirmado';
  createdAt: Timestamp;
}

// Verificar se um horário está disponível
export async function verificarHorarioDisponivel(
  barbeiro: string,
  data: string,
  horario: string
): Promise<boolean> {
  try {
    const agendamentosRef = collection(db, 'agendamentos');
    const q = query(
      agendamentosRef,
      where('barbeiro', '==', barbeiro),
      where('data', '==', data),
      where('horario', '==', horario),
      where('status', '==', 'confirmado')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // Retorna true se não houver agendamentos
  } catch (error) {
    console.error('Erro ao verificar horário:', error);
    return false;
  }
}

// Buscar todos os horários ocupados de um barbeiro em uma data
export async function buscarHorariosOcupados(
  barbeiro: string,
  data: string
): Promise<string[]> {
  try {
    const agendamentosRef = collection(db, 'agendamentos');
    const q = query(
      agendamentosRef,
      where('barbeiro', '==', barbeiro),
      where('data', '==', data),
      where('status', '==', 'confirmado')
    );
    
    const querySnapshot = await getDocs(q);
    const horariosOcupados: string[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      horariosOcupados.push(data.horario);
    });
    
    return horariosOcupados;
  } catch (error) {
    console.error('Erro ao buscar horários ocupados:', error);
    return [];
  }
}

// Criar um novo agendamento
export async function criarAgendamento(
  agendamento: Omit<Agendamento, 'createdAt'>
): Promise<string> {
  try {
    // Verificar novamente se o horário está disponível antes de salvar
    const disponivel = await verificarHorarioDisponivel(
      agendamento.barbeiro,
      agendamento.data,
      agendamento.horario
    );
    
    if (!disponivel) {
      throw new Error('Horário não está mais disponível');
    }
    
    const agendamentosRef = collection(db, 'agendamentos');
    const docRef = await addDoc(agendamentosRef, {
      ...agendamento,
      createdAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
}

