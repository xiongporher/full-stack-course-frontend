import UserProfileComponent from "@/components/UserProfileComponent";

const UserProfilePage = () => {
  const user = { id: 1, name: "John Doe", email: "john.doe@example.com", lastname: 'Test' };
  return (
    <div>
      <UserProfileComponent user={user} />
    </div>
  );
};

export default UserProfilePage;
