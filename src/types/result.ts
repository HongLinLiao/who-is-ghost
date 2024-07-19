export interface Result<T = undefined> {
  status: boolean;
  message?: string;
  data?: T;
}
