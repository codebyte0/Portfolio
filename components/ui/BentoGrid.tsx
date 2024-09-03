"use client"
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./BgGradient";
import { GlobeDemo } from "./GridGlobe";
import Lottie from "react-lottie";
import animationData from "@/data/confetti.json"
import MagicButton from "./MagicButton";
import { FaSubscript } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const updateTheme = () => {
      const mode = localStorage.getItem("theme") || "system";
      setDark(mode === "dark");
    };
    updateTheme();
    window.addEventListener("themeChange", updateTheme);
    return () => {
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  spareImg,
  titleClassName,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  spareImg?: string;
  titleClassName?: string;
}) => {
  const [copied, setcopied] = useState(false)
  const handlecopy = () => {
    navigator.clipboard.writeText("codebyte.wd@gmail.com")
    setcopied(true)
  }
  return (
    <div
      className={cn(
        " dark:bg-[rgb(4,7,29)] dark:bg-gradient-to-r dark:from-[rgba(4,7,29,1)] dark:to-[rgba(12,14,35,1)] row-span-1 rounded-3xl relative group/bento  transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 overflow-hidden border border-white/[0.2] dark:bg-dot-indigo !text-white z-0 !shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gradient-to-r from-[#8489d1] to-[#b58be9] ",
        className
      )}
    >
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute ">
          {img && (
            <Image
              width={100} 
              height={100}
              layout="responsive"
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center opacity-85 text-violet-800")}
            />
          )}
        </div>


        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full dark:opacity-80"
            } `}
        >
          <div className="w-full h-full absolute z-10">

            {spareImg && (
              <Image
                width={100}
                height={100}
                layout="responsive"
                src={spareImg}
                alt={spareImg}
                className="w-full h-full"
              />
            )}
          </div>
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
          </BackgroundGradientAnimation>
        )}
        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}  >
            {title}
          </div>
          {/* for the github 3d globe */}
          {id === 2 &&
            <GlobeDemo />
          }

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-8 ">
                {['React.js', 'Next.js', 'Typescript'].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opcaity-100 rounded-lg ">
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
              </div>
              <div className="flex flex-col gap-3 lg:gap-8 ">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
                {['Express.js', 'Node.js', 'Mongodb'].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opcaity-100 rounded-lg ">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative w-full justify-center min-w-11">
              <div className={`absolute -bottom-5 right-0`}>
                <Lottie options={{
                  loop: copied,
                  autoplay: copied,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                  }
                }} />
              </div>

              <MagicButton
                title={copied ? "Email copied" : "Copy my email"}
                icon={<FaSubscript />}
                position="left"
                otherClasses="!bg-[#161a31] w-[14.8rem]"
                handleClick={handlecopy}
              />
            </div>
          )}
        </div>
      </div>
    </div >
  );
};
