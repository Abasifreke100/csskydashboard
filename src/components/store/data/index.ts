export class  Cssky_Dashboard_Routes {
  // Auth
  static readonly signIn = "/auth/sign-in";
  static readonly signUp = "/auth/sign-up";
  static readonly addUsers = "/auth/add-users";

  // Dashboard
  static readonly dashboard = "/";
  static readonly customersPage = "/customers/:type";
  static readonly customersIdPage = "/customers/:type/:customerId";
  static readonly insights = "/insights";
  static readonly tasks = "/tasks";
  static readonly taskId = "/tasks/:taskID";
  static readonly apiBindings = "/api-bindings";
  static readonly more = "/more";
  static readonly overview = "/overview";
  static readonly tickets = "/ticket";
  static readonly inbox = "/inbox";
  static readonly inboxDetail = "/inbox/:inboxId";
  static readonly users = "/users"
  static readonly userId = "/users/:user_id"
  // static readonly history = "/history"
  static readonly admin = "/admin";
  static readonly billingInfo = "/billing-info";
  static readonly plans = "/plans"
}
