import { clothingProducts } from './clothing';
import { footwearProducts } from './footwear';
import { accessoryProducts } from './accessories';
import { bagProducts } from './bags';
import { jewelryProducts } from './jewelry';

export const demoCatalog = [...clothingProducts, ...footwearProducts, ...accessoryProducts, ...bagProducts, ...jewelryProducts];
export const demoCategories = [...new Set(demoCatalog.map((product) => product.category))];
