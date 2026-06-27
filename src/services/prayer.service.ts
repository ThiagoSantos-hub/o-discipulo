export const prayerService = {
  async offerToPrayerNotebook(message: string): Promise<boolean> {
    console.log('Mock: Oferta para Caderno de Oração recebida:', message);
    return Promise.resolve(true);
  },
};
