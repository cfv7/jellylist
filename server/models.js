const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
  user: String,
  giftlist: [{
    name: String,
    price_range: String,
    link: String,
    note: String,
    purchased: Boolean
  }]
});
// this
userDataSchema.methods.apiRepr = function() {
  // console.log(this);
  return {
    id: this._id,
    user: this.user,
    email: this.email,
    birthday: this.birthday,
    giftlist: this.giftlist
  };
}

const User = mongoose.model('User', userDataSchema);

module.exports = {User}