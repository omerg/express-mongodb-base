import * as mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: String,
    categoryId: String,
    type: Number,
    shopId: String,
    isPublic: Boolean
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
