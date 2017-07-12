const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
  defaultList: String,
  giftlist: Array,
  googleId: {type: String, required: true},
  accessToken: {type: String, required: true},
  displayName: {type: String, required: true}
});

const giftItemSchema = mongoose.Schema({
  _id: String,
  name: String,
  url: String,
  note: {type: String, required: false}
})

const giftListSchema = mongoose.Schema({
  title: String,
  giftitems: Array
})

userDataSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    displayName: this.displayName,
    defaultList: this.defaultList,
    giftlist: Array
  };
}

giftListSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    giftitems: this.giftitems
  };
}

giftItemSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    url: this.url,
    note: this.note
  };
}


const User = mongoose.model('User', userDataSchema);
const GiftItem = mongoose.model('GiftItem', giftItemSchema);
const GiftList = mongoose.model('GiftList', giftListSchema)

module.exports = {User, GiftItem, GiftList}