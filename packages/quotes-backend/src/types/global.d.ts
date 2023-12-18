export interface Env {
  readonly PORT: string;
  readonly QUOTES_SERVICE_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export {};
