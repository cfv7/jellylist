const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: String,
  url: String,
  note: {type: String, required: false}
})

const listSchema = mongoose.Schema({
  title: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: "Item", default: []}],
  _creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const userSchema = mongoose.Schema({
  list: [{type: mongoose.Schema.Types.ObjectId, ref: "List", default: []}],
  googleId: {type: String, required: true},
  accessToken: {type: String, required: true},
  displayName: {type: String, required: true}
});

userSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    displayName: this.displayName,
    list: this.list
  };
}

listSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    items: this.items
  };
}

itemSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    url: this.url,
    note: this.note
  };
}


const User = mongoose.model('User', userSchema);
const List = mongoose.model('List', listSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = {User, List, Item}