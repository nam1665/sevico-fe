// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apitest.sevico.xyz';

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    signup: '/api/auth/signup',
    verifyEmail: '/api/auth/verify-email',
    signin: '/api/auth/signin',
    me: '/api/auth/me',
    logout: '/api/auth/logout',
    passwordReset: '/api/auth/password-reset',
    passwordResetConfirm: '/api/auth/password-reset-confirm',
  },
  profile: '/api/profile',
} as const;

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
