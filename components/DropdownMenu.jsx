"use client";
import {useState, useEffect} from "react";
import supabase from "@/config/supabaseClient";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DropdownMenu({onSelectCategory}) {
  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: categories, error} = await supabase.from("categories").select("*");

        if (error) {
          throw error;
        }
        setIsData(categories || []);
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
    return <div>No categories found</div>;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="mr-5">Filter:{"  "}</div>
      <Select onValueChange={onSelectCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value={null}>All</SelectItem>
            {isData.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.category_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
