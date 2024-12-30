import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // updated to react-router-dom
import Footer from "../../components/Footer/Footer";
import Transition from "../../components/transition/Transition";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import "./Home.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";

const Home = () => {
  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".mix-tape",
      start: "top bottom",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(".strip", {
          x: self.progress * 300,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page home">
        
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-img">
            <img src="/freepik-1.jpg" alt="Hero background" />
          </div>

          <div className="hero-header">
            <h1>Flawless Design</h1>
            <p>Crafting digital solutions for powerful brands.</p>
            <div className="stickers">
              <img src="/transparent-images/m1-fotor.png" alt="Sticker" />
            </div>
            <button>
              <Link to="/contact">Get in touch</Link>
            </button>
          </div>

          <div className="news-article">
            <div className="news-article-title">
              <p className="primary">
                AI Disputes Ignite: Harmony <br /> or Discord Ahead?
              </p>
            </div>
            <div className="news-article-info">
              <p>7.1.2024</p>
              <p>News</p>
            </div>
          </div>
        </section>

        {/* Site Intro Section */}
        <section className="site-intro">
          <div className="intro-col">
            <p className="primary">Empowering Brands. Redefining Digital.</p>
            <p>Weberu is reshaping digital landscapes with innovative strategies.</p>

            {/* <MusicPlayer /> */}
            <div className="intro-img">
              <div className="intro-img-wrapper-1">
                <ParallaxImage src="/branded-images/Dreads.jpg" alt="Site Intro Image 1" />
              </div>
              <p>At Weberu, we're not just crafting websites; we're sculpting digital experiences. Unleash the power of cutting-edge technology with our bespoke solutions that redefine online presence.</p>
            </div>
            
          </div>
          <div className="intro-col">
            <p>At Weberu, we know that a strong digital presence is key to building a successful brand. We don’t just design websites; we craft experiences that connect with your audience, driving results.</p>
            <h2>A New Gold Tech</h2>
            <h3>Innovation thrives, but brands need more.</h3>
            <p>
              Whether it's web design, digital advertising, or social media management, we focus on delivering digital solutions that drive real business results. Our team is here to turn your digital vision into a powerful online presence.
            </p>
            <div className="intro-img">
              <div className="intro-img-wrapper-2">
                <ParallaxImage src="/home/site-intro.jpg" alt="Site Intro Image 2" />
              </div>
            </div>
          </div>
        </section>

        {/* Cover Section */}
        <section className="cover">
          <div className="cover-img">
            <ParallaxImage src="/home/cover.jpg" alt="Cover Image" />
          </div>

          <div className="cover-copy">
            <h3>Driven By Creative Innovation</h3>
            <h2>Building Stronger Brands Online</h2>
            <p>
              At Weberu, we are passionate about blending creativity with cutting-edge technology to deliver unique digital marketing and branding solutions. From crafting custom websites to running high-impact social media campaigns, we ensure that your brand is positioned for success.
            </p>
            <br />
            <br />
            <p>
              Every business has a story, and we’re here to help you tell yours through strategic digital solutions. Whether you're looking to revamp your website, launch a marketing campaign, or enhance your social media presence, Weberu provides innovative services that allow you to connect with your audience in meaningful ways.
            </p>

            <div className="cover-cta">
              <button>
                <Link to="/services">Our Services</Link>
              </button>
            </div>
          </div>
        </section>

        {/* Mix-Tape Section */}
        <section className="mix-tape">
          <p className="primary">Building Digital Excellence</p>
          <p>From Concept to Completion</p>

          <h1>From Vision to Success</h1>

          <div className="tape">
            <div className="strip">
              <img src="/home/strip.png" alt="Tape Strip" />
            </div>
            <div className="tape-img">
              <img src="/home/tape.png" alt="Tape Image" />
            </div>
          </div>

          <div className="tape-info">
            <p>
              Your digital presence is more than just a website; it’s an experience. Our team ensures that every aspect of your online presence is seamless and impactful, turning your ideas into reality.
            </p>
            <br />
            <br />
            <p>
              At Weberu, we collaborate with businesses like yours to design and implement digital strategies that make an impact. From the first consultation to the final product launch, we are there every step of the way.
            </p>

            <div className="sticker">
              <img src="/stickers-dark.png" alt="Sticker" />
            </div>
          </div>
        </section>

        {/* Latest Updates Section */}
        <section className="latest-updates">
          <h1>Latest Updates</h1>
          <p className="lp-tagline">
            Stay ahead with the latest trends, strategies, and insights in digital marketing and creative solutions.
          </p>

          <div className="updates-page-link">
            <Link to="/updates">View All Updates</Link>
          </div>

          <div className="articles-row">
            <div className="article">
              <div className="article-img">
                <ParallaxImage src="/updates/article1.jpg" alt="Article 1" speed={0.1} />
              </div>
              <div className="article-title">
                <h3>The Future of Digital Branding: Trends to Watch in 2024</h3>
              </div>
              <div className="article-link">
                <p className="primary">
                  <Link to="/updates/article1">Read More</Link>
                </p>
              </div>
            </div>

            <div className="article">
              <div className="article-img">
                <ParallaxImage src="/updates/article2.jpg" alt="Article 2" speed={0.1} />
              </div>
              <div className="article-title">
                <h3>Building Engaging Websites: Best Practices for 2024</h3>
              </div>
              <div className="article-link">
                <p className="primary">
                  <Link to="/updates/article2">Read More</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);
