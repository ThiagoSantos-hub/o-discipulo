import { prayerRequestMock } from '@/mocks/prayer.mock';

export const prayerService = {
  async offerToPrayerNotebook(message: string): Promise<boolean> {
    // Futuramente: salvar no Supabase se o usuário autorizar
    console.log('Mock: Oferta para Caderno de Oração recebida:', message);
    return Promise.resolve(true);
  },
};
