// components/UserProfile.tsx
interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
}

const UserProfileComponent: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h1>
        {user.name} {user.lastname}
      </h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfileComponent;
