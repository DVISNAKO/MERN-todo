const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    imported: { type: Boolean, default: false }  
})

module.exports = model('Todo', schema)