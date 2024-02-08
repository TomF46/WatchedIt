import { AxiosResponse } from "axios";

declare module '@tanstack/react-query' {
    interface Register {
      defaultError: AxiosResponse
    }
  }