"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { AnimatedSection } from "./animations";

/* ── The Annotated Record ─────────────────────────────────────────────────
   The page's one signature interactive moment: a real excerpt of bill text
   with three marked clauses. Click one — the raw clause and the plain-
   language annotation highlight together, making the source→brief link
   tangible instead of claimed in copy. */

interface Clause {
  id: string;
  mark: string;
  label: string;
  headline: string;
  body: string;
}

const extensionClause: Clause = {
  id: "extension",
  mark: "fiscal year 2028",
  label: "Funding",
  headline: "Extended 18 months.",
  body: "Authorization moves from fiscal year 2026 to 2028 — a runway, not a permanent fix.",
};

const reportingClause: Clause = {
  id: "reporting",
  mark: "quarterly implementation data",
  label: "Oversight",
  headline: "New quarterly check-ins.",
  body: "The agency must file implementation data with the committee every quarter — a paper trail that didn't exist before.",
};

const effectiveClause: Clause = {
  id: "effective",
  mark: "90 days after enactment",
  label: "Timeline",
  headline: "Starts in 90 days — for now.",
  body: "The clock starts at signing. A later appropriations bill could still reset it.",
};

const clauses: Clause[] = [extensionClause, reportingClause, effectiveClause];

function ClauseMark({
  clause,
  isActive,
  onSelect,
}: {
  clause: Clause;
  isActive: boolean;
  onSelect: (clause: Clause) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(clause)}
      aria-pressed={isActive}
      className="rounded-[3px] px-0.5 py-px underline decoration-dotted decoration-1 underline-offset-4 transition-colors duration-150"
      style={{
        backgroundColor: isActive ? "rgba(74,124,255,0.16)" : "transparent",
        color: isActive ? "#EAF0FF" : "inherit",
        textDecorationColor: isActive
          ? "#4A7CFF"
          : "rgba(255,255,255,0.3)",
      }}
    >
      {clause.mark}
    </button>
  );
}

function RawExcerpt({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (clause: Clause) => void;
}) {
  const parts: { text: string; clause?: Clause }[] = [
    {
      text: "Subsection (b)(2) is amended by striking fiscal year 2026 and inserting ",
    },
    { text: extensionClause.mark, clause: extensionClause },
    {
      text: ", subject to the reporting requirements described under paragraph (4). The Secretary shall submit ",
    },
    { text: reportingClause.mark, clause: reportingClause },
    {
      text: " to the committee of jurisdiction not later than 30 days after each quarter. This section takes effect ",
    },
    { text: effectiveClause.mark, clause: effectiveClause },
    { text: " unless superseded by subsequent appropriations language." },
  ];

  return (
    <p className="font-mono text-[13px] leading-[1.85] text-white/70 sm:text-[14px]">
      <span className="mb-3 block text-white/45">
        SEC. 204. AUTHORIZATION EXTENSION.
      </span>
      {parts.map((part, i) =>
        part.clause ? (
          <ClauseMark
            key={part.clause.id}
            clause={part.clause}
            isActive={activeId === part.clause.id}
            onSelect={onSelect}
          />
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </p>
  );
}

export function AnnotatedRecord({ id }: { id?: string }) {
  const [active, setActive] = useState<Clause>(extensionClause);
  const activeIndex = clauses.findIndex((c) => c.id === active.id);

  return (
    <section
      id={id}
      className="border-y border-white/[0.06] py-16 md:py-20"
      data-testid="annotated-record-section"
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1120 }}>
        <AnimatedSection
          variant="fadeUp"
          className="mx-auto mb-10 max-w-[52ch] text-center"
        >
          <h2
            className="text-foreground font-display m-0 leading-[1.18] font-normal tracking-[-0.01em]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
          >
            The source is public. Billion makes it legible.
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 mb-0 max-w-[42ch] font-sans text-[16px] leading-[1.6]">
            Click a marked clause below — see how the record becomes a brief.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="settle">
          <div
            className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-white/10 bg-[#0B1226] lg:grid-cols-2"
            data-testid="record-transition-visual"
          >
            {/* Raw source */}
            <div className="border-b border-white/[0.08] p-5 sm:p-7 lg:border-r lg:border-b-0">
              <div className="mb-4 flex items-center justify-between font-sans text-[11px] font-semibold tracking-[0.1em] text-white/45 uppercase">
                <span>Raw source</span>
                <span>Congress.gov</span>
              </div>
              <RawExcerpt activeId={active.id} onSelect={setActive} />

              <div
                className="mt-5 flex flex-wrap gap-2"
                role="group"
                aria-label="Select a clause to annotate"
              >
                {clauses.map((clause, i) => (
                  <button
                    key={clause.id}
                    type="button"
                    onClick={() => setActive(clause)}
                    aria-pressed={active.id === clause.id}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-[12px] font-medium transition-colors duration-150"
                    style={{
                      borderColor:
                        active.id === clause.id
                          ? "rgba(74,124,255,0.5)"
                          : "rgba(255,255,255,0.1)",
                      backgroundColor:
                        active.id === clause.id
                          ? "rgba(74,124,255,0.1)"
                          : "transparent",
                      color: active.id === clause.id ? "#EAF0FF" : "#8A8FA0",
                    }}
                  >
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        backgroundColor:
                          active.id === clause.id
                            ? "#4A7CFF"
                            : "rgba(255,255,255,0.12)",
                        color: active.id === clause.id ? "white" : "#8A8FA0",
                      }}
                    >
                      {i + 1}
                    </span>
                    {clause.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Billion brief */}
            <div className="bg-[#10182f] p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between font-sans text-[11px] font-semibold tracking-[0.1em] text-white/45 uppercase">
                <span>Billion brief</span>
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: "#4A7CFF" }}
                >
                  {activeIndex + 1}
                </span>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <span
                  className="inline-flex h-6 items-center rounded-[6px] px-[10px] text-[11px] font-medium text-white uppercase"
                  style={{
                    backgroundColor: "#4A7CFF",
                    letterSpacing: "0.08em",
                  }}
                >
                  Bill
                </span>
                <span className="font-sans text-[12px] font-medium text-white/46">
                  {active.label}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                >
                  <h3 className="text-foreground font-editorial m-0 text-[1.35rem] leading-[1.15] font-bold">
                    {active.headline}
                  </h3>
                  <p className="text-muted-foreground mt-2 mb-0 font-sans text-[14px] leading-[1.55]">
                    {active.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 rounded-[12px] border border-white/[0.08] bg-white/[0.03] p-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                    Source
                  </span>
                  <span className="font-sans text-[11px] text-white/44">
                    H.R. 4021 §204
                  </span>
                </div>
                <p className="m-0 font-mono text-[11px] leading-[1.5] text-white/55">
                  &quot;...{active.mark}...&quot;
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
