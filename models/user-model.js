import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  id: String
});

export default mongoose.model('user', userSchema);
