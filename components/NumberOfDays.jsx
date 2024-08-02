"use client";
import {useState} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DistanceDropdown({onSelectDays}) {
  const dayOptions = [
    {id: 1, label: "1 Day"},
    {id: 2, label: "2 Days"},
    {id: 3, label: "3 Days"},
  ];

  return (
    <div className="w-full">
      {/* <div className="mr-5">Select Travel Days:{"  "}</div> */}
      <Select onValueChange={onSelectDays}>
        <SelectTrigger>
          <SelectValue placeholder="Select your Travel days" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Days</SelectLabel>
            <SelectItem value={null}>All</SelectItem>
            {dayOptions.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
