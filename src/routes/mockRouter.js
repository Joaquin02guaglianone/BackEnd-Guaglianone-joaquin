import { Router } from "express";
import { mockedProducts } from "../controllers/controllerMocks.js";


export const RouterMock = Router;

RouterMock.get('/', mockedProducts);
