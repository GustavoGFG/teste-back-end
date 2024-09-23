import axios from 'axios';
import { Command } from 'commander';
import Product from '../models/Product';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';

// Carregar as variáveis de ambiente
dotenv.config();

connectDB();

const program = new Command();

// Função para importar um produto específico pelo ID externo
const importProductById = async (id: number) => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const productExists = await Product.findOne({ name: data.title });

    if (!productExists) {
      const newProduct = new Product({
        name: data.title,
        price: data.price, // Em centavos
        description: data.description,
        category: data.category,
        image_url: data.image,
      });

      await newProduct.save();
      console.log(`Produto com ID ${id} importado com sucesso.`);
    } else {
      console.log(`Produto com ID ${id} já existe.`);
    }
  } catch (error) {
    console.error(`Erro ao importar produto com ID ${id}:`, error);
  }
};

// Função para importar todos os produtos
const importAllProducts = async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products');
    for (const productData of data) {
      const productExists = await Product.findOne({ name: productData.title });

      if (!productExists) {
        const newProduct = new Product({
          name: productData.title,
          price: productData.price, // Em centavos
          description: productData.description,
          category: productData.category,
          image_url: productData.image,
        });

        await newProduct.save();
        console.log(`Produto "${productData.title}" importado com sucesso.`);
      } else {
        console.log(`Produto "${productData.title}" já existe.`);
      }
    }
  } catch (error) {
    console.error('Erro ao importar todos os produtos:', error);
  }
};

// Definindo o comando para importar todos os produtos
program
  .command('import-products')
  .description('Import all products from an external API')
  .action(importAllProducts);

// Definindo o comando para importar um produto específico
program
  .command('import-product --id <id>')
  .description('Import a product from an external API by its ID')
  .action(id => {
    importProductById(parseInt(id, 10));
  });

// Executando os comandos
program.parse(process.argv);
