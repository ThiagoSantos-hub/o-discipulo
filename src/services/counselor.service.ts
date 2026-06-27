import { lastConversationMock, userCommitmentsMock } from '@/mocks/counselor.mock';

import type { LastConversation } from '@/mocks/counselor.mock';

export const counselorService = {
  async getLastConversation(): Promise<LastConversation | null> {
    // Futuramente: buscar do Supabase
    return Promise.resolve(lastConversationMock);
  },

  async getUserCommitments() {
    // Futuramente: buscar do Supabase
    return Promise.resolve(userCommitmentsMock);
  },
};
