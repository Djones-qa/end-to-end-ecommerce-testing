export interface Product {
  name: string;
  price: number;
  description?: string;
}

export const products: Record<string, Product> = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: 29.99,
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: 9.99,
    description: "A red light isn't the desired state in testing but it sure helps",
  },
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt',
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
    description: "It's not every day that you come across a midweight quarter-zip fleece jacket",
  },
  onesie: {
    name: 'Sauce Labs Onesie',
    price: 7.99,
    description: "Rib snap infant onesie for the junior automation engineer in development",
  },
};

export const sortOptions = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;
