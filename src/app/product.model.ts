export class Product {

    public name : string;
        public imagePath :string;
        public category : string;
        public price : number;
        public rating : number;

    constructor(
        name : string, 
        imagePath :string,
        category : string,
        price : number,
        rating : number
        ){
        this.name = name, 
        this.imagePath = imagePath,
        this.category = category,
        this.price = price,
        this.rating = rating

    }
}