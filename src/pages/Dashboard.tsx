import Navbar from "@/components/navbar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { data: user } = useAuth();
  console.log(user);

  return (
    <>
      <div>
        <Navbar />
        <p>Welcome back</p>
        <p className="text-3xl bg-white dark:bg-black dark:text-white">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
    </>
  );
};

export default Dashboard;
