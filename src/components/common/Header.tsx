import AuthButton from './AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../supabaseClient';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃 실패:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="m-0 w-full p-3">
      <section className="mx-auto flex max-w-6xl justify-between">
        <div>
          <Link to="/">
            <p className="text-2xl font-bold text-blue-500">SubBox</p>
          </Link>
        </div>
        <div>
          {user ? (
            <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
          ) : (
            <Link to="/signin">
              <AuthButton>로그인 | 회원가입</AuthButton>
            </Link>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
