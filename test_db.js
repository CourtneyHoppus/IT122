import { Cat } from './models/cat.js';

Cat.find({}, (err, cats) => {
  if (err) {
    console.log(err);
  } else {
    console.log(cats);
  }
  return
}).lean();

console.log('step 1')

Cat.countDocuments((err, cats) => {
  if (err) {
    console.log(err);
  } else {
    console.log('step 2')
    console.log(cats + ' cats in database');
  }
});

console.log('step 3')
