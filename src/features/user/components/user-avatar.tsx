import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";
import S3Image from "@/features/upload/components/s3-image";

const UserAvatar = ({
  name,
  imagePath,
}: {
  name: string;
  imagePath?: string;
}) => {
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      {imagePath && <S3Image imagePath={imagePath} alt={name} />}
      {!imagePath && (
        <AvatarFallback className="rounded-lg">
          {" "}
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
