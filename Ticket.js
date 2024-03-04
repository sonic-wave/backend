class Ticket {
    constructor(id, name, fullDesription) {
        this.id = id;
        this.name = name;
        this.fullDesription = fullDesription;
        this.status = false;
        this.created = this.createDate();
    }

    createDate() {
        const date = new Date();
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}`;
    }
}

module.exports = Ticket;