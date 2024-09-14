import mongoose from 'mongoose';
import Blog from './model/Blog.js';

mongoose.connect("mongodb+srv://patrickvyn:P41n0tr33@cluster0.z30i1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true   

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));