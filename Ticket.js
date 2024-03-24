class Ticket {
    constructor(id, name, fullDescription) {
        this.id = id;
        this.name = name;
        this.fullDescription = fullDescription;
        this.status = false;
        this.created = this.createDate();
    }

    createDate() {
        const date = new Date();
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}`;
    }
}

module.exports = Ticket;