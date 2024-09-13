import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('categories', categorySchema);

export default Category