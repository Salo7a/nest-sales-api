export class Message<T = void> {
  message: string;
  data?: T;
  constructor(message: string, data?: any) {
    this.message = message;
    if (data) this.data = data;
  }
}
