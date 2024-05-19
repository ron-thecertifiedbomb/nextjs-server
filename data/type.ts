export interface IProduct {
    name: string;
    brand: string;
    price: number;
    quantity: number;
    category: string;
    specifications: {
      processor: string;
      graphics: string;
      storage: string;
      resolution: string;
      maxFrameRate: string;
    };
    includedItems: string[];
    availableColors: string[];
  }
  