const mongoose = require('mongoose');

const giftItemSchema = mongoose.Schema({
  _id: String,
  name: String,
  url: String,
  note: {type: String, required: false}
})

const giftListSchema = mongoose.Schema({
  title: String,
  giftitems: [giftItemSchema],
  _creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const userDataSchema = mongoose.Schema({
  defaultList: String,
  giftList: [giftListSchema],
  // giftList: [{type: mongoose.Schema.Types.ObjectId, ref: "GiftList"}],
  googleId: {type: String, required: true},
  accessToken: {type: String, required: true},
  displayName: {type: String, required: true},
  logInCount: 0
});

userDataSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    displayName: this.displayName,
    defaultList: this.defaultList,
    giftList: this.giftList,
    logCount: this.logInCount
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

// var user = new User({
//   defaultList: 'hello',
//   giftList: [{type: mongoose.Schema.Types.ObjectId, ref: "GiftList"}],
// })
// console.log('user ->', user)
// user.save()

const GiftItem = mongoose.model('GiftItem', giftItemSchema);
const GiftList = mongoose.model('GiftList', giftListSchema)

module.exports = {User, GiftItem, GiftList}