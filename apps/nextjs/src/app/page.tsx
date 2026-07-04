"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { AnimatedSection, CountUp, StaggerContainer, StaggerItem } from "./_components/animations";
import { AnnotatedRecord } from "./_components/annotated-record";
import { HeroExperience } from "./_components/hero-experience";
import { AppleIcon, GithubIcon } from "./_components/icons";
import { useIntroDone } from "./_components/intro-context";
import { WaitlistForm } from "./_components/waitlist-form";

const platforms = [
  {
    Icon: AppleIcon,
    name: "iOS",
    status: "Coming soon",
  },
  {
    Icon: GithubIcon,
    name: "GitHub",
    status: "Open source",
  },
];

const sourceSystems = [
  {
    type: "BILL",
    color: "#4A7CFF",
    title: "Bills",
    signal: "Status, sponsors, amendments",
    source: "Congress.gov",
    count: 4392,
  },
  {
    type: "ORDER",
    color: "#6366F1",
    title: "Orders",
    signal: "Authority, agencies, challenges",
    source: "White House",
  },
  {
    type: "CASE",
    color: "#0891B2",
    title: "Cases",
    signal: "Filings, rulings, timelines",
    source: "Federal courts",
  },
];

function Badge({ type, color }: { type: string; color: string }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-[6px] px-[10px] text-[11px] font-medium text-white uppercase"
      style={{ backgroundColor: color, letterSpacing: "0.08em" }}
    >
      {type}
    </span>
  );
}

function Divider() {
  return <hr className="divider-hairline" />;
}

function SourceSystemsList() {
  return (
    <StaggerContainer
      staggerDelay={0.08}
      className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.03]"
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
        <span className="font-sans text-[12px] font-semibold tracking-[0.1em] text-white/72 uppercase">
          Source map
        </span>
        <span className="font-sans text-[12px] font-semibold tracking-[0.08em] text-white/45 uppercase">
          Official records
        </span>
      </div>
      {sourceSystems.map((system) => (
        <StaggerItem
          key={system.type}
          variant="fadeUp"
          className="group grid gap-4 border-b border-white/[0.07] px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.035] sm:grid-cols-[88px_1fr_auto] sm:items-center"
        >
          <Badge type={system.type} color={system.color} />
          <div>
            <h3 className="text-foreground font-editorial m-0 text-[1.25rem] leading-[1.15] font-bold">
              {system.title}
            </h3>
            <p className="text-muted-foreground mt-1 mb-0 font-sans text-[14px] leading-[1.45]">
              {typeof system.count === "number" ? (
                <>
                  <span className="text-white/72">
                    <CountUp to={system.count} duration={2} /> tracked
                  </span>
                  {" · "}
                </>
              ) : null}
              {system.signal}
            </p>
          </div>
          <p
            className="m-0 flex items-center gap-2 font-sans text-[12px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase"
            style={{ color: system.color, opacity: 0.92 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: system.color }}
            />
            {system.source}
          </p>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const introDone = useIntroDone();

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* ── NAV ──────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto flex items-center justify-between px-6 py-5"
        style={{ maxWidth: 1120 }}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/billion-logo.png"
            alt="Billion"
            width={32}
            height={32}
            className="h-8 w-8 rounded-2xl"
            priority
          />
          <span className="text-foreground font-display text-[22px] font-bold tracking-[-0.02em]">
            Billion
          </span>
        </div>
        <Link
          href="#waitlist"
          className="text-muted-foreground hover:text-accent font-sans text-[15px] font-medium no-underline transition-colors duration-200"
        >
          Get Early Access
        </Link>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="mx-auto grid grid-cols-1 gap-10 px-6 pt-12 pb-[4.5rem] md:pt-14 md:pb-20 lg:grid-cols-[minmax(0,0.72fr)_minmax(440px,1.28fr)] lg:items-center"
        style={{ maxWidth: 1180 }}
      >
        {/* Left — text */}
        <StaggerContainer
          staggerDelay={0.09}
          className="mx-auto max-w-[580px] text-center lg:mx-0 lg:text-left"
        >
          <StaggerItem
            variant="fadeUp"
            className="tracking-label text-muted-foreground mb-[14px] font-sans text-[12px] font-medium uppercase"
          >
            The Civic Intelligence App
          </StaggerItem>
          <StaggerItem variant="fadeUp">
            <h1
              className="text-foreground font-display mb-6 leading-[1.15] font-bold tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
            >
              Know what government just did.
            </h1>
          </StaggerItem>
          <StaggerItem variant="fadeUp">
            <p
              className="text-muted-foreground mx-auto mb-7 font-sans text-[18px] leading-[1.6] lg:mx-0"
              style={{ maxWidth: "40ch" }}
            >
              Bills, executive orders, and court rulings — turned into short
              briefs, every one linked back to the source.
            </p>
          </StaggerItem>
          <StaggerItem variant="fadeUp" className="flex flex-col gap-4">
            <WaitlistForm />
            <Link
              href="#record"
              className="text-muted-foreground hover:text-accent inline-flex h-[52px] items-center justify-center px-1 font-sans text-[16px] font-medium no-underline transition-colors duration-200"
            >
              See a bill become a brief
            </Link>
          </StaggerItem>
        </StaggerContainer>

        <HeroExperience />
      </section>

      <AnnotatedRecord id="record" />

      {/* ── APPROACH ──────────────────────────────────────────────── */}
      <section
        id="approach"
        className="mx-auto grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-[0.82fr_1.18fr] md:items-center md:gap-16 md:py-14"
        style={{ maxWidth: 1120 }}
      >
        <AnimatedSection variant="slideInLeft">
          <h2
            className="text-foreground font-display m-0 leading-[1.18] font-normal tracking-[-0.01em]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
          >
            <span className="block md:whitespace-nowrap">
              Every source, one feed.
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 mb-0 max-w-[32ch] font-sans text-[16px] leading-[1.6]">
            Billion watches the official record, then turns changes into
            source-linked signals the moment they happen.
          </p>
        </AnimatedSection>
        <AnimatedSection variant="slideInRight">
          <SourceSystemsList />
        </AnimatedSection>
      </section>

      <Divider />

      {/* ── BRADBURY ──────────────────────────────────────────────── */}
      <AnimatedSection
        variant="settle"
        className="mx-auto px-6 py-14 text-center md:py-[4.5rem]"
        style={{ maxWidth: 1120 }}
      >
        <h2
          className="text-foreground font-display mx-auto mb-5 max-w-[18ch] leading-[1.2] font-normal tracking-[-0.01em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Everything points to <em className="text-accent italic">deeper reading.</em>
        </h2>
        <p className="text-muted-foreground mx-auto mb-9 max-w-[46ch] font-sans text-[18px] leading-[1.6]">
          We&apos;re not a summarization engine. Every brief links back to the
          bill, order, or ruling it came from — so you can verify it yourself.
        </p>
        <Link
          href="#waitlist"
          className="bg-primary text-primary-foreground inline-flex h-[52px] cursor-pointer items-center justify-center rounded-full border-none px-7 font-sans text-[16px] font-medium whitespace-nowrap no-underline transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          Explore the source
        </Link>
      </AnimatedSection>

      <Divider />

      {/* ── WAITLIST ──────────────────────────────────────────────── */}
      <AnimatedSection
        variant="fadeUp"
        className="mx-auto px-6 py-14 text-center md:py-[4.5rem]"
        style={{ maxWidth: 1120 }}
        id="waitlist"
      >
        <h2
          className="text-foreground font-display mb-4 leading-[1.2] font-bold tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          Be first when Billion opens.
        </h2>
        <p className="text-muted-foreground mx-auto mb-7 max-w-[44ch] font-sans text-[18px] leading-[1.6]">
          Early access, updates, and pilot invites.
        </p>
        <WaitlistForm size="large" />
      </AnimatedSection>

      <Divider />

      {/* ── PLATFORMS ─────────────────────────────────────────────── */}
      <AnimatedSection
        variant="fadeUp"
        className="mx-auto px-6 py-14 text-center md:py-[4.5rem]"
        style={{ maxWidth: 1120 }}
      >
        <h2
          className="text-foreground font-display mb-4 leading-[1.2] font-normal tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
        >
          Built where you already are.
        </h2>
        <p className="text-muted-foreground mx-auto mb-9 max-w-[38ch] font-sans text-[16px] leading-[1.6]">
          The app is coming to iOS. The source is open on GitHub.
        </p>
        <StaggerContainer
          staggerDelay={0.1}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {platforms.map(({ Icon, name, status }) => (
            <StaggerItem
              key={name}
              variant="fadeUp"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 transition-colors duration-200 hover:bg-white/[0.06]"
            >
              <Icon className="text-foreground h-6 w-6 shrink-0" />
              <span className="flex flex-col items-start text-left">
                <span className="text-foreground font-sans text-[14px] font-semibold">
                  {name}
                </span>
                <span className="text-muted-foreground font-sans text-[12px]">
                  {status}
                </span>
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      <Divider />

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <AnimatedSection
        as="footer"
        variant="fadeIn"
        className="mx-auto flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left"
        style={{ maxWidth: 1120 }}
      >
        <span className="text-muted-foreground font-display text-[18px] font-bold">
          Billion
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-sans text-[13px] sm:justify-end">
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-accent no-underline transition-colors duration-200"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-accent no-underline transition-colors duration-200"
          >
            Privacy
          </Link>
          <span className="text-muted-foreground/70">
            &copy; 2026 Billion. All rights reserved.
          </span>
        </div>
      </AnimatedSection>
    </main>
  );
}
