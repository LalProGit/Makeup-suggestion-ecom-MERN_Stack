import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'model',
        required: true,
    },
    model: {
        type: String,
        enum: ['Makeup', 'Clothing'],
        required: true,
    },
    quantity: { type: Number, default: 1, min: 1},


});

const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;