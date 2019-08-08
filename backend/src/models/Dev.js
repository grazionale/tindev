const { Schema, model} = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId, //tipo de identificador único utilizado no mongo '_id'
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId, //tipo de identificador único utilizado no mongo '_id'
        ref: 'Dev',
    }],
},{
    timestamps: true,
});

//timestamps cria automaticamente uma coluna chamada createAt, e outra chamada updatedAt (mongosee)

module.exports  = model('Dev', DevSchema);