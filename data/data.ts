export const productData = [
  {
    productName: 'PlayStation 5',
    manufacturer: 'Sony',
    price: 499,
    quantity: 10,
    category: 'Gaming console',
    imageUrls: [],
    specifications: {
      processor: 'AMD Ryzen Zen 2',
      graphics: 'AMD Radeon RDNA 2',
      storage: '825GB SSD',
      resolution: '4K',
      maxFrameRate: '120fps',
    },
    includedItems: ['DualSense controller', 'HDMI cable', 'Power cord', 'User manual'],
    availableColors: ['Black', 'White'],
  },
  {
    productName: 'Xbox Series X',
    manufacturer: 'Microsoft',
    price: 499,
    quantity: 10,
    category: 'Gaming console',
    imageUrls: [],
    specifications: {
      processor: 'Custom AMD Zen 2',
      graphics: 'AMD RDNA 2',
      storage: '1TB NVMe SSD',
      resolution: '4K',
      maxFrameRate: '120fps',
    },
    includedItems: ['Wireless Controller', 'HDMI cable', 'Power cord', 'User manual'],
    availableColors: ['Black', 'White'],
  },
  {
    productName: 'Nintendo Switch',
    manufacturer: 'Nintendo',
    price: 299,
    quantity: 15,
    category: 'Gaming Console',
    imageUrls: [],
    specifications: {
      processor: 'Custom NVIDIA Tegra',
      graphics: 'NVIDIA GeForce',
      storage: '32GB eMMC',
      resolution: '720p',
      maxFrameRate: '60fps',
    },
    includedItems: ['Joy-Con (L) and Joy-Con (R)', 'Joy-Con Grip', 'Dock', 'HDMI cable', 'Power adapter'],
    availableColors: ['Neon Red/Neon Blue', 'Gray'],
  },
  {
    productName: 'Asus ROG Gaming PC',
    manufacturer: 'Asus',
    price: 1500,
    quantity: 5,
    category: 'Gaming desktop',
    imageUrls: [],
    specifications: {
      processor: 'Intel Core i9-10900K',
      graphics: 'NVIDIA GeForce RTX 3080',
      storage: '1TB NVMe SSD + 2TB HDD',
      resolution: '4K',
      maxFrameRate: '240fps',
    },
    includedItems: ['Gaming keyboard', 'Gaming mouse', 'Headset', 'Monitor'],
    availableColors: ['Black'],
  },
  {
    productName: 'Nike Air Zoom Pegasus 38',
    manufacturer: 'Nike',
    price: 120,
    quantity: 20,
    category: 'Shoes',
    imageUrls: [],
    specifications: {
      type: 'Running shoes',
      gender: 'Men',
      color: 'Black/White',
      size: 'US 9',
    },
    availableColors: ['Black/White', 'Blue', 'Red'],
  },
  {
    productName: 'Adidas Ultraboost 21',
    manufacturer: 'Adidas',
    price: 180,
    quantity: 15,
    category: 'Shoes',
    imageUrls: [],
    specifications: {
      type: 'Running shoes',
      gender: 'Women',
      color: 'White/Black',
      size: 'US 8',
    },
    availableColors: ['White/Black', 'Gray', 'Pink'],
  },
  {
    productName: 'Converse Chuck Taylor All Star',
    manufacturer: 'Converse',
    price: 55,
    quantity: 25,
    category: 'Shoes',
    imageUrls: [],
    specifications: {
      type: 'Casual shoes',
      gender: 'Unisex',
      color: 'Black',
      size: 'US 7',
    },
    availableColors: ['Black', 'White', 'Red'],
  },
];







