const mongoose = require("mongoose")

const ListingsSchema = new mongoose.Schema(
    {
        author:  String,
        list_date: String,
        title: String,
        image: String,
        list_details: String  
    }, 
    {
        collection: "Listings"
    }
);

mongoose.model("Listings", ListingsSchema)
    
    
