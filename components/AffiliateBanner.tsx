'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ExternalLink, Zap, ArrowRight } from 'lucide-react';

/**
 * Professional Affiliate Banner — Marketing Psychology Implementation
 * 
 * Techniques used:
 * 1. ANCHORING — Show original price crossed out + discounted price
 * 2. SOCIAL PROOF — "Trusted by X+ developers" / "Join X+ builders"
 * 3. SCARCITY/URGENCY — "Limited time" / "Exclusive deal"
 * 4. RECIPROCITY — "Get 20% OFF via our link"
 * 5. NATIVE DESIGN — Blends with dashboard aesthetic (not an ad)
 * 6. PROGRESSIVE DISCLOSURE — Minimal at first, more info on hover
 * 7. ROTATION — Varies messaging to avoid banner blindness
 */

interface AffiliateOffer {
  tag: string;
  headline: string;
  discount: string;
  subtext: string;
  socialProof: string;
  url: string;
  category: string;
}

const OFFERS: AffiliateOffer[] = [
  {
    tag: '⚡ Exclusive Deal',
    headline: 'Premium Web Hosting',
    discount: '20% OFF',
    subtext: 'SSD servers • Free SSL • Free domain',
    socialProof: 'Trusted by 2M+ websites',
    url: 'https://www.hostinger.com/cart?product=hosting%3Ahostinger_premium&period=48&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc070-1d96-709b-b099-a7e5790c8885',
    category: 'Hosting',
  },
  {
    tag: '🚀 Most Popular',
    headline: 'Business Web Hosting',
    discount: '20% OFF',
    subtext: 'Daily backups • 200 GB SSD • Free CDN',
    socialProof: 'Top choice for startups',
    url: 'https://www.hostinger.com/cart?product=hosting%3Ahostinger_business&period=48&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc071-c963-70e5-b3ee-4c63e1779f2b',
    category: 'Hosting',
  },
  {
    tag: '☁️ Scale Ready',
    headline: 'Cloud Startup Hosting',
    discount: '20% OFF',
    subtext: 'Auto-scaling • 99.9% uptime • Global CDN',
    socialProof: 'Built for growing apps',
    url: 'https://www.hostinger.com/cart?product=hosting%3Acloud_economy&period=48&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc072-ec71-7075-9084-e44652617e3d',
    category: 'Cloud',
  },
  {
    tag: '💎 Pro Grade',
    headline: 'Cloud Professional',
    discount: '20% OFF',
    subtext: 'Dedicated resources • Priority support',
    socialProof: 'Enterprise-level reliability',
    url: 'https://www.hostinger.com/cart?product=hosting%3Acloud_professional&period=48&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc074-1c9f-73e7-95ff-d7e16dc51978',
    category: 'Cloud',
  },
  {
    tag: '🏢 Enterprise',
    headline: 'Cloud Enterprise',
    discount: '20% OFF',
    subtext: 'Max performance • Unlimited bandwidth',
    socialProof: 'For mission-critical apps',
    url: 'https://www.hostinger.com/cart?product=hosting%3Acloud_enterprise&period=12&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc074-f7f0-73a2-965d-81611afc19e4',
    category: 'Cloud',
  },
  {
    tag: '🎯 Start Building',
    headline: 'Horizons Explorer',
    discount: '20% OFF',
    subtext: '30 AI credits/mo • Hosting included free',
    socialProof: 'Perfect for side projects',
    url: 'https://www.hostinger.com/cart?product=horizons%3Aexplorerv2&period=12&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc076-7058-7175-a8c6-fd7925a302b1',
    category: 'Horizons',
  },
  {
    tag: '⭐ Best Value',
    headline: 'Horizons Starter',
    discount: '20% OFF',
    subtext: '70 AI credits/mo • Vibe code your apps',
    socialProof: 'Most popular AI plan',
    url: 'https://www.hostinger.com/cart?product=horizons%3Astarterv2&period=12&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc076-d0c4-717b-9350-6aebebffa8c8',
    category: 'Horizons',
  },
  {
    tag: '🔥 Power User',
    headline: 'Horizons Hustler',
    discount: '20% OFF',
    subtext: '400 AI credits • Full platform access',
    socialProof: 'For serious builders',
    url: 'https://www.hostinger.com/cart?product=horizons%3Ahustlerv2&period=12&referral_type=cart_link&REFERRALCODE=nuurax&referral_id=019dc077-a1a9-7056-aa53-af63f7392ed4',
    category: 'Horizons',
  },
];

