"use client";

import React, {useState} from "react";

import {Calendar} from "@/components/ui/calendar";
export function CalenderComponent({range, setRange}) {
  const defaultMonth = new Date();
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <Calendar
          mode="range"
          defaultMonth={defaultMonth}
          selected={range}
          numberOfMonths={2}
          pagedNavigation
          onSelect={setRange}
          max={3}
        />
      </div>
    </div>
  );
}
