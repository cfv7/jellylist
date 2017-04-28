const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
  user: String,
  email: String,
  birthday: String,
  giftlist: Array // I'm not sure if this is the correct way to define an array as a part of a schema
});               // It seems to work ok but could be worth it to look into 
                  //http://stackoverflow.com/questions/26364764/adding-an-array-inside-my-mongoose-schema 

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