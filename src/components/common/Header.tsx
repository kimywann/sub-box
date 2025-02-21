import Button from './AuthButton';

const Header = () => {
  return (
    <header className="m-0 w-full p-3">
      <section className="mx-auto flex max-w-6xl justify-between">
        <div>
          <p className="text-2xl font-bold text-blue-500">SubBox</p>
        </div>
        <div>
          <Button>로그인 | 회원가입</Button>
        </div>
      </section>
    </header>
  );
};
export default Header;
