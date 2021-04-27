let cats = [
  { 
    number: "1",
    name: "Marley",
    colors: ["calico"],
    fat: false
  },
  { 
    number: "2",
    name: "Harper",
    colors: ["calico", "white"],
    fat: false
  },
  { 
    number: "3",
    name: "Prince",
    colors: ["calico", "white"],
    fat: true
  },
  { 
    number: "4",
    name: "Stout",
    colors: ["black"],
    fat: true
  },
  { 
    number: "5",
    name: "tba",
    colors: [],
    fat: null
  },
];

const getAll = () => {
  return cats;
};

const getItem = (name) => {
  return cats.find((cat) => {
    return cat.name.toLowerCase() === name.toLowerCase();
  });
};

const addItem = (newCat) => {
  const numberOfCats = cats.length;
  let existingCat = getItem(newCat.name);
  if (!existingCat) {
    cats.push(newCat);
  }
  return { added: numberOfCats !== cats.length };
};

const deleteItem = (name) => {
  const numberOfCats = cats.length;
  cats = cats.filter((cat) => {
    return cat.name.toLowerCase() !== name.toLowerCase();
  });
  return { deleted: numberOfCats !== cats.length };
};

export { getAll, getItem, addItem, deleteItem };
