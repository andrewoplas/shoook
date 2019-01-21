export class UserLogin {
    id: number;
    emailAddress: string;
    name: string;
    role: number;
  
    constructor(id: number, emailAddress: string, name: string, role: number) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.name = name;
        this.role = role;
    }
}

export enum Role {
    ADMIN = 0,
    VENDOR = 1,
    CUSTOMER = 2
  }