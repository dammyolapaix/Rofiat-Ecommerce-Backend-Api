import { NextFunction, Request, Response } from 'express'
import IProduct, { IBaseProduct } from './product.interfaces'
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getSingleProductBySlugName,
} from './product.services'

export const getProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getProducts()

    res.status(200).json({ success: true, count: products.length, products })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getSingleProductHandler = async (
  req: Request<{ slug: IBaseProduct['slug'] }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getSingleProductBySlugName(req.params.slug)

    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const addProductHandler = async (
  req: Request<{}, {}, IBaseProduct, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await addProduct(req.body)

    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const editProductHandler = async (
  req: Request<{ id: IProduct['_id'] }, {}, IBaseProduct, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await editProduct(req.params.id, req.body)

    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteProductHandler = async (
  req: Request<{ id: IProduct['_id'] }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await deleteProduct(req.params.id)

    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error })
  }
}