import { useRouteGuard } from '../hooks/useRouteGuard';
import { useAuth } from '../hooks/useAuth';

const MySubscriptions = () => {
  useRouteGuard();
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-2xl font-bold">안녕하세요, {user.email}님!</h1>
        </div>
      )}
    </>
  );
};

export default MySubscriptions;
