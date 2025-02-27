interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const AuthButton = ({ children, onClick }: AuthButtonProps) => {
  return (
    <button className="cursor-pointer rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100" onClick={onClick}>
      {children}
    </button>
  );
};

export default AuthButton;
