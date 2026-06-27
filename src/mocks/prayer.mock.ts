export interface PrayerRequest {
  id?: string;
  userId: string;
  message: string;
  createdAt: string;
  isShared: boolean;
}

export const prayerRequestMock = {
  message: '',
  isShared: false,
};
