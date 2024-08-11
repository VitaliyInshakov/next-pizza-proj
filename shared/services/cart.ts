import { axiosInstance } from "./axios";
import { CartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>("/cart")).data;
};
