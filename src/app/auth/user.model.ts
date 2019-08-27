export class User {
    public userId: number;
    public username: string;
    public login: string;
    public password: string;
    public phone: string;
    public email: string;
    public address: string;

    constructor(name: string, login: string,
                password: string, phone: string,
                email: string, address: string) {
        this.username = name;
        this.login = login;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.userId = this.randomId(1000, 0);
    }

    randomId(upperLimit: number, lowerLimit: number) {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }
}