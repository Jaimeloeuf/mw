export abstract class Exception extends Error {
  constructor(message: string = "Exception") {
    super(message);
  }
}
