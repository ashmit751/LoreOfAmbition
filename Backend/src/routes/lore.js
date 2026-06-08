import { Router } from 'express';
import { createSupabaseServerClient } from '../lib/supabase.js';

export const loreRouter = Router();

loreRouter.get('/', async (_req, res, next) => {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('lore_posts')
      .select('*, profiles:author_id (id, username, display_name, profile_image)')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

loreRouter.post('/', async (req, res, next) => {
  try {
    const supabase = createSupabaseServerClient();
    const payload = {
      author_id: req.body.author_id,
      content: req.body.content,
    };

    const { data, error } = await supabase.from('lore_posts').insert(payload).select('*').single();

    if (error) {
      throw error;
    }

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
});

loreRouter.post('/:postId/like', async (req, res, next) => {
  try {
    const supabase = createSupabaseServerClient();
    const payload = {
      post_id: req.params.postId,
      user_id: req.body.user_id,
    };

    const { data, error } = await supabase.from('lore_likes').insert(payload).select('*').single();

    if (error) {
      throw error;
    }

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
});

loreRouter.post('/:postId/comments', async (req, res, next) => {
  try {
    const supabase = createSupabaseServerClient();
    const payload = {
      post_id: req.params.postId,
      user_id: req.body.user_id,
      content: req.body.content,
    };

    const { data, error } = await supabase
      .from('lore_comments')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
});