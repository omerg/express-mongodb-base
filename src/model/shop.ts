import * as mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
    name: String,
});

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