export default function AffiliateBanner() {
  const [index, setIndex]     = useState(0);
  const [fade, setFade]       = useState(true);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Start with random offer
  useEffect(() => {
    setIndex(Math.floor(Math.random() * OFFERS.length));
  }, []);

  // Rotate every 30 seconds (pause on hover — marketing best practice)
  useEffect(() => {
    if (hovered) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % OFFERS.length);
        setFade(true);
      }, 400);
    }, 30_000);
    return () => clearInterval(timer);
  }, [hovered]);

  const handleClick = useCallback(() => {
    window.open(OFFERS[index].url, '_blank', 'noopener,noreferrer');
  }, [index]);

  if (!mounted) return null;

  const offer = OFFERS[index];

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '18px 20px',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        position: 'relative',
        overflow: 'hidden',
        background: hovered ? 'rgba(103,61,230,0.06)' : 'transparent',
      }}
    >
      {/* Subtle gradient accent on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: hovered
          ? 'linear-gradient(90deg, #673de6, #1A1FFF, #00C2CB)'
          : 'transparent',
        transition: 'all 0.4s ease',
      }} />

      {/* Content with fade transition */}
      <div style={{
        opacity: fade ? 1 : 0,
        transform: fade ? 'translateY(0)' : 'translateY(4px)',
        transition: 'all 0.4s ease',
        flex: 1,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
      }}>
        {/* Tag + Discount Badge row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 10,
            fontFamily: "'DM Mono', monospace",
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.03em',
          }}>
            {offer.tag}
          </span>

          {/* Discount badge — key marketing element */}
          <span style={{
            padding: '2px 8px',
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            background: 'rgba(103,61,230,0.15)',
            color: '#a78bfa',
            border: '1px solid rgba(103,61,230,0.2)',
            letterSpacing: '0.02em',
          }}>
            {offer.discount}
          </span>
        </div>

        {/* Product name */}
        <p style={{
          fontSize: 15,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          color: 'rgba(255,255,255,0.8)',
          lineHeight: '130%',
          margin: 0,
          transition: 'color 0.2s',
          ...(hovered ? { color: '#fff' } : {}),
        }}>
          {offer.headline}
        </p>

        {/* Features */}
        <p style={{
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
          color: 'rgba(255,255,255,0.3)',
          lineHeight: '140%',
          margin: 0,
        }}>
          {offer.subtext}
        </p>

        {/* Social proof — subtle trust builder */}
        <p style={{
          fontSize: 10,
          fontFamily: "'DM Mono', monospace",
          color: 'rgba(103,61,230,0.45)',
          margin: 0,
          marginTop: 2,
        }}>
          {offer.socialProof}
        </p>
      </div>

      {/* Bottom row: logo + CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 10,
        opacity: fade ? 1 : 0,
        transition: 'all 0.4s ease',
      }}>
        {/* Hostinger logo — muted, builds brand awareness subconsciously */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <img
            src="/hostinger-logo.png"
            alt=""
            style={{
              height: 13,
              opacity: hovered ? 0.5 : 0.2,
              filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
              transition: 'all 0.3s',
            }}
          />
        </div>

        {/* CTA — upgrades on hover */}
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          color: hovered ? '#a78bfa' : 'rgba(103,61,230,0.4)',
          transition: 'all 0.2s',
        }}>
          {hovered ? (
            <>Claim 20% OFF <ArrowRight size={11} /></>
          ) : (
            <>Learn more <ExternalLink size={9} /></>
          )}
        </span>
      </div>

      {/* Progress dots — shows there are more offers (creates curiosity) */}
      <div style={{
        display: 'flex', gap: 4, justifyContent: 'center',
        marginTop: 8,
      }}>
        {OFFERS.map((_, i) => (
          <div key={i} style={{
            width: i === index ? 12 : 4,
            height: 4,
            borderRadius: 2,
            background: i === index ? 'rgba(103,61,230,0.4)' : 'rgba(255,255,255,0.06)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}
