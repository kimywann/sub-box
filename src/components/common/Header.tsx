import AuthButton from '@components/common/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { supabase } from '@/supabaseClient';
import { deleteUser } from '@api/deleteUser';

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

  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
      const { success, error } = await deleteUser();
      if (success) {
        alert('회원 탈퇴가 완료되었습니다.');
        navigate('/');
        window.location.reload();
      } else {
        alert(`회원 탈퇴 실패: ${error}`);
      }
    }
  };

  return (
    <header className="m-0 w-full p-3">
      <section className="mx-auto flex max-w-6xl justify-between">
        <div className="flex items-center gap-10">
          <Link to="/">
            <p className="text-2xl font-bold text-blue-500">SubBox</p>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {user ? (
            <>
              <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
              <button
                onClick={handleDeleteAccount}
                className="text-md cursor-pointer rounded-md px-3 py-2 text-red-400 hover:bg-red-100"
              >
                회원탈퇴
              </button>
            </>
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