export const foodData = [
  {
    id: 1,
    name: "Double Cheeseburger",
    category: "Burger",
    description:
      "A juicy double beef patty with melted cheese, lettuce, tomato, pickles, and our signature sauce.",
    ingredients: [
      "Beef patty",
      "Cheddar cheese",
      "Lettuce",
      "Tomato",
      "Pickles",
      "Burger bun",
      "Signature sauce",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1400&q=60",
    price: "99.99",
  },
  {
    id: 2,
    name: "Bacon Cheeseburger",
    category: "Burger",
    description:
      "A classic cheeseburger topped with crispy bacon and special house sauce.",
    ingredients: [
      "Beef patty",
      "Bacon",
      "Cheddar cheese",
      "Lettuce",
      "Tomato",
      "Burger bun",
      "House sauce",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1400&q=60",
    price: "69.69",
  },
  {
    id: 3,
    name: "Mushroom Burger",
    category: "Burger",
    description:
      "A rich and savory burger topped with sautéed mushrooms and Swiss cheese.",
    ingredients: [
      "Beef patty",
      "Swiss cheese",
      "Sautéed mushrooms",
      "Lettuce",
      "Burger bun",
      "Garlic aioli",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?auto=format&fit=crop&w=1400&q=60",
    price: "120.99",
  },
  {
    id: 4,
    name: "Loaded Burger",
    category: "Burger",
    description:
      "A loaded burger with all the toppings: bacon, cheese, onions, jalapeños, and a spicy sauce.",
    ingredients: [
      "Beef patty",
      "Bacon",
      "Cheddar cheese",
      "Onions",
      "Jalapeños",
      "Lettuce",
      "Burger bun",
      "Spicy sauce",
    ],
    availability: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=60",
    price: "299.00",
  },
  {
    id: 5,
    name: "Feta & Spinach Pizza",
    category: "Pizza",
    description:
      "A delicious Mediterranean-inspired pizza with feta cheese, fresh spinach, and garlic sauce.",
    ingredients: [
      "Pizza dough",
      "Feta cheese",
      "Spinach",
      "Garlic sauce",
      "Olive oil",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=60",
    price: "666.99",
  },
  {
    id: 6,
    name: "Supreme Pizza",
    category: "Pizza",
    description:
      "A classic supreme pizza with pepperoni, sausage, mushrooms, onions, and peppers.",
    ingredients: [
      "Pizza dough",
      "Pepperoni",
      "Sausage",
      "Mushrooms",
      "Onions",
      "Bell peppers",
      "Tomato sauce",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=60",
    price: "799.50",
  },
  {
    id: 7,
    name: "Meat Lovers",
    category: "Pizza",
    description:
      "A meat-loaded pizza with pepperoni, sausage, ham, and bacon on a cheesy crust.",
    ingredients: [
      "Pizza dough",
      "Pepperoni",
      "Sausage",
      "Ham",
      "Bacon",
      "Cheese",
      "Tomato sauce",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=60",
    price: "580.99",
  },
  {
    id: 8,
    name: "Cheese Pizza",
    category: "Pizza",
    description:
      "A simple and classic cheese pizza with a crispy crust and flavorful tomato sauce.",
    ingredients: ["Pizza dough", "Mozzarella cheese", "Tomato sauce"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=800&q=60",
    price: "499.99",
  },
  {
    id: 9,
    name: "Kale Salad",
    category: "Salad",
    description:
      "A healthy kale salad with cranberries, walnuts, and a lemon vinaigrette.",
    ingredients: [
      "Kale",
      "Cranberries",
      "Walnuts",
      "Lemon vinaigrette",
      "Parmesan cheese",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=60",
    price: "180.80",
  },
  {
    id: 10,
    name: "Ceasar Salad",
    category: "Salad",
    description:
      "A classic Caesar salad with crispy romaine, croutons, parmesan, and Caesar dressing.",
    ingredients: [
      "Romaine lettuce",
      "Croutons",
      "Parmesan cheese",
      "Caesar dressing",
    ],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=60",
    price: "150.99",
  },
  {
    id: 11,
    name: "Loaded Salad",
    category: "Salad",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    price: "299.99",
    description:
      "A fully loaded salad with mixed greens, cherry tomatoes, cucumbers, olives, feta cheese, and a balsamic vinaigrette.",
    availability: "In stock",
  },
  {
    id: 12,
    name: "Fruit Salad",
    category: "Salad",
    image:
      "https://images.unsplash.com/photo-1564093497595-593b96d80180?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnJ1aXQlMjBzYWxhZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    price: "99.99",
    description:
      "A refreshing mix of seasonal fruits, including strawberries, blueberries, mangoes, and watermelon.",
    availability: "In stock",
  },
  {
    id: 13,
    name: "Wings",
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    price: "177.99",
    description:
      "Crispy, golden-fried chicken wings tossed in a choice of spicy buffalo, BBQ, or garlic parmesan sauce.",
    availability: "In stock",
  },
  {
    id: 14,
    name: "Baked Chicken",
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1594221708779-94832f4320d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpY2tlbiUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    price: "399.80",
    description:
      "Juicy oven-baked chicken seasoned with herbs and spices, served with roasted vegetables.",
    availability: "Limited stock",
  },
  {
    id: 15,
    name: "Chicken Tenders",
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWNrZW4lMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: "266.66",
    description:
      "Crispy, breaded chicken tenders served with a side of honey mustard or ranch dipping sauce.",
    availability: "In stock",
  },
  {
    id: 16,
    name: "Chicken Kabob",
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWNrZW4lMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: "259.69",
    description:
      "Grilled skewers of marinated chicken, bell peppers, and onions served with a side of tzatziki sauce.",
    availability: "In stock",
  },
];


