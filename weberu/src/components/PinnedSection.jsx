import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { data } from "../data.js";

// Import images
import img1 from "../assets/pinned-section/img1.jpg";
import img2 from "../assets/pinned-section/img2.jpg";
import img3 from "../assets/pinned-section/img3.jpg";
import img4 from "../assets/pinned-section/img4.jpg";
import img5 from "../assets/pinned-section/img5.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [img1, img2, img3, img4, img5]; // Store all imported images

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

    // Pre-load first section content and image
    updateInfoContent(0);
    gsap.set(imagesRef.current[0], { opacity: 1, scale: 1 });

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
            ease: "power2.out",
          });

          gsap.to(imagesRef.current[currentCycle], {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          });

          updateInfoContent(currentCycle);
          lastCycleRef.current = currentCycle;
        }

        gsap.to(progressBarRef.current, {
          height: `${cycleProgress}%`,
        });
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="pinned relative h-screen w-full bg-black text-white">
      {/* Info Section */}
      <div className="info absolute top-1/2 -translate-y-1/2 w-full flex px-4 space-x-4">
        <div className="flex-1">
          <p id="title" className="text-lg font-semibold"></p>
        </div>
        <div className="flex-1">
          <p id="tagline" className="text-sm italic text-gray-400"></p>
        </div>
        <div className="flex-1">
          <p id="year" className="text-base font-medium"></p>
        </div>
        <div className="flex-1">
          <p id="tag" className="text-sm uppercase tracking-wider"></p>
        </div>
        <div className="flex justify-end">
          <a
            id="link"
            className="border border-white/25 px-3 py-2 rounded hover:bg-white/10 transition-colors"
            href="#"
          >
            Explore
          </a>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="progress-bar absolute top-1/2 left-[75%] -translate-x-1/2 w-[2px] h-0 bg-gray-500"
      />

      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => (imagesRef.current[index] = el)}
          className="img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-125 transition-all duration-700"
        >
          <img
            src={image}
            alt={`Visual ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PinnedSection;
