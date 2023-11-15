import { ticketModel } from "../daos/mongodb/models/ticketModel.js";



export default class ticketRepository {
    async generateCodeUnique() {
        try {
            let randomChars = '';
            let possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
            randomChars += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }
            let uniqueString = 'TICKET-' + randomChars + '-' + id;
            return uniqueString;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getConfirmationTime() {
        try {
            let confirmationTime = new Date();
            return confirmationTime;
        }
        catch (error) {
            console.log(error);
        }
    }
    async createTicket(code, purchase_datetime, amount, purchaser) {
        try {
            const newTicket = await ticketModel.create({
                code,
                purchase_datetime,
                amount,
                purchaser
            });
            return newTicket
        } catch (error) {
        console.log(error);
        }
    }
    

}

