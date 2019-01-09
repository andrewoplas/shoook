export class UserLogin {
    id: number;
    username: string;
    name: string;
    role: number;
  
    constructor(id: number, username: string, name: string, role: number) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.role = role;
    }
}

export enum Role {
    ADMIN = 0,
    VENDOR = 1,
    CUSTOMER = 2
  }