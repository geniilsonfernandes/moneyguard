const CircleSVG = ({ percentage }: { percentage: number }) => {
  return (
    <svg width="65" height="65" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="37.9985"
        cy="38.3247"
        r="35.3965"
        fill="none"
        stroke="#974EF3"
        strokeWidth="7"
        strokeDasharray="222.5135"
        strokeDashoffset={(100 - percentage) * 222.5135}
      />
    </svg>
  );
};
export default CircleSVG;
