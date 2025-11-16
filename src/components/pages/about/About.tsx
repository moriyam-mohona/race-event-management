"use client";

import Image from "next/image";
import aboutUsImage from "@/assets/about-us.png";

const About = () => {
  return (
    <div className="space-y-24 py-20 mt-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-500 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Me</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          “Sorry if you make it to the end — 10 points to you!” 😄
        </p>
      </section>

      {/* Story Section */}
      <section className="max-w-5xl mx-auto px-6 space-y-10 text-gray-800 leading-relaxed">
        <p>
          I’ve always believed it’s worth sharing why you’re doing something.
          This isn’t just another startup story — it’s about learning, fumbling,
          falling, and finding purpose again (and maybe helping a few others
          along the way).
        </p>

        <p>
          I’m not going to talk about childhood — that’s for the book one day.
          Instead, this is about the past few years: rediscovering what
          connection, adventure, and purpose really mean.
        </p>

        <hr className="my-8 border-gray-300" />

        <p>
          For as long as I can remember, I’ve wanted to fix things — situations,
          systems, experiences. Maybe it came from always wanting to make things
          better, to help, to connect. Helping others has always given me a
          satisfaction that money never could.
        </p>

        <p>
          But I’ve never been much of a conformist. If something doesn’t make
          sense, I’ll question it. I love a good challenge and I’m wired to make
          things fairer and more meaningful for the people around me.
        </p>

        <p>
          That energy turned into a series of community-driven projects —
          organizing local social events, pulling together small tours around
          Manchester (a bit of history, then a brewery 🍺), helping friends get
          outdoors, and supporting others in their fitness goals. None of it was
          for profit — it was about people, connection, and giving something
          back.
        </p>

        <hr className="my-8 border-gray-300" />

        <p>
          Then came COVID. Community life froze. The social things that filled
          the week just disappeared overnight.
        </p>

        <p>
          Like a lot of people, I threw myself into work to fill the space. But
          over time, that sense of belonging faded, and I found myself drifting
          — a bit lost, trying to fill the gap with routine and noise.
        </p>

        <p>
          That’s when endurance events entered the picture. It started with
          weekends in Wales or the Lakes, then moved further afield — anything
          that gave me a new focus and a reason to push myself again.
        </p>

        <hr className="my-8 border-gray-300" />

        <p>
          Endurance racing gave me something powerful — belonging. From UK races
          to events around the world, I rediscovered what community feels like:
          people from every background, coming together, helping each other,
          sharing something real.
        </p>

        <p>
          Italy quickly became my happy place. The kindness, the camaraderie,
          the shared challenge — it restores your faith in people. These moments
          are fleeting, but maybe that’s exactly what makes them so meaningful.
        </p>

        <p>
          Traveling solo has its quiet moments too. I’d often think:
          <span className="italic">
            “If only there were a way to share this journey — the travel, the
            stories, the laughter — with others doing the same thing.”
          </span>
        </p>

        <p>
          And that thought became the seed for what’s now{" "}
          <span className="font-semibold text-blue-600">DustiTrainers</span>.
        </p>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-bold text-gray-900">
          What DustiTrainers Is About
        </h2>
        <p>
          I want to make it easier for people to travel, connect, and belong —
          no matter where their next race or adventure takes them.
        </p>
        <p>
          To bring together travel logistics, race information, and community
          tools in one place:
        </p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Flights, stays, and local insights</li>
          <li>
            Community-led options like ride shares, kit swaps, and local guides
          </li>
          <li>Virtual expos where vendors and participants can connect</li>
          <li>
            Fair, safe entry exchanges for charity participants who can’t
            compete
          </li>
        </ul>

        <p>
          It’s about connection, simplicity, and accessibility — building
          something that makes the endurance world more human again.
        </p>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-bold text-gray-900">
          The Problems We’re Tackling
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Races aren’t unified globally</li>
          <li>Travel is expensive and rarely community-driven</li>
          <li>Athletes and adventurers struggle to connect meaningfully</li>
          <li>Vendors can’t easily reach the right audiences</li>
          <li>Affordability and inclusivity are missing</li>
          <li>Organizing everything is time-consuming and fragmented</li>
        </ul>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-bold text-gray-900">The Vision</h2>
        <p>
          I don’t just want to build a site — I want to build a movement. A
          space where travel, adventure, fitness, and culture connect naturally.
        </p>

        <p>With DustiTrainers, the aim is to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Simplify race and travel planning</li>
          <li>Connect like-minded travelers and athletes</li>
          <li>Support vendors and local communities</li>
          <li>Help everyone experience more of the world — together</li>
        </ul>

        <p>
          Imagine an app and website where your travel plans, itineraries, and
          connections live in one place — where organizing a race weekend feels
          exciting, not exhausting.
        </p>

        <p>
          Because the world feels smaller — and a lot friendlier — when you
          travel with people who get it.
        </p>

        <hr className="my-8 border-gray-300" />

        <p>
          We might not get everything right straight away — but we’re building,
          learning, and improving as we go. There’s a lot more to come.
        </p>

        <p>
          This is just the beginning of something we hope grows far beyond an
          app or a platform — into a global community built on trust, adventure,
          and shared experience.
        </p>

        <hr className="my-8 border-gray-300" />

        <p className="text-center font-semibold text-gray-700">
          If you’ve made it this far — thank you.
        </p>
        <p className="text-center text-lg font-bold text-blue-600">
          You’ve just read the story behind DustiTrainers: part adventure, part
          community, part “why not?” <br />
          10 points to you. 🏅
        </p>

        {/* 🔥 Add Image at the END */}
        <div className="mt-16 flex justify-center">
          <Image
            src={aboutUsImage}
            alt="About DustiTrainers"
            className="rounded-2xl shadow-lg w-full max-w-3xl"
            priority={false} // Optimized loading
          />
        </div>
      </section>
    </div>
  );
};

export default About;
