import { GET, POST } from './api';

export const pixelToRem = (px) => `${0.063 * px}rem`;

export const API_STATUS = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  fail: 'fail',
};

export const API = { GET, POST };
