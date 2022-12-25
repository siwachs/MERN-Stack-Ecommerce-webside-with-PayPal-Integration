import expressAsyncHandler from "express-async-handler";
import Product from "../Models/productModel.js";

export const getProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = 3;
  const pageNo = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const productCount = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (pageNo - 1))
    .sort({ updatedAt: "desc" });
  res.json({
    products,
    pageNo,
    pages: Math.ceil(productCount / pageSize),
  });
});

export const getProductById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    res.json(product);
  }

  res.status(404);
  throw new Error("Product Not Found");
});

export const deleteProductById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    res.json({
      message: "Product Deleted",
    });
  }

  res.status(404);
  throw new Error("Product Not Found");
});

//Create and Edit a Product
export const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/image(2).jpg",
    brand: "Sample",
    category: "Sample Category",
    description: "Desc",
    numReviews: 0,
    countInStock: 0,
  });

  const createdProduct = await product.save();

  res.status(202).json(createdProduct);
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Can't able to find Product");
  }
  product.name = name || product.name;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.description = description || product.description;
  product.price = price || product.price;
  product.countInStock = countInStock || product.countInStock;
  const createdProduct = await product.save();

  res.status(202).json(createdProduct);
});

export const createReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  //Total Rating (Average)
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Review Added" });
});

export const getTopRatedProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({
      rating: -1,
    })
    .limit(5);

  res.json(products);
});
