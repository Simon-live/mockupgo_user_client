import LogoShape from "./logoShape";
import LogoText from "./logotext";

const CustomLogo = ({ color, className, type, ...props }) => {
  switch (type) {
    case "shape":
      return (
        <LogoShape
          color={color}
          className={className}
          {...props}
        />
      );
    case "text":
      return (
        <LogoText
          color={color}
          className={className}
          {...props}
        />
      );
    default:
      return (
        <div className={`${className} flex gap-2 items-center`} {...props}>
          <LogoShape className="h-4/5" color={color} />
          <LogoText className="h-full" color={color} />
        </div>
      );
  }
};

export default CustomLogo;
