import { Inngest } from "inngest";
import User from "../Models/UserModel.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-ticket-booking" });

// Inngest Function to save user data to a batabase
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    { event: 'clerk/user.created'},
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            user_name: first_name + ' ' + last_name,
            user_image: image_url
        }
        await User.create(userData)
    }
);

// Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    { event: 'clerk/user.deleted'},
    async ({ event }) => {
        const {id} = event.data
        await User.findByIdAndDelete(id)
    }
);

// Inngest Function to delete user from database
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-with-clerk'},
    { event: 'clerk/user.deleted'},
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            user_name: first_name + ' ' + last_name,
            user_image: image_url
        }
        await User.findByIdAndUpdate(id, userData)
    }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];