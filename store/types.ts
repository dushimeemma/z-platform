export interface AppState {
  errors: Error;
  auth: Auth;
  profile: Profile;
  verifyAccount: Profile;
}

export interface Error {
  error: string;
}

export interface Auth {
  message: string;
  isLoading: boolean;
  token: string;
  user: any;
}

export interface Profile {
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    profileImage: string;
    identityImage: string;
    identity: string;
    gender: string;
    dateOfBirth: string;
    age: number;
    maritalStatus: string;
    nationality: string;
    isVerified: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  isLoading: boolean;
  message: string;
}
