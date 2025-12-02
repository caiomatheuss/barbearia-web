// Componente Modal de Agendamento - Fluxo completo em 5 etapas

import React, { useState, useEffect } from 'react';
import { Barbeiro, SERVICOS, gerarHorariosDisponiveis, formatarData, formatarDataExibicao } from '../utils/constants';
import { buscarHorariosOcupados, criarAgendamento, verificarHorarioDisponivel } from '../firebase/agendamentos';
import { gerarLinkWhatsApp } from '../utils/whatsapp';
import styles from '../styles/AgendamentoModal.module.css';

interface AgendamentoModalProps {
  barbeiro: Barbeiro | null;
  onClose: () => void;
  onSuccess: () => void;
}

type Etapa = 'barbeiro' | 'data' | 'horario' | 'nome' | 'servicos' | 'confirmacao';

export default function AgendamentoModal({ barbeiro, onClose, onSuccess }: AgendamentoModalProps) {
  const [etapa, setEtapa] = useState<Etapa>(barbeiro ? 'data' : 'barbeiro');
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro | null>(barbeiro);
  const [dataSelecionada, setDataSelecionada] = useState<string>('');
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>('');
  const [nomeCliente, setNomeCliente] = useState<string>('');
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [erro, setErro] = useState<string>('');

  // Gerar data mínima (hoje) e máxima (30 dias à frente)
  const hoje = new Date();
  const dataMinima = formatarData(hoje);
  const dataMaxima = formatarData(new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000));

  // Carregar horários ocupados quando data ou barbeiro mudarem
  useEffect(() => {
    if (barbeiroSelecionado && dataSelecionada) {
      carregarHorariosOcupados();
    }
  }, [barbeiroSelecionado, dataSelecionada]);

  // Filtrar horários disponíveis
  useEffect(() => {
    if (dataSelecionada) {
      const todosHorarios = gerarHorariosDisponiveis();
      const hoje = new Date();
      const dataSelecionadaObj = new Date(dataSelecionada + 'T00:00:00');
      
      // Filtrar horários passados (se for hoje)
      const horariosFiltrados = todosHorarios.filter(horario => {
        if (dataSelecionadaObj.toDateString() === hoje.toDateString()) {
          const [hora] = horario.split(':');
          return parseInt(hora) > hoje.getHours();
        }
        return true;
      });

      // Remover horários ocupados
      const disponiveis = horariosFiltrados.filter(
        horario => !horariosOcupados.includes(horario)
      );

      setHorariosDisponiveis(disponiveis);
    }
  }, [horariosOcupados, dataSelecionada]);

  async function carregarHorariosOcupados() {
    if (!barbeiroSelecionado || !dataSelecionada) return;
    
    setCarregando(true);
    try {
      const ocupados = await buscarHorariosOcupados(
        barbeiroSelecionado.id,
        dataSelecionada
      );
      setHorariosOcupados(ocupados);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
      setErro('Erro ao carregar horários disponíveis');
    } finally {
      setCarregando(false);
    }
  }

  function calcularValorTotal(): number {
    return servicosSelecionados.reduce((total, servicoId) => {
      const servico = SERVICOS.find(s => s.id === servicoId);
      return total + (servico?.valor || 0);
    }, 0);
  }

  function toggleServico(servicoId: string) {
    setServicosSelecionados(prev => {
      if (prev.includes(servicoId)) {
        return prev.filter(id => id !== servicoId);
      } else {
        return [...prev, servicoId];
      }
    });
  }

  async function confirmarAgendamento() {
    if (!barbeiroSelecionado || !dataSelecionada || !horarioSelecionado || !nomeCliente || servicosSelecionados.length === 0) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      // Verificar novamente se o horário está disponível
      const disponivel = await verificarHorarioDisponivel(
        barbeiroSelecionado.id,
        dataSelecionada,
        horarioSelecionado
      );

      if (!disponivel) {
        setErro('Este horário não está mais disponível. Por favor, escolha outro.');
        setCarregando(false);
        return;
      }

      // Criar agendamento
      const valorTotal = calcularValorTotal();
      const servicosNomes = servicosSelecionados.map(id => {
        const servico = SERVICOS.find(s => s.id === id);
        return servico?.nome || id;
      });

      await criarAgendamento({
        barbeiro: barbeiroSelecionado.id,
        data: dataSelecionada,
        horario: horarioSelecionado,
        clienteNome: nomeCliente,
        servicos: servicosNomes,
        valorTotal: valorTotal,
        status: 'confirmado'
      });

      // Gerar link do WhatsApp e abrir
      const linkWhatsApp = gerarLinkWhatsApp(barbeiroSelecionado, {
        nome: nomeCliente,
        barbeiro: barbeiroSelecionado.nome,
        data: formatarDataExibicao(dataSelecionada),
        horario: horarioSelecionado,
        servicos: servicosNomes,
        valorTotal: valorTotal
      });

      window.open(linkWhatsApp, '_blank');

      // Sucesso
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao confirmar agendamento:', error);
      setErro(error.message || 'Erro ao confirmar agendamento. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  function proximaEtapa() {
    if (etapa === 'barbeiro' && barbeiroSelecionado) {
      setEtapa('data');
    } else if (etapa === 'data' && dataSelecionada) {
      setEtapa('horario');
    } else if (etapa === 'horario' && horarioSelecionado) {
      setEtapa('nome');
    } else if (etapa === 'nome' && nomeCliente.trim()) {
      setEtapa('servicos');
    } else if (etapa === 'servicos' && servicosSelecionados.length > 0) {
      setEtapa('confirmacao');
    }
  }

  function etapaAnterior() {
    if (etapa === 'confirmacao') {
      setEtapa('servicos');
    } else if (etapa === 'servicos') {
      setEtapa('nome');
    } else if (etapa === 'nome') {
      setEtapa('horario');
    } else if (etapa === 'horario') {
      setEtapa('data');
    } else if (etapa === 'data') {
      if (barbeiro) {
        onClose();
      } else {
        setEtapa('barbeiro');
      }
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        
        <div className={styles.header}>
          <h2>Agendar Corte</h2>
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${((['barbeiro', 'data', 'horario', 'nome', 'servicos', 'confirmacao'].indexOf(etapa) + 1) / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {erro && (
          <div className={styles.erro}>
            {erro}
          </div>
        )}

        <div className={styles.content}>
          {/* ETAPA 1: Selecionar Barbeiro */}
          {etapa === 'barbeiro' && (
            <div className={styles.etapa}>
              <h3>Escolha seu barbeiro</h3>
              <div className={styles.barbeirosGrid}>
                {[
                  { id: 'guilherme', nome: 'Guilherme' },
                  { id: 'rafael', nome: 'Rafael' },
                  { id: 'douglas', nome: 'Douglas' }
                ].map(b => (
                  <button
                    key={b.id}
                    className={`${styles.barbeiroBtn} ${barbeiroSelecionado?.id === b.id ? styles.active : ''}`}
                    onClick={() => {
                      setBarbeiroSelecionado({ id: b.id, nome: b.nome, whatsapp: '5511999999999' });
                      setTimeout(() => setEtapa('data'), 300);
                    }}
                  >
                    {b.nome}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 2: Selecionar Data */}
          {etapa === 'data' && (
            <div className={styles.etapa}>
              <h3>Escolha a data</h3>
              <input
                type="date"
                className={styles.input}
                min={dataMinima}
                max={dataMaxima}
                value={dataSelecionada}
                onChange={(e) => {
                  setDataSelecionada(e.target.value);
                  setHorarioSelecionado('');
                }}
                required
              />
              <button
                className={styles.btnPrimary}
                onClick={proximaEtapa}
                disabled={!dataSelecionada}
              >
                Próximo
              </button>
            </div>
          )}

          {/* ETAPA 3: Selecionar Horário */}
          {etapa === 'horario' && (
            <div className={styles.etapa}>
              <h3>Escolha o horário</h3>
              {carregando ? (
                <p>Carregando horários...</p>
              ) : horariosDisponiveis.length === 0 ? (
                <p className={styles.semHorarios}>
                  Não há horários disponíveis para esta data. Por favor, escolha outra data.
                </p>
              ) : (
                <div className={styles.horariosGrid}>
                  {horariosDisponiveis.map(horario => (
                    <button
                      key={horario}
                      className={`${styles.horarioBtn} ${horarioSelecionado === horario ? styles.active : ''}`}
                      onClick={() => setHorarioSelecionado(horario)}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              )}
              {horarioSelecionado && (
                <button
                  className={styles.btnPrimary}
                  onClick={proximaEtapa}
                >
                  Próximo
                </button>
              )}
            </div>
          )}

          {/* ETAPA 4: Inserir Nome */}
          {etapa === 'nome' && (
            <div className={styles.etapa}>
              <h3>Qual é o seu nome?</h3>
              <input
                type="text"
                className={styles.input}
                placeholder="Digite seu nome completo"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
              />
              <button
                className={styles.btnPrimary}
                onClick={proximaEtapa}
                disabled={!nomeCliente.trim()}
              >
                Próximo
              </button>
            </div>
          )}

          {/* ETAPA 5: Selecionar Serviços */}
          {etapa === 'servicos' && (
            <div className={styles.etapa}>
              <h3>Escolha os serviços</h3>
              <div className={styles.servicosList}>
                {SERVICOS.map(servico => (
                  <div
                    key={servico.id}
                    className={`${styles.servicoItem} ${servicosSelecionados.includes(servico.id) ? styles.selected : ''}`}
                    onClick={() => toggleServico(servico.id)}
                  >
                    <div className={styles.servicoInfo}>
                      <span className={styles.servicoNome}>{servico.nome}</span>
                      <span className={styles.servicoValor}>R$ {servico.valor.toFixed(2)}</span>
                    </div>
                    <div className={styles.checkbox}>
                      {servicosSelecionados.includes(servico.id) && '✓'}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.total}>
                <strong>Total: R$ {calcularValorTotal().toFixed(2)}</strong>
              </div>
              <button
                className={styles.btnPrimary}
                onClick={proximaEtapa}
                disabled={servicosSelecionados.length === 0}
              >
                Próximo
              </button>
            </div>
          )}

          {/* ETAPA 6: Confirmação */}
          {etapa === 'confirmacao' && (
            <div className={styles.etapa}>
              <h3>Confirmar Agendamento</h3>
              <div className={styles.resumo}>
                <div className={styles.resumoItem}>
                  <strong>Barbeiro:</strong> {barbeiroSelecionado?.nome}
                </div>
                <div className={styles.resumoItem}>
                  <strong>Data:</strong> {formatarDataExibicao(dataSelecionada)}
                </div>
                <div className={styles.resumoItem}>
                  <strong>Horário:</strong> {horarioSelecionado}
                </div>
                <div className={styles.resumoItem}>
                  <strong>Nome:</strong> {nomeCliente}
                </div>
                <div className={styles.resumoItem}>
                  <strong>Serviços:</strong> {servicosSelecionados.map(id => {
                    const servico = SERVICOS.find(s => s.id === id);
                    return servico?.nome;
                  }).join(', ')}
                </div>
                <div className={styles.resumoItem}>
                  <strong>Total:</strong> R$ {calcularValorTotal().toFixed(2)}
                </div>
              </div>
              <p className={styles.confirmacaoTexto}>
                Confirmar agendamento?
              </p>
              <div className={styles.botoesConfirmacao}>
                <button
                  className={styles.btnPrimary}
                  onClick={confirmarAgendamento}
                  disabled={carregando}
                >
                  {carregando ? 'Confirmando...' : 'Sim, Confirmar'}
                </button>
                <button
                  className={styles.btnSecondary}
                  onClick={onClose}
                  disabled={carregando}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {etapa !== 'confirmacao' && etapa !== 'barbeiro' && (
          <div className={styles.footer}>
            <button
              className={styles.btnSecondary}
              onClick={etapaAnterior}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

