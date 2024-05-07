declare global {
  namespace Express {
    interface Request {
      apiKey: string;
    }
  }
}

export {};
