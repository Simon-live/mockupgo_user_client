const LogoShape = ({ color, className, ...props }) => {
  let fill = new Array(3);
  switch (color) {
    case "dark":
      fill.fill("fill-slate-900");
      break;

    case "light":
      fill.fill("fill-slate-50");
      break;

    case "opposite":
      fill = ["fill-themeLight", "fill-theme-blue", "fill-theme-pink"];
      break;

    default:
      fill = ["dark:fill-white fill-slate-900", "fill-theme-blue", "fill-theme-pink"];
      break;
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 65"
      height="100%"
      {...props}>
      <path
        className={fill[1]}
        d="M65,0 C47.4495633,0 33.2222222,14.55038 33.2222222,32.4993081 C33.2222222,50.44962 47.4495633,65 65,65 L65,0 Z"></path>
      <polygon
        className={fill[0]}
        points="0 31.7777778 31.7777778 31.7777778 31.7777778 0 0 0"></polygon>
      <path
        className={fill[2]}
        d="M31.7777778,47.6666667 C31.7777778,56.4425615 24.6634307,63.5555556 15.8888889,63.5555556 C7.11299403,63.5555556 0,56.4425615 0,47.6666667 C0,38.8907718 7.11299403,31.7777778 15.8888889,31.7777778 C24.6634307,31.7777778 31.7777778,38.8907718 31.7777778,47.6666667"></path>
    </svg>
  );
};

export default LogoShape;
