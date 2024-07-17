import {cn} from "@/utils/cn";
import {Badge} from "../ui/badge";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mx-auto",
        className,
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick, // corrected prop name
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: any; // corrected prop name
}) => {
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    }
    return str;
  }
  return (
    <div
      onClick={onClick} // corrected prop name
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-gray-200 justify-between flex flex-col space-y-4",
        className,
      )}>
      {header}
      <div className="flex items-center justify-between">
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          {title}
        </div>
        <Badge className="line-clamp-1">{icon}</Badge>
      </div>
      <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
        {truncateString(description, 50)}
      </div>
    </div>
  );
};
