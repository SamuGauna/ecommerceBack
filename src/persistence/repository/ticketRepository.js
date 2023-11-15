import { ticketModel } from "../daos/mongodb/models/ticketModel.js";



export default class ticketRepository {
    async generateCodeUnique() {
        try {
            let randomChars = '';
            let possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
            randomChars += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }
            let uniqueString = 'TICKET-' + randomChars;
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
    async createTicket(amount, purchaser) {
        try {
            const newTicket = await ticketModel.create({
                code: await this.generateCodeUnique(),
                purchase_datetime: await this.getConfirmationTime(),
                amount,
                purchaser
            });
            return newTicket
        } catch (error) {
        console.log(error);
        }
    }
    

}

