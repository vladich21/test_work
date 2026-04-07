import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});
