const express = require('express');
const app = express();
const port = 8000;
const {faker} = require('@faker-js/faker');
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


class newUser{
    constructor(){
        this._id = faker.datatype.number({ max: 9999 });
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.email = `${this.firstName}${this.lastName}${faker.random.numeric()}@${faker.random.word()}.com`;
        this.phoneNumber = faker.phone.number('+1 ###-###-###');
        this.password = faker.random.alphaNumeric(Math.floor(Math.random() * 20) + 8);   
    };
};

let User = new newUser();

class newCompany{
    constructor(){
        this._id = faker.datatype.number({ max: 1000 });
        this.name = faker.company.name();
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        };
    };
};

let Company = new newCompany();

app.get("/api", (req, res) => {
    res.json({ message: "Hello World" });
});

app.get("/api/users/new", (req, res) => {
    res.json({ results: User });
});

app.get("/api/company/new", (req, res) => {
    res.json({ results: Company });
});

app.get("/api/user/company", (req, res) => {
    res.json({ results: User, Company });
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );