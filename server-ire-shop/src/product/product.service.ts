import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ){}

  //create product
  async create(createProductDto: CreateProductDto) {
    const {} = createProductDto;
    const newProduct = await this.productRepository.create({
      ...createProductDto
    })

    await this.productRepository.save(newProduct)

    return newProduct;
  }

  //find all prducts
  async findAll() {
    return await this.productRepository.find()
    
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  //update product
  async update(id: string, updateProductDto: UpdateProductDto) {
    const {
      title, 
      description, 
      imgUrl1, 
      price, 
      quantity, 
      size, 
      color, 
      shippings, 
      sex, 
      brands, 
      category
    } = updateProductDto;

    const findProduct = await this.productRepository.findOne({ where: { id: id } });
    
    // check if product exist 
    if (!findProduct) {
      throw new HttpException('No product found!!', HttpStatus.NOT_FOUND)
    }

    let updateProduct: any = {}

    title && (updateProduct.title = title);
    description && (updateProduct.description = description);
    imgUrl1 && (updateProduct.imgUrl1 = imgUrl1);
    price && (updateProduct.price = price);
    quantity && (updateProduct.quantity = quantity);
    category && (updateProduct.category = category);
    size && (updateProduct.size = size);
    color && (updateProduct.color = color);
    shippings && (updateProduct.shippings = shippings);
    sex && (updateProduct.sex = sex);
    brands && (updateProduct.brands = brands);

    await this.productRepository.update({id: id}, updateProduct)

    const findProductAgain = await this.productRepository.findOne({ where: { id: id } });

    return findProductAgain

  }

  //delete product
  async remove(id: string) {
    const findProduct = await this.productRepository.findOne({ where: { id: id } });

    // check if product exist 
    if (!findProduct) {
      throw new HttpException('No product found!!', HttpStatus.NOT_FOUND)
    }

    await this.productRepository.remove(findProduct)

    return 'the product is deleted'
  }
}
