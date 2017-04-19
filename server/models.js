const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
  user: String,
  email: String,
  birthday: String,
  giftlist: Array
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