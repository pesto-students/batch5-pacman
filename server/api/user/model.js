import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('user', UserSchema);
