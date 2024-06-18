export interface Product {
  _id:             string;
  availableColors: string[];
  category:        string;
  imageUrls:       string[];
  includedItems?:  string[];
  manufacturer:    string;
  price:           number;
  productName:     string;
  quantity:        number;
  specifications:  Specifications;
 }
 
 export interface Specifications {
  color?:        string;
  gender?:       string;
  graphics?:     string;
  maxFrameRate?: string;
  processor?:    string;
  resolution?:   string;
  size?:         string;
  storage?:      string;
  type?:         string;
 }
 