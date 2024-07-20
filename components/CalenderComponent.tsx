"use client";

import {useState} from "react";

import {Calendar} from "@/components/ui/calendar";

export function CalenderComponent() {
  const [value, setValue] = useState<Date[]>([]);
  const [disabledDays, setDisabledDays] = useState<Date[]>([]);

  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    const newValue = [...value];
    const dayString = day.toDateString(); // Convert the day to string for comparison

    if (modifiers.selected) {
      const index = value.findIndex((d) => d.toDateString() === dayString);
      newValue.splice(index, 1);
      setDisabledDays([]); // Enable all days when a day is deselected
    } else {
      newValue.push(day);
    }

    if (newValue.length > 3) {
      // If more than 3 dates are selected, ignore the last selection
      return;
    }

    // Sort the selected dates
    newValue.sort((a, b) => a.getTime() - b.getTime());

    // Check if dates are consecutive
    let isConsecutive = true;
    for (let i = 1; i < newValue.length; i++) {
      if (
        (newValue[i].getTime() - newValue[i - 1].getTime()) / (1000 * 60 * 60 * 24) !==
        1
      ) {
        isConsecutive = false;
        break;
      }
    }

    if (isConsecutive) {
      setValue(newValue);

      if (newValue.length === 3) {
        // Disable all days except the selected ones
        const newDisabledDays = [];
        const firstDay = new Date(newValue[0]);
        firstDay.setDate(firstDay.getDate() - 1);
        const lastDay = new Date(newValue[2]);
        lastDay.setDate(lastDay.getDate() + 1);
        newDisabledDays.push(firstDay, lastDay);
        setDisabledDays(newDisabledDays);
      } else {
        setDisabledDays([]); // Enable all days when less than 3 dates are selected
      }
    }
  };

  const handleResetClick = () => {
    setValue([]);
    setDisabledDays([]);
  };

  let footer = <>Please pick one or more days.</>;

  if (value.length > 0) {
    footer = (
      <>
        You selected {value.length} days.{" "}
        <button onClick={handleResetClick}>Reset</button>
      </>
    );
  }

  return (
    <Calendar
      onDayClick={handleDayClick}
      selected={value}
      disabled={disabledDays}
      footer={footer}
    />
  );
}
