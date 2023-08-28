import { generateMocks } from "../utils.js";

export const mockedProducts = async (req, res) => {
    res.send(generateMocks());
}