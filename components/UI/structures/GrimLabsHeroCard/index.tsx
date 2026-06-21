import Image from 'next/image';
import { RealmEvent } from 'types';

interface Props {
  event: RealmEvent;
  onSelect: (id: string, isEvent?: boolean) => void;
}

// Default "JOIN AN EVENT" hero card shown when no real bounce-gate events exist.
// GrimLabs-branded, styled to match the gotchicloset neon palette
// (spectral #b847ff, cyan #47ffea, ecto #47ff7a) around the reaper logo.
export const GrimLabsHeroCard = ({ event, onSelect }: Props): JSX.Element => {
  return (
    <>
      <div className="grimlabs-card clickable" onClick={() => onSelect(event.id, true)}>
        <div className="aura" />
        <div className="logo-wrap">
          <Image alt="GrimLabs" src={event.image || '/grimlabs-reaper.png'} width={132} height={150} objectFit="contain" />
        </div>
        <div className="content">
          <span className="brand">GRIMLABS</span>
          <h3 className="title">{event.title}</h3>
          <p className="subtitle">Lab lights are on. Grim brewed the realm back to life.</p>
          <div className="meta">
            <span className="dot" />
            Live now <span className="sep">·</span> Free entry
          </div>
          <div className="cta">
            JOIN THE CITAADEL <span className="arrow">›</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .grimlabs-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2.4rem 2.8rem;
          border-radius: 1.6rem;
          overflow: hidden;
          background: radial-gradient(ellipse 70% 80% at 15% 20%, hsl(275 100% 64% / 0.16), transparent 60%),
            radial-gradient(ellipse 70% 80% at 90% 95%, hsl(175 100% 56% / 0.14), transparent 60%),
            linear-gradient(160deg, #1b1430 0%, #120d1f 100%);
          border: 1px solid hsl(275 100% 64% / 0.35);
          box-shadow: 0 0 24px hsl(275 100% 64% / 0.28), inset 0 0 40px hsl(175 100% 56% / 0.05);
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .grimlabs-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 38px hsl(275 100% 64% / 0.45), inset 0 0 50px hsl(175 100% 56% / 0.08);
        }
        .aura {
          position: absolute;
          left: 2%;
          top: 50%;
          width: 15rem;
          height: 15rem;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(175 100% 56% / 0.35), transparent 65%);
          filter: blur(8px);
          transform: translateY(-50%);
          animation: grim-glow 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes grim-glow {
          0%,
          100% {
            opacity: 0.5;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-50%) scale(1.08);
          }
        }
        .logo-wrap {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          line-height: 0;
          filter: drop-shadow(0 0 14px hsl(175 100% 56% / 0.45));
        }
        .content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .brand {
          font-size: 1.3rem;
          letter-spacing: 0.35em;
          color: hsl(175 100% 72%);
          text-transform: uppercase;
        }
        .title {
          font-size: 3rem;
          line-height: 1.05;
          color: #fff;
          text-shadow: 0 0 18px hsl(326 100% 64% / 0.5);
        }
        .cta {
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          align-self: flex-start;
          padding: 0.9rem 1.8rem;
          border-radius: 999px;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #120d1f;
          background: linear-gradient(120deg, hsl(175 100% 56%), hsl(132 100% 64%));
          box-shadow: 0 0 18px hsl(175 100% 56% / 0.5);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .grimlabs-card:hover .cta {
          box-shadow: 0 0 28px hsl(175 100% 56% / 0.8);
          transform: translateX(2px);
        }
        .arrow {
          font-size: 2rem;
          line-height: 1;
        }
        .subtitle {
          margin-top: 0.2rem;
          max-width: 34rem;
          font-size: 1.5rem;
          line-height: 1.4;
          color: hsl(0 0% 100% / 0.72);
        }
        .meta {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          gap: 0.7rem;
          margin-top: 0.6rem;
          font-size: 1.2rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(132 100% 72%);
        }
        .meta .dot {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          background: hsl(132 100% 60%);
          box-shadow: 0 0 8px hsl(132 100% 60%);
          animation: grim-pulse 1.6s ease-in-out infinite;
        }
        .meta .sep {
          opacity: 0.5;
        }
        @keyframes grim-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(0.8);
          }
        }
        @media screen and (max-width: 600px) {
          .grimlabs-card {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }
          .title {
            font-size: 2.4rem;
          }
        }
      `}</style>
    </>
  );
};
