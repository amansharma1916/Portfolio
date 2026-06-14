import { useEffect, useState } from "react";
import "./IntroJourney.css";

const milestones = [
  "Establishing signal",
  "Mapping the work",
  "Entering the portfolio",
];

const stars = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  x: (index * 37 + 9) % 100,
  y: (index * 53 + 17) % 100,
  delay: (index % 9) * 0.18,
  size: 1 + (index % 3),
}));

const IntroJourney = ({ onComplete }) => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const milestoneTimers = [
      window.setTimeout(() => setActiveMilestone(1), 1500),
      window.setTimeout(() => setActiveMilestone(2), 3100),
      window.setTimeout(() => setIsLeaving(true), 4400),
      window.setTimeout(onComplete, 5000),
    ];

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      milestoneTimers.forEach(window.clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div
      className={`intro-journey ${isLeaving ? "intro-journey--leaving" : ""}`}
      role="status"
      aria-label="Preparing Aman Sharma's portfolio"
    >
      <div className="intro-journey__stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            style={{
              "--star-x": `${star.x}%`,
              "--star-y": `${star.y}%`,
              "--star-delay": `${star.delay}s`,
              "--star-size": `${star.size}px`,
            }}
          />
        ))}
      </div>

      <div className="intro-journey__grid" aria-hidden="true" />
      <div className="intro-journey__portal" aria-hidden="true">
        <span className="intro-journey__orbit intro-journey__orbit--one" />
        <span className="intro-journey__orbit intro-journey__orbit--two" />
        <span className="intro-journey__orbit intro-journey__orbit--three" />
        <span className="intro-journey__core">AS</span>
      </div>

      <div className="intro-journey__topline">
        <span>AMAN.SPACE</span>
        <span className="intro-journey__coordinates">28.6139° N / 77.2090° E</span>
      </div>

      <main className="intro-journey__content">
        <p className="intro-journey__eyebrow">
          <span />
          Transmission received
        </p>
        <h1>
          Follow the signal.
          <strong>Something is taking shape.</strong>
        </h1>
      </main>

      <div className="intro-journey__route" aria-hidden="true">
        <span className="intro-journey__route-line" />
        <span className="intro-journey__traveller" />
        {milestones.map((milestone, index) => (
          <span
            key={milestone}
            className={`intro-journey__route-node ${
              index <= activeMilestone ? "is-active" : ""
            }`}
            style={{ "--node-index": index }}
          />
        ))}
      </div>

      <div className="intro-journey__footer">
        <div className="intro-journey__milestones">
          {milestones.map((milestone, index) => (
            <p key={milestone} className={index === activeMilestone ? "is-active" : ""}>
              <span>0{index + 1}</span>
              {milestone}
            </p>
          ))}
        </div>

        <div className="intro-journey__progress">
          <span>Journey in progress</span>
          <div><i /></div>
          <strong>05 SEC</strong>
        </div>
      </div>

      <div className="intro-journey__reveal" aria-hidden="true" />
    </div>
  );
};

export default IntroJourney;
