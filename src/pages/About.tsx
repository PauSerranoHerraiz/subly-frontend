import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">
          About <span className="text-lime-400">Subly</span>
        </h1>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Subly is a <span className="text-lime-400 font-semibold">subscription management SaaS</span> built to
          help startups and small businesses manage customers, plans, and recurring revenue
          from a single, clean dashboard.
        </p>

        <p className="text-gray-400 mb-10 leading-relaxed">
          This project was designed and developed end-to-end with a strong focus on real-world
          SaaS architecture: authentication, multi-tenant data access, clean APIs, and a
          modern, maintainable frontend.
        </p>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-lime-400">
            Technical focus
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>
              <span className="text-lime-400 font-medium">Frontend:</span>{" "}
              React + TypeScript, component-driven UI, reusable patterns, responsive design with Tailwind CSS.
            </li>
            <li>
              <span className="text-lime-400 font-medium">Backend:</span>{" "}
              Node.js with Express, RESTful APIs, JWT authentication, role-based access control.
            </li>
            <li>
              <span className="text-lime-400 font-medium">Database:</span>{" "}
              PostgreSQL with Prisma ORM, relational modeling, enums, indexing, and migrations.
            </li>
            <li>
              <span className="text-lime-400 font-medium">Architecture:</span>{" "}
              Clear separation between frontend, API, and data layer. Designed for scalability and maintainability.
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-lime-400">
            Why this project?
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Subly was created as a <strong>portfolio project</strong> to demonstrate the ability to design,
            build, and iterate on a production-style SaaS application — not just isolated
            components or coding challenges.
          </p>

          <p className="text-gray-400 leading-relaxed">
            It reflects how I approach software development: understanding the problem,
            making pragmatic technical decisions, and delivering a clean, usable solution.
          </p>
        </div>

        <div className="bg-gray-800 border border-lime-400/20 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Connect & explore</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/PauSerranoHerraiz/subly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 rounded-lg transition border border-gray-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span>View on GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/pau-serrano-herraiz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn profile</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/signup"
            className="px-5 py-3 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold transition text-center"
          >
            Explore the app
          </Link>
          <Link
            to="/"
            className="px-5 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-center"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
