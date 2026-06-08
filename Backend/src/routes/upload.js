import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { createSupabaseServerClient, getSupabaseStorageBucketName } from '../lib/supabase.js';

const upload = multer({ storage: multer.memoryStorage() });

export const uploadRouter = Router();

uploadRouter.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const bucket = getSupabaseStorageBucketName();
    const supabase = createSupabaseServerClient();
    const fileExt = req.file.originalname.includes('.')
      ? req.file.originalname.split('.').pop()
      : 'bin';
    const fileName = `${Date.now()}-${randomUUID()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    res.status(201).json({
      url: data.publicUrl,
      path: filePath,
      bucket,
    });
  } catch (error) {
    next(error);
  }
});