const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postedBy: {
        type: String, // Store the username directly
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    contact: {
        phone: {
            type: String
        },
        email: {
            type: String,
            required: true
        }
    },
    image: {
        type: String,
        required: function() { return this.status === 'found'; }
    },
    category: {
        type: String,
        enum: [
            'bag', 'watch', 'vehicle', 'electronics', 'documents', 'clothing',
            'jewelry', 'accessories', 'shoes', 'wallet', 'keys', 'books',
            'musical instruments', 'sports equipment', 'toys', 'glasses',
            'ID card', 'credit/debit card', 'passport', 'luggage', 'gadgets',
            'pet', 'household items', 'furniture', 'bicycle', 'motorcycle',
            'car', 'others'
        ],
        required: true
    }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
