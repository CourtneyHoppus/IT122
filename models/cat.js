import mongoose from 'mongoose';
import { connectionInfo } from '../protected.js';

mongoose.connect(connectionInfo, {
  dbName: 'it122_database',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('open', () => {
  console.log('database connected');
});

const catSchema = new mongoose.Schema({
  number: String,
  name: String,
  colors: [String],
  fat: { type: Boolean, default: false },
});

export const Cat = mongoose.model("Cat", catSchema);
