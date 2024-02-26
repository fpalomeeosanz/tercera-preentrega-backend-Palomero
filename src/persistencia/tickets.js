class TicketsDB{
    
    constructor(){
        this.tickets = [];
    }
    get(){
        return this.tickets;
    }
    save(ticket){
        this.products.push(ticket);
        return "Ticket guardado"
    }
};

export { TicketsDB };