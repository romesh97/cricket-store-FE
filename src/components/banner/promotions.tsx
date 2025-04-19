import { BANNER_IMAGES } from "../../utils/consts";
import SimpleCarousel from "../slider";

const AdvSliderSection: React.FC = () => {
  return (
    <SimpleCarousel
      images={BANNER_IMAGES}
      autoPlay={true}
      interval={5000}
      showIndicators={true}
      showArrows={true}
    />
  );
};

export default AdvSliderSection;
