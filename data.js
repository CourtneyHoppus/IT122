let myCats = [
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
  return myCats;
};

const getItem = (name) => {
  return myCats.find((cat) => {
    return cat.name.toLowerCase() === name.toLowerCase();
  });
};

export { getAll, getItem };
