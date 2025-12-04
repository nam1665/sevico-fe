// API Request Types
export interface SignupRequest {
  email: string;
  password: string;
  fullname: string;
  avatar?: string;
  dob?: string;
}

export interface VerifyEmailRequest {
  email: string;
  verification_code: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

// API Response Types
export interface SignupResponse {
  email: string;
  message: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface SigninResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  email: string;
}

export interface UserProfile {
  email: string;
  fullname: string;
  avatar: string | null;
  dob: string;
  is_verified: boolean;
  created_at: string;
}

export interface ApiError {
  detail: string;
}
