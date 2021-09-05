import PhotosCard from "../../components/PhotosCard";
import IntroCard from "../../components/IntroCard";
import NewPost from "../../components/NewPost";
import Posts from "../../components/Posts";
import useProfile from "../../hooks/useProfile";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Post from "../../components/Post";
import useProfilePost from "../../hooks/useProfilePost";

const Profile = () => {
  const { id }: { id: string } = useParams();
  const profile = useProfile(id);
  const posts = useProfilePost(id);

  return (
    <>
      <div className="flex flex-col items-center h-1/2 shadow-md">
        <div className="header relative mx-auto w-full lg:w-3/4 h-96 justify-center items-end z-10">
          <div
            className="h-full w-full"
            style={{
              background: `url('https://scontent.fknu1-2.fna.fbcdn.net/v/t1.6435-9/p720x720/48426632_764502247253446_6953128864801357824_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=cKPvwQiherwAX-DAUdu&_nc_ht=scontent.fknu1-2.fna&oh=c4e877ca013e2934a768f4f42c93aafa&oe=6154ED41')`,
              backgroundSize: "cover",
            }}
          ></div>
          {profile.isLoading ? (
            <Skeleton
              circle
              width={200}
              height={200}
              className="absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2"
            />
          ) : (
            <img
              src={profile.data?.avatar}
              alt="Profile Picture"
              className="w-36 h-36 border-4 border-white rounded-full absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2"
            />
          )}
        </div>
        <div className="w-full text-center">
          <h1 className="font-bold text-4xl mt-4">
            {profile.isLoading ? (
              <Skeleton count={1} height={30} width={100} />
            ) : (
              profile.data?.fullName
            )}
          </h1>
          <a href="#!" className="text-fb font-bold mt-4 inline-block">
            Add Bio
          </a>
        </div>
        <div
          className="bg-gray-200 w-full mt-4"
          style={{ height: "2px" }}
        ></div>
        <div className="nav-menu w-full container">
          <ul className="flex">
            <li className="text-fb font-semibold text-lg mr-6 border-b-4 p-4 border-fb">
              Posts
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              About
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              Friends
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              Photos
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-100 pt-5">
        <div className="flex justify-around container">
          <div className="sidebar hidden md:flex flex-col w-1/3 mr-4 static top-4">
            <IntroCard
              details={profile.data?.details}
              createdAt={profile.data?.createdAt}
              followers={profile.data?.followers?.length}
              following={profile.data?.following?.length}
            />
            <PhotosCard />
          </div>
          <main className="main w-full md:w-3/4 mr-4">
            <NewPost />
            <Posts posts={posts} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
