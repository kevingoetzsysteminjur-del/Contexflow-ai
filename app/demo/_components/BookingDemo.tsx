"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles } from "lucide-react";

type Lang = "de" | "en";

const TX = {
  de: {
    months: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    days: ["Mo","Di","Mi","Do","Fr","Sa","So"],
    aiRec: "KI-Empfehlung",
    booked: "Belegt",
    form: { name: "Ihr Name", email: "Ihre E-Mail", cta: "Termin bestätigen" },
    success: { title: "Termin bestätigt! 🎉", sub: "Sie erhalten eine Bestätigungs-E-Mail in Kürze." },
    reset: "Neuen Termin buchen",
    selectDate: "Bitte wählen Sie zuerst ein Datum.",
    slots: "Verfügbare Zeiten",
  },
  en: {
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    days: ["Mo","Tu","We","Th","Fr","Sa","Su"],
    aiRec: "AI-Recommended",
    booked: "Booked",
    form: { name: "Your name", email: "Your email", cta: "Confirm appointment" },
    success: { title: "Appointment confirmed! 🎉", sub: "You will receive a confirmation email shortly." },
    reset: "Book new appointment",
    selectDate: "Please select a date first.",
    slots: "Available times",
  },
};

const SLOTS = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];
const AI_REC = "10:00";
const BOOKED = ["09:00","13:00","16:00"];

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  // Monday-first offset
  const startOffset = (first.getDay() + 6) % 7;
  const days: (number | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

export default function BookingDemo({ lang }: { lang: Lang }) {
  const tx = TX[lang];
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const days = getCalendarDays(viewYear, viewMonth);
  const today = now.getDate();
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null); setSelectedSlot(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null); setSelectedSlot(null);
  }

  function isPast(d: number) {
    if (!isCurrentMonth) return false;
    return d < today;
  }

  function confirm() {
    if (!selectedDay || !selectedSlot || !name.trim() || !email.trim()) return;
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center h-72 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center animate-[scale-in_0.3s_ease]">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <h3 className="text-white text-xl font-bold">{tx.success.title}</h3>
        <p className="text-zinc-400 text-sm">{tx.success.sub}</p>
        <p className="text-indigo-300 text-sm font-medium mt-1">
          {tx.months[viewMonth]} {selectedDay} · {selectedSlot} Uhr
        </p>
        <button
          onClick={() => { setConfirmed(false); setSelectedDay(null); setSelectedSlot(null); setName(""); setEmail(""); }}
          className="mt-2 text-xs text-zinc-500 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition-colors"
        >
          {tx.reset}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Calendar */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-zinc-400 hover:text-white">
            <ChevronLeft size={16} />
          </button>
          <span className="text-white text-sm font-semibold">{tx.months[viewMonth]} {viewYear}</span>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-zinc-400 hover:text-white">
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {tx.days.map((d) => (
            <div key={d} className="text-center text-zinc-500 text-xs py-1 font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const past = isPast(d);
            const isToday = isCurrentMonth && d === today;
            const sel = selectedDay === d;
            const isWeekend = [5,6].includes((i) % 7); // Sa/So
            return (
              <button
                key={i}
                disabled={past || isWeekend}
                onClick={() => { setSelectedDay(d); setSelectedSlot(null); }}
                className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-all font-medium
                  ${sel ? "bg-indigo-600 text-white scale-105 shadow-lg shadow-indigo-500/30" : ""}
                  ${!sel && isToday ? "border border-indigo-500/60 text-indigo-300" : ""}
                  ${!sel && !isToday && !past && !isWeekend ? "text-zinc-300 hover:bg-white/10" : ""}
                  ${(past || isWeekend) ? "text-zinc-700 cursor-not-allowed" : ""}
                `}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: slots + form */}
      <div className="flex flex-col gap-4">
        {/* Time Slots */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">{tx.slots}</p>
          {!selectedDay ? (
            <p className="text-zinc-600 text-sm">{tx.selectDate}</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {SLOTS.map((slot) => {
                const isBooked = BOOKED.includes(slot);
                const isAI = slot === AI_REC;
                const isSel = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`relative rounded-xl px-3 py-2.5 text-sm font-medium flex items-center justify-between transition-all
                      ${isSel ? "bg-indigo-600 text-white" : ""}
                      ${!isSel && !isBooked ? "bg-white/5 border border-white/10 text-zinc-300 hover:border-indigo-500/50 hover:text-white" : ""}
                      ${isBooked ? "bg-white/[0.02] border border-white/5 text-zinc-700 cursor-not-allowed" : ""}
                    `}
                  >
                    <span>{slot}</span>
                    {isBooked && <span className="text-xs text-zinc-600">{tx.booked}</span>}
                    {isAI && !isBooked && (
                      <span className={`flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full ${isSel ? "bg-white/20 text-white" : "bg-indigo-500/20 text-indigo-300"}`}>
                        <Sparkles size={10} />
                        {tx.aiRec}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-indigo-500/60 transition-colors"
            placeholder={tx.form.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-indigo-500/60 transition-colors"
            placeholder={tx.form.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={confirm}
            disabled={!selectedDay || !selectedSlot || !name.trim() || !email.trim()}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/30"
          >
            {tx.form.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
