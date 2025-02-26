import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error && error.message !== 'Auth session missing!') {
          // Auth session missing은 일반적인 상황이므로 에러 로그에서 제외
          console.error('사용자 가져오기 실패:', error.message);
        }

        setUser(data?.user ?? null);
      } catch (err) {
        console.error('예상치 못한 에러:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};
