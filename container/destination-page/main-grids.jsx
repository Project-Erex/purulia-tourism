"use client";
import React, {useEffect, useState} from "react";

import {BentoGrid, BentoGridItem} from "@/components/aceternity/bento-grid";

import supabase from "@/config/supabaseClient";

import Image from "next/image";

import {useRouter} from "next/navigation";

import {PaginationComponent} from "./PaginationComponent";
import {DropdownMenu} from "@/components/DropdownMenu";

export function BentoGridDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [isData, setIsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 8;
  const router = useRouter();

  //   .select("category_name,categories(category_name)");
  // console.log("whhhhhhh", categories[0].categories.category_name);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase
          .from("destinations")
          .select("*,categories(category_name)", {count: "exact"});

        if (selectedCategory) {
          query = query.eq("category_name", selectedCategory); // Adjust query to use selectedCategory
        }

        const {count: total, error: countError} = await query;

        if (countError) {
          throw countError;
        }

        setTotalItems(total);

        query = supabase
          .from("destinations")
          .select("*, categories(category_name)")
          .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

        if (selectedCategory) {
          query = query.eq("category_name", selectedCategory); // Adjust query to use selectedCategory
        }

        const {data, error} = await query;

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
  }, [currentPage, selectedCategory]);

  const handleItemClick = (id) => {
    router.push(`/destination/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryId) => {
    // console.log("catego", categoryId);
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to the first page on category change
    setIsLoading(true); // Set loading state while fetching new data
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isLoading) {
    return <div className="max-w-7xl mx-auto">Loading...</div>;
  }

  if (!isData || isData.length === 0) {
    return <div>No images found</div>;
  }
  // console.log("isdata", isData[0].category_name);
  return (
    <div className="mx-4">
      <div className="md:flex items-center justify-between pb-7 max-w-7xl mx-auto ">
        <div className="text-3xl font-DMSans font-bold pb-5">Tourist Places</div>
        <DropdownMenu onSelectCategory={handleCategoryChange} />
      </div>
      <BentoGrid className="max-w-7xl mx-auto pb-6">
        {isData.map((item, i) => {
          // console.log("ddddd", item.category_name);
          const selectedd =
            item.category_name === 1
              ? "Forest"
              : item.category_name === 2
              ? "Dam"
              : item.category_name === 3
              ? "Waterfall"
              : item.category_name === 4
              ? "Hill"
              : item.category_name === 5
              ? "Historical Site"
              : item.category_name === 6
              ? "Village"
              : item.category_name === 7
              ? "Sacred site"
              : item.category_name === 8
              ? "Scenic Spot"
              : "All";
          return (
            <BentoGridItem
              key={i}
              title={item.name}
              description={item.description}
              onClick={() => handleItemClick(item.id)}
              header={
                <div className="w-full h-full  rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
                  <Image
                    src={item.image}
                    width={0}
                    alt="d"
                    height={0}
                    sizes="100vw"
                    style={{width: "100%", height: "200px", borderRadius: "10px"}}
                  />
                </div>
              }
              icon={selectedd}
            />
          );
        })}
      </BentoGrid>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
