export interface Product {

 _id:                 string;
 availableColors:     string[];
 brand:               string;
 category:            string;
 imagelink_portrait?: string;
 imagelink_square?:   string;
 includedItems:       string[];
 name:                string;
 price:               number;
 quantity:            number;
 recommended?:        boolean;
 specifications:      Specifications;
}

export interface Specifications {
 archSupport?:       string;
 cushioning?:        string;
 displayTechnology?: string;
 graphics?:          string;
 lensMount?:         string;
 material?:          string;
 maxFrameRate?:      string;
 maxISO?:            string;
 ports?:             string;
 processor?:         string;
 resolution?:        string;
 screenSize?:        string;
 sensor?:            string;
 smartTv?:           string;
 sole?:              string;
 storage?:           string;
 videoResolution?:   string;
 weight?:            string;
}
