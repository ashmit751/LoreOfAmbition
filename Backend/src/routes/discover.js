import { Router } from 'express';
import { createSupabaseServerClient } from '../lib/supabase.js';

export const discoverRouter = Router();

discoverRouter.get('/', async (req, res, next) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    const supabase = createSupabaseServerClient();

    let query = supabase
      .from('profiles')
      .select('id, username, display_name, profile_image, niche, creator_level, rank_points, verified')
      .order('rank_points', { ascending: false })
      .order('display_name', { ascending: true, nullsFirst: true });

    if (search) {
      query = query.or(
        `username.ilike.%${search}%,display_name.ilike.%${search}%,niche.ilike.%${search}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
});