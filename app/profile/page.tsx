import { AuthServerUtils } from "@/lib/utils/auth/server";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = async () => {
  const user = await AuthServerUtils.getAuthUser();

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Please sign in to view your profile.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              {user.profile && <AvatarImage src={user.profile} alt="Profile Picture" />}
              <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground text-sm">ID: {user.id}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProfilePage;
