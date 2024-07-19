export class Cssky_Dashboard_Routes {
    // Auth
    static readonly signIn = '/auth/sign-in'
    static readonly signUp = '/auth/sign-up'
    static readonly addUsers = '/auth/add-users'
  
    // Dashboard
    static readonly dashboard = '/'
    static readonly customersPage = '/customers/:type'
    static readonly customersIdPage = '/customers/:type/:customerId'
    static readonly insights = '/insights'
    static readonly tasks = '/tasks'
    static readonly taskId = '/tasks/:taskID'
    static readonly apiBindings = '/api-bindings'
    static readonly more = '/more'
    static readonly tickets = '/ticket'
  
  }