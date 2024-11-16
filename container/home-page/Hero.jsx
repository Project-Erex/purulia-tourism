import MultiLayerParallax from "@/components/elements/home-page/hero/MultiLayerParallax";
import BorderImage from "@/components/section/BorderImage";

export default function Hero() {
  return (
    <div className="w-full h-screen  relative">
      <MultiLayerParallax />
      <BorderImage type="bottom" />
    </div>
  );
}
