import CartRepository from "../../persistence/repository/cartRepository.js";
import productRepository from "../../persistence/repository/productRepository.js";
import userRepository from "../../persistence/repository/userRepository.js";
import { HttpResponse } from "../../utils/httpRes.js";

export const user = new userRepository();
export const prodRepository = new productRepository();
export const cartRepository = new CartRepository();
export const httpRes = new HttpResponse()




