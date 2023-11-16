import Girder from "../svgIcons/girder";
import Dots from "../svgIcons/dots";
import Pipe from "../svgIcons/pipe";
import Profile from "../svgIcons/profile";
import Reba from "../svgIcons/reba";
import Steel from "../svgIcons/steel";
import Stud from "../svgIcons/stud";
import Corner from "../svgIcons/corner";
import Varagh from "../svgIcons/varagh";

const svgIconStyle = {
  color: "primary.main",
  transition: "0.3s",
  fontSize: {
    sx: 30,
    sm: 35,
    lg: 40,
  },
};

const buttonIcons = [
  {
    svg: () => <Girder viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />,
    title: "تیرآهن",
    id: 1,
  },
  {
    svg: () => (
      <Profile viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />
    ),
    title: "پروفیل",
    id: 8,
  },
  {
    svg: () => <Reba viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />,
    title: "میلگرد",
    id: 2,
  },
  {
    svg: () => <Stud viewBox="0 0 40 34" className="svg" sx={svgIconStyle} />,
    title: "نبشی و ناودانی",
    id: 9,
  },
  {
    svg: () => <Pipe viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />,
    title: "لوله",
    id: 7,
  },
  {
    svg: () => <Steel viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />,
    title: "استیل",
    id: 12,
  },
  {
    svg: () => (
      <Varagh viewBox="0 0 300 300" className="svg" sx={svgIconStyle} />
    ),
    title: "ورق",
    id: 3,
  },

  {
    svg: () => <Corner viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />,
    title: "تجهیزات",
    id: 10,
  },
  {
    svg: () => <Dots viewBox="0 0 36 10" className="svg" sx={svgIconStyle} />,
    title: "سایر",
    id: 0,
  },
];
export default buttonIcons;
