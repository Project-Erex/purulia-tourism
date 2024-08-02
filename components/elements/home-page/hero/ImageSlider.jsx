import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import supabase from "@/config/supabaseClient";

export default function ImageSlider() {
  const [isLoading, setIsLoading] = useState(true);
  const [isData, setIsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase.from("hero_bg_Image").select("*");
        if (error) {
          throw error;
        }
        setIsData(data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Image
        width={1200}
        height={1200}
        className="w-full h-[1000px] lg:h-screen object-cover"
        src={"/Rugribrize.jpg"}
        alt={"kfn"}
      />
    );
  }

  if (!isData || isData.length === 0) {
    return <div>No images found</div>;
  }

  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Slider {...settings}>
        {isData.map((item, index) => (
          <div key={index}>
            <Image
              width={1200}
              height={1200}
              className="w-full h-[1000px] lg:h-screen object-cover"
              src={item.image || "/Rugribrize.jpg"}
              alt={item.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

// import React, {useEffect, useState} from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
// import supabase from "@/config/supabaseClient";
// import ImageWithFallback from "@/components/ImageWithFallback";
// // import ImageWithFallback from "../../../../public/Rugribrize.jpg";

// export default function ImageSlider() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isData, setIsData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const {data, error} = await supabase.from("hero_bg_Image").select("*");
//         if (error) {
//           throw error;
//         }
//         setIsData(data || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching images:", error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   var settings = {
//     dots: true,
//     fade: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     waitForAnimate: false,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     pauseOnHover: false,
//   };

//   return (
//     <div className="w-full h-full overflow-hidden">
//       <Slider {...settings}>
//         {isData.map((item, index) => (
//           <div key={index}>
//             <ImageWithFallback
//               alt={item.title}
//               width={1200}
//               height={1200}
//               className="w-full h-[1000px] lg:h-screen object-cover"
//               src={item.image}
//               fallbackSrc={"/Rugribrize.jpg"}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
