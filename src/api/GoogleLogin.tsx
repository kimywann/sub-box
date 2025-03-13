import { supabase } from '../supabaseClient';
import google from '@assets/images/google-logo.png';

const GoogleLogin = () => {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) console.error('로그인 실패:', error.message);
  };

  return (
    <div className="flex justify-center py-96">
      <button
        className="relative flex w-96 cursor-pointer items-center rounded-4xl bg-gray-50 px-6 py-3"
        onClick={handleLogin}
      >
        <img src={google} alt="Google Logo" className="h-12 w-12" />
        <span className="absolute left-1/2 -translate-x-1/2 font-bold text-gray-700">구글로 시작하기</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
