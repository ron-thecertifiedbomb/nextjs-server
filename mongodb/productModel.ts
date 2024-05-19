const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: { type: String },
  vehicle_model: { type: String },
  manufacturer: { type: String },
  design: { type: String },
  year_sold: { type: Number }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

const car = new Vehicle({
  make: 'Toyota',
  vehicle_model: 'Corolla',
  manufacturer: 'Toyota Motors',
  design: 'Sedan',
  year_sold: 2007
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  specifications: {
    type: {
      processor: { type: String, required: true },
      graphics: { type: String, required: true },
      storage: { type: String, required: true },
      resolution: { type: String, required: true },
      maxFrameRate: { type: String, required: true }
    },
    required: true
  },
  includedItems: [{ type: String }],
  availableColors: [{ type: String }]
});

const ProductData = mongoose.model('Product', productSchema);

module.exports = { Vehicle, car, ProductData };
