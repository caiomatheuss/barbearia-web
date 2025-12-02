// Página principal da landing page

import React, { useState } from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import Barbeiros from '../components/Barbeiros';
import AgendamentoModal from '../components/AgendamentoModal';
import { BARBEIROS, Barbeiro } from '../utils/constants';

export default function Home() {
  const [modalAberto, setModalAberto] = useState(false);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro | null>(null);

  function abrirModal(barbeiro: Barbeiro | null = null) {
    setBarbeiroSelecionado(barbeiro);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setBarbeiroSelecionado(null);
  }

  function handleAgendamentoSucesso() {
    // Pode adicionar uma notificação de sucesso aqui
    console.log('Agendamento realizado com sucesso!');
  }

  return (
    <>
      <Head>
        <title>Barbearia Premium - Agende seu Corte</title>
        <meta name="description" content="Agende seu corte com nossos profissionais especializados" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero onAgendarClick={() => abrirModal(null)} />
        <Barbeiros 
          barbeiros={BARBEIROS} 
          onBarbeiroClick={(barbeiro) => abrirModal(barbeiro)}
        />
      </main>

      {modalAberto && (
        <AgendamentoModal
          barbeiro={barbeiroSelecionado}
          onClose={fecharModal}
          onSuccess={handleAgendamentoSucesso}
        />
      )}
    </>
  );
}

