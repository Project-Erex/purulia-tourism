"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import supabase from "@/config/supabaseClient";

export default function Page({params}) {
  console.log("dj");
  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
          .from("destinations")
          .select("*")
          .eq("id", params.slugs[0]);
        if (error) {
          throw error;
        }
        setIsData(data || []);
        console.log("first,da", data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isData || isData.length === 0) {
    return (
      <>
        <div>No images found</div>
      </>
    );
  }
  return (
    <div className="w-full  mx-auto antialiased relative pt-16">
      {isData.map((item, index) => (
        <div key={`content-${index}`} className="mb-10">
          <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
            {item.badge}
          </h2>

          <p className="text-xl mb-4">{item.name}</p>

          <div className="text-sm  prose prose-sm dark:prose-invert">
            {item?.image && (
              <Image
                src={item.image}
                alt="blog thumbnail"
                height="1000"
                width="1000"
                className="rounded-lg mb-10 object-cover"
              />
            )}
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}

const dummyContent = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur. Esse adipisicing
          laboris consectetur enim ipsum reprehenderit eu deserunt Lorem ut aliqua anim
          do. Duis cupidatat qui irure cupidatat incididunt incididunt enim magna id est
          qui sunt fugiat. Laboris do duis pariatur fugiat Lorem aute sit ullamco. Qui
          deserunt non reprehenderit dolore nisi velit exercitation Lorem qui do enim
          culpa. Aliqua eiusmod in occaecat reprehenderit laborum nostrud fugiat voluptate
          do Lorem culpa officia sint labore. Tempor consectetur excepteur ut fugiat
          veniam commodo et labore dolore commodo pariatur.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad veniam in
          commodo id reprehenderit adipisicing. Proident duis exercitation ad quis ex
          cupidatat cupidatat occaecat adipisicing.
        </p>
        <p>
          Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod reprehenderit
          deserunt amet laborum consequat adipisicing officia qui irure id sint
          adipisicing. Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia aliquip
          deserunt veniam deserunt officia adipisicing aliquip proident officia sunt.
        </p>
      </>
    ),
    badge: "React",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// import Image from "next/image";
// import React from "react";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 pt-20">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="flex flex-col lg:flex-row">
//           <div className="lg:w-1/2">
//             <Image
//               src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt="Cabin"
//               width={700}
//               height={500}
//               className="object-cover w-full h-full"
//             />
//           </div>
//           <div className="lg:w-1/2 p-8">
//             <h2 className="text-3xl font-bold mb-4">Monsoon Cottage</h2>
//             <p className="text-gray-600 mb-2">Bora, Netherlands</p>
//             <p className="text-green-600 font-semibold mb-4">$120.00/Night</p>

//             <div className="mb-4">
//               <div className="flex space-x-4">
//                 <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-700">
//                   4 Adults
//                 </span>
//                 <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-700">
//                   Unsecured
//                 </span>
//                 <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-700">
//                   Lake Nearby
//                 </span>
//                 <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-700">
//                   Bonfire Area
//                 </span>
//                 <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-700">
//                   Dog Allowed
//                 </span>
//                 <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-700">
//                   Sauna
//                 </span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h3 className="text-xl font-semibold mb-2">Overview</h3>
//               <p className="text-gray-700">
//                 Organizing a mountain cottage requires careful logistical planning and
//                 support infrastructure. This may involve arranging transportation,
//                 accommodation, medical facilities, communication systems, and supplies
//                 such as food and water for the participants.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-2">Locations</h3>
//               <p className="text-gray-700">
//                 105km from Amsterdam, Calculate with a travel time of 1:30 h
//               </p>
//               <div className="mt-2">
//                 <Image
//                   src="/images/map.jpg"
//                   alt="Map"
//                   width={400}
//                   height={300}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
