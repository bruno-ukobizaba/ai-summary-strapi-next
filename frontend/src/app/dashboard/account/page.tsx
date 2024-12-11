import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/forms/profile-form";

const AccountPage = async () => {
  const user = await getUserMeLoader();
  const userData = user.data;
  //   const userImage = userData?.image;

  // Display the user's information if authenticated
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
      <ProfileForm
        data={userData}
        className="col-span-3"
      />
    </div>
  );
};

export default AccountPage;
