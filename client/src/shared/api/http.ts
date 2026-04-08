<<<<<<< HEAD
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});
=======
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
