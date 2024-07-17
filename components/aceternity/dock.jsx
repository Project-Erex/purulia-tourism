"use client";
import {cn} from "@/utils/cn";
import {cva} from "class-variance-authority";
import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import Link from "next/link";
import React, {useRef} from "react";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(" w-max  h-[58px] py-4 flex items-end gap-2 rounded-2xl");

const Dock = React.forwardRef(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({className}), className)}>
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  link,
  ...props
}) => {
  const ref = useRef(null);

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {x: 0, width: 0};

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{width}}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-primary/10",
        className,
      )}
      {...props}>
      <Link target="_blank" href={`${link}`}>
        {children}
      </Link>
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export {Dock, DockIcon, dockVariants};
