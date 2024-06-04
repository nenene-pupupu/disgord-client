import { IconGreen, IconRed, IconSky, IconYellow } from "@/assets/svg";

const ProfileIcon = ({
  index,
  className,
}: {
  index: number;
  className: string;
}) => {
  console.log(index);
  switch (index) {
    case 1:
      return <img src={IconSky} className={className} />;
    case 2:
      return <img src={IconGreen} className={className} />;
    case 3:
      return <img src={IconRed} className={className} />;
    case 4:
      return <img src={IconYellow} className={className} />;
    default:
      return <img src={IconSky} className={className} />;
  }
};

export default ProfileIcon;
