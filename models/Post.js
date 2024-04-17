const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    id: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    title: { type: String, required: true, minlength: 5 },
    text: { type: String, required: true, minlength: 5 },
    author: { type: String, required: true }
  },{
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
