const mongoose = require("mongoose")

// Schema mapping to a MongoDB collection
const ListingsSchema = new mongoose.Schema(
    {
        author:  String,
        list_date: { type: Date, default: Date.now },
        title: String,
        image: String,
        list_details: String,
        phone: String
    }, 
    {
        collection: "Listings"
    }
);

// Create a model from the schema
mongoose.model("Listings", ListingsSchema)