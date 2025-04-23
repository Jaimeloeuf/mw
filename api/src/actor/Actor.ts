export class Actor {
  /**
   * ## DO NOT USE THE CONSTRUCTOR DIRECTLY
   * Generate new `Actor` instances using the available static methods, and do
   * not use the constructor directly since it will allow you to do things that
   * break privacy/permission policies.
   */
  constructor(
    public readonly ID: string,
    public readonly type:
      | "user"
      | "service_user"
      | "machine"
      | "async_job"
      | "chronos",
    public readonly name: string,
  ) {}

  /**
   * Generate a new Actor using a session cookie.
   */
  static async genFromSessionCookie(sessionCookie: string) {
    sessionCookie;
    return new Actor("id", "user", "name");
  }
}
