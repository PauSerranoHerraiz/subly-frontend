import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <img src="/subly-navbar.svg" alt="Subly" className="h-12" />
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 text-sm font-semibold"
          >
            Get started
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full bg-lime-500/10 text-lime-400">
            Built for SaaS & startups
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Manage subscriptions <br />
            <span className="text-lime-400">without the chaos</span>
          </h1>

          <p className="text-gray-400 mt-5 text-lg max-w-xl">
            Subly helps startups centralize customers, plans and subscriptions
            in one clean dashboard. Start charging and tracking MRR in minutes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold"
            >
              Create free account
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              I already have an account
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            No credit card required · Setup in under 2 minutes
          </p>
        </div>

        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-sm text-gray-400">Active subscriptions</p>
              <p className="text-2xl font-bold text-lime-400">128</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-sm text-gray-400">Monthly recurring revenue</p>
              <p className="text-2xl font-bold">€4,320</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 col-span-2">
              <p className="text-sm text-gray-400 mb-2">Latest customers</p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Acme Inc.</li>
                <li>Wayne Enterprises</li>
                <li>Umbrella Corp.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Customers",
            desc: "Keep all your clients and subscription data organized."
          },
          {
            title: "Plans",
            desc: "Create monthly plans without complex billing logic."
          },
          {
            title: "Real-time dashboard",
            desc: "Instant visibility of active, paused and cancelled subs."
          }
        ].map((f) => (
          <div
            key={f.title}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-gray-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Don’t build subscription logic twice
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            As a founder, your time is better spent on product and growth.
            Subly handles the boring but critical subscription layer so you
            don’t have to.
          </p>
        </div>
      </section>

      <section className="bg-gray-800/40 border-t border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Start managing subscriptions the smart way
          </h2>
          <p className="text-gray-400 mt-4">
            Join early-stage startups using Subly to stay focused and organized.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-8 px-8 py-4 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold text-lg"
          >
            Get started for free
          </Link>
        </div>
      </section>
    </div>
  );
}
