import { Router } from 'express';
import { createSupabaseServerClient } from '../lib/supabase.js';

export const authRouter = Router();

// Sign Up: creates Supabase auth user + profile record
authRouter.post('/signup', async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required.' });
    }

    const supabase = createSupabaseServerClient();

    // Check if username is already taken in profiles table
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.trim().toLowerCase())
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken.' });
    }

    // 1. Sign up user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    const userId = authData.user?.id;

    // 2. Create profile in profiles table
    if (userId) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          username: username.trim().toLowerCase(),
          display_name: username.trim(),
          creator_level: 'Beginner',
          rank_points: 0,
        })
        .select('*')
        .single();

      if (profileError) {
        console.warn('Profile creation warning:', profileError);
      }

      return res.status(201).json({
        user: authData.user,
        session: authData.session,
        profile: profileData || { id: userId, username },
      });
    }

    res.status(201).json({ user: authData.user, session: authData.session });
  } catch (error) {
    next(error);
  }
});

// Sign In: authenticates via Supabase Auth + returns profile
authRouter.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const supabase = createSupabaseServerClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .maybeSingle();

    res.json({
      user: authData.user,
      session: authData.session,
      profile: profile || null,
    });
  } catch (error) {
    next(error);
  }
});

// Update Profile during Onboarding
authRouter.post('/onboarding', async (req, res, next) => {
  try {
    const {
      userId,
      display_name,
      bio,
      profile_image,
      niche,
      youtube_url,
      instagram_url,
      tiktok_url,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const supabase = createSupabaseServerClient();

    const updates = {
      id: userId,
      updated_at: new Date().toISOString(),
    };

    if (display_name !== undefined) updates.display_name = display_name;
    if (bio !== undefined) updates.bio = bio;
    if (profile_image !== undefined) updates.profile_image = profile_image;
    if (niche !== undefined) updates.niche = niche;
    if (youtube_url !== undefined) updates.youtube_url = youtube_url;
    if (instagram_url !== undefined) updates.instagram_url = instagram_url;
    if (tiktok_url !== undefined) updates.tiktok_url = tiktok_url;

    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert(updates)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    res.json({ data: profile });
  } catch (error) {
    next(error);
  }
});
