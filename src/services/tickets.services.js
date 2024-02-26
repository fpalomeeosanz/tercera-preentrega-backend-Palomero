import { TicketsDB } from "../persistencia/tickets.db.js";

const ticketsService = new TicketsService();

class TicketsService {
    
    static ticketsDB = new TicketsDB();

    static getTickets = () => {
    return ticketsService.ticketsDB.get();
};

    static getTicketById = (ticketId) => {
    const tickets = ticketsService.ticketsDB.get();
    return tickets.find((ticket) => ticket.id === ticketId);
};

    static generateTicket = (purchaseId, products) => {
    const ticket = (ticket);
    ticketsService.ticketsDB.save(ticket);
    return ticket;
};
};

export { TicketsService };
