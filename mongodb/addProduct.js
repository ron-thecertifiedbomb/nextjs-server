const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ProductData = require('./productModel');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    const productData = {
      name: 'PlayStation 5',
      brand: 'Sony',
      price: 499,
      quantity: 10,
      specifications: {
        processor: 'AMD Ryzen Zen 2',
        graphics: 'AMD Radeon RDNA 2',
        storage: '825GB SSD',
        resolution: '4K',
        maxFrameRate: '120fps',
      },
      includedItems: ['DualSense controller', 'HDMI cable', 'Power cord', 'User manual'],
      availableColors: ['Black', 'White'],
    };

    // Specify the collection name
    const collectionName = 'products';

    // Create the model using the schema and specify the collection name
    const Product = mongoose.model('Product', ProductData, collectionName);

    // Create a new product instance
    const productToBeUploaded = new Product(productData);

    // Save the product to the database
    productToBeUploaded.save()
      .then((result) => {
        console.log(`${result.name} uploaded successfully`);
        mongoose.disconnect();
      })
      .catch((error) => {
        console.error('Error uploading data:', error);
        mongoose.disconnect(); // Disconnect from MongoDB in case of error
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
