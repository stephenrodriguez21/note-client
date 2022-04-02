export class Login{
    email: string = ""
    password: string = ""
}

export class LoggedInUser {
    id: number = 0;
    name: string = "";
    email: string = "";
}

export class Authentication {
    token: string = "";
    loggedin_user: LoggedInUser = new LoggedInUser();
}