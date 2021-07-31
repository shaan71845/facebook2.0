import { Request, Response } from "express";
import logger from "../logger";
import Post from "../models/post.model";
import cloudinary from "../utils/cloudinary.util";

export const createPost = async (req: Request, res: Response) => {
  const { imageURL, caption } = req.body;

  try {
    const image = await cloudinary.v2.uploader.upload(imageURL, {
      folder: "facebook2.0/posts",
    });

    const newPost = await new Post({
      imageURL: image.secure_url,
      caption,
      author: res.locals.userId,
    });
    await newPost.save();

    res.json({ post: newPost });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ err: err.message });
  }
};
