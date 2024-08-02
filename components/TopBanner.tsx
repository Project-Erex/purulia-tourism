import Image from "next/image";

import {AspectRatio} from "@/components/ui/aspect-ratio";

export function TopBanner() {
  return (
    <AspectRatio ratio={16 / 4} className="bg-muted mb-5 xl:mx-0 mx-4">
      <Image
        src="/bannerImage.jpg"
        alt="Photo by Drew Beamer"
        fill
        className="rounded-md object-cover"
      />
    </AspectRatio>
  );
}
