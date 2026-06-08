import { Router } from 'express';
import { createSupabaseServerClient } from '../lib/supabase.js';

export const profilesRouter = Router();

profilesRouter.get('/', async (_req, res, next) => {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('display_name', { ascending: true, nullsFirst: true });

    if (error) {
      throw error;
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

profilesRouter.get('/:id', async (req, res, next) => {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

profilesRouter.post('/', async (req, res, next) => {
  try {
    const supabase = createSupabaseServerClient();
    const payload = {
      username: req.body.username,
      display_name: req.body.display_name ?? null,
      bio: req.body.bio ?? null,
      profile_image: req.body.profile_image ?? null,
      niche: req.body.niche ?? null,
      creator_level: req.body.creator_level ?? 'Beginner',
      youtube_url: req.body.youtube_url ?? null,
      instagram_url: req.body.instagram_url ?? null,
      tiktok_url: req.body.tiktok_url ?? null,
      verified: req.body.verified ?? false,
      rank_points: req.body.rank_points ?? 0,
    };

    if (req.body.id) {
      payload.id = req.body.id;
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })
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