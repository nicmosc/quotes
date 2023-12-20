export interface Env {
  readonly API_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export {};
