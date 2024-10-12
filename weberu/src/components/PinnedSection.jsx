import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { data } from "../data";

gsap.registerPlugin(ScrollTrigger);

const PinnedSection = () => {
  const progressBarRef = useRef(null);
  const imagesRef = useRef([]);
  const lastCycleRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    const pinnedHeight = window.innerHeight * 10;

    function updateInfoContent(index) {
      const { title, tagline, year, tag, link } = data[index];
      document.getElementById("title").textContent = title;
      document.getElementById("tagline").textContent = tagline;
      document.getElementById("year").textContent = year;
      document.getElementById("tag").textContent = tag;
      document.getElementById("link").href = link;
    }

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      end: `+=${pinnedHeight * 2}`,
      pin: true,
      scrub: 0.1,
      onUpdate: (self) => {
        const totalProgress = self.progress * 5;
        const currentCycle = Math.floor(totalProgress);
        const cycleProgress = (totalProgress % 1) * 100;

        if (currentCycle !== lastCycleRef.current) {
          gsap.to(imagesRef.current[lastCycleRef.current], {
            opacity: 0,
            scale: 0.5,
            duration: 1,
          });

          gsap.to(imagesRef.current[currentCycle], {
            opacity: 1,
            scale: 1,
            duration: 1,
          });

          updateInfoContent(currentCycle);
          lastCycleRef.current = currentCycle;
        }

        gsap.to(progressBarRef.current, {
          height: `${cycleProgress}%`,
        });
      },
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div className="pinned relative h-screen w-full bg-black text-white">
      <div className="info absolute top-1/2 transform -translate-y-1/2 w-full flex px-4">
        <div className="flex-1">
          <p id="title"></p>
        </div>
        <div className="flex-1">
          <p id="tagline"></p>
        </div>
        <div className="flex-1">
          <p id="year"></p>
        </div>
        <div className="flex-1">
          <p id="tag"></p>
        </div>
        <div className="flex justify-end">
          <a id="link" className="border border-white p-2 rounded" href="#">
            Explore
          </a>
        </div>
      </div>
      <div
        ref={progressBarRef}
        className="progress-bar absolute top-1/2 left-[75%] transform -translate-x-1/2 w-[2px] h-0 bg-gray-500"
      />
      {data.map((_, index) => (
        <div
          key={index}
          ref={(el) => (imagesRef.current[index] = el)}
          className={`img absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-125 transition-all`}
        >
          <img src={`/assets/img${index + 1}.jpg`} alt="" />
        </div>
      ))}
    </div>
  );
};

export default PinnedSection;
