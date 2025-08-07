import workList from "../../data/workList";
import React, { useEffect, useRef } from "react";
import "./Home.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import Transition from "../../components/Transition/Transition";

import { useState } from "react";

const Home = () => {
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  // Close modal on ESC
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setFullscreenPhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const workItems = Array.isArray(workList) ? workList : [];
  const stickyTitlesRef = useRef(null);
  const titlesRef = useRef([]);
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const stickySection = stickyTitlesRef.current;
    const titles = titlesRef.current.filter(Boolean);

    if (!stickySection || titles.length !== 3) {
      window.removeEventListener("resize", handleResize);
      return;
    }

    gsap.set(titles[0], { opacity: 1, scale: 1 });
    gsap.set(titles[1], { opacity: 0, scale: 0.75 });
    gsap.set(titles[2], { opacity: 0, scale: 0.75 });

    const pinTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
    });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        scrub: 0.5,
      },
    });

    masterTimeline
      .to(
        titles[0],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        1
      )

      .to(
        titles[1],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        1.25
      );

    masterTimeline
      .to(
        titles[1],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        2.5
      )

      .to(
        titles[2],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        2.75
      );

    const workHeaderSection = stickyWorkHeaderRef.current;
    const homeWorkSection = homeWorkRef.current;

    let workHeaderPinTrigger;
    if (workHeaderSection && homeWorkSection) {
      workHeaderPinTrigger = ScrollTrigger.create({
        trigger: workHeaderSection,
        start: "top top",
        endTrigger: homeWorkSection,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    }

    return () => {
      pinTrigger.kill();
      if (workHeaderPinTrigger) {
        workHeaderPinTrigger.kill();
      }
      if (masterTimeline.scrollTrigger) {
        masterTimeline.scrollTrigger.kill();
      }
      masterTimeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero">
          <div className="hero-img">
            <video src="/home/hero.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div className="hero-header">
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.7}>
              Prajwal
            </AnimatedCopy>
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.8}>
              N
            </AnimatedCopy>
          </div>

        </section>

        {/* About Info Section */}
        <section className="about-info-box">
          <div className="about-info-line"><strong>Name:</strong> Prajwal N</div>
          <div className="about-info-line"><strong>Height:</strong> 5'9 feet</div>
          <div className="about-info-line"><strong>Weight:</strong> 72 kg</div>
          <div className="about-info-line"><strong>Sex:</strong> Male</div>
          <div className="about-info-line"><strong>Location:</strong> Bengaluru</div>
          <div className="about-info-line"><strong>Contact:</strong> 8431105425</div>
        </section>

        {/* Photos Section */}
        <section className="home-photos">
          <h2 className="primary">Photos</h2>
          <div className="home-photos-gallery">
            <img src="/about/button.jpg" alt="Button" onClick={() => setFullscreenPhoto('/about/button.jpg')} />
            <img src="/about/car.jpg" alt="Car" onClick={() => setFullscreenPhoto('/about/car.jpg')} />
            <img src="/about/good.jpg" alt="Good" onClick={() => setFullscreenPhoto('/about/good.jpg')} />
            <img src="/about/look.jpg" alt="Look" onClick={() => setFullscreenPhoto('/about/look.jpg')} />
            <img src="/about/ethnic.jpg" alt="Ethnic" onClick={() => setFullscreenPhoto('/about/ethnic.jpg')} />
          </div>
          {/* Fullscreen Photo Modal */}
          {fullscreenPhoto && (
            <div className="photo-modal" onClick={() => setFullscreenPhoto(null)}>
              <img src={fullscreenPhoto} alt="Fullscreen" className="photo-modal-img" onClick={e => e.stopPropagation()} />
              <button className="photo-modal-close" onClick={() => setFullscreenPhoto(null)}>&times;</button>
            </div>
          )}
        </section>

        {/* Introduction Section */}
        <section className="home-intro">
          <h2 className="primary">Introduction</h2>
          <div className="home-intro-content">
            <div className="home-intro-video-wrapper">
              <video src="/about/introduction.mp4" controls poster="/about/about-hero.jpg" style={{ width: '100%', borderRadius: '1em', border: '1px dashed var(--fg)' }} />
            </div>
            <div className="home-intro-text">
              <p>I'm Prajwal N — an aspiring actor passionate about storytelling and the performing arts. Every project is a new collaboration, a new challenge, and a new chance to create something meaningful.</p>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="home-experience">
          <h2 className="primary">Work Experience</h2>

          {/* Work 1 */}
          <div className="work-detail">
            <h3>Work 1: Kaad Rekhai</h3>
            <img src="/about/work 1.jpg" alt="Work 1 - Kaad Rekhai" className="work-img" />
            <ul className="work-points">
              <li>I played the lead role in a tribal play titled <strong>Kaad Rekhai</strong>, which centers around the issue of tribal communities denying their children access to education.</li>
              <li>Performed in <strong>three shows</strong> of Kaad Rekhai.</li>
              <li>Portray a powerful character named <strong>Sadashivaraya</strong> in the historical play <strong>Rakshasa Tangadi</strong>.</li>
              <li>Experience in production and a basic understanding of stage lighting.</li>
              <li>Actively involved in street theatre, performing as <strong>Major Prakash</strong> in a street play that has completed <strong>ten shows</strong>.</li>
            </ul>
          </div>

          {/* Work 2 */}
          <div className="work-detail">
            <h3>Work 2: Rakshasa Tangadi</h3>
            <img src="/about/work 2.jpg" alt="Work 2 - Rakshasa Tangadi" className="work-img" />
            <ul className="work-points">
              <li><strong>Rakshasa Tangadi</strong> is a large-scale historical play written by Girish Karnad and directed by Gagan Prasad.</li>
              <li>I have the privilege of playing the role of <strong>Sadashivaraya</strong> in this magnum opus.</li>
              <li>Being part of this production has given me the opportunity to deeply explore the rich history of Hampi and gain a profound understanding of each character in the play.</li>
              <li>It has been a valuable learning experience as an actor.</li>
            </ul>
          </div>

        </section>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);
