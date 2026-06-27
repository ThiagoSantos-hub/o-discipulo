export interface LastConversation {
  date: string;
  topic: string;
  summary: string;
  followUpQuestion: string;
}

export const lastConversationMock: LastConversation = {
  date: '2026-06-26',
  topic: 'ansiedade no trabalho',
  summary: 'O usuário compartilhou que está sentindo ansiedade por causa da pressão no trabalho e dificuldade em equilibrar as responsabilidades.',
  followUpQuestion: 'Como você está se sentindo hoje em relação a isso?',
};

export const userCommitmentsMock = {
  leituraBiblia: { meta: '30 minutos', realizadoHoje: false },
  oracao: { realizadoHoje: true },
  devocional: { realizadoHoje: false },
};
