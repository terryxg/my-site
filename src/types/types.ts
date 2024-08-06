export type SendPasswordResetParams = {
  email: string;
};
export type LoginParams = {
  email: string;
  password: string;
};
export type RegisterParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export interface ApiResponse {
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  _v: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
  meta: {
    affiliateBalance: number;
    taskBalance: number;
    totalRef: number;
  };
}
