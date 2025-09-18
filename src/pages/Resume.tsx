import React from 'react';

export default function Resume() {
  return (
    <div className="flex justify-center p-4 sm:p-8 bg-[#0f0f0f] text-white min-h-screen">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <header className="mb-6 border-b border-zinc-700 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Maneeshwar Marpu's Resume</h1>
          <div className="text-sm sm:text-base text-zinc-400 mt-2">
            <p className="mb-1">
              (346) 638 - 2834 | mmarpu@CougarNet.uh.edu
            </p>
            <a href="www.linkedin.com/in/marpumaneeshwar" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              LinkedIn
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Portfolio
            </a>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">

            {/* Experiences Section */}
            <section className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
              <h2 className="text-xl sm:text-2xl font-semibold border-b border-zinc-700 pb-2 mb-4">EXPERIENCES</h2>
              <ul className="space-y-6">
                <li className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  <div className="flex justify-between flex-wrap items-center mb-1">
                    <h3 className="text-lg font-bold">MOTOROLA SOLUTION PVT LTD</h3>
                    <span className="text-zinc-400 text-sm">Mar 2022 - Jun 2024</span>
                  </div>
                  <p className="italic text-zinc-400 mb-2">Software Engineer, SRE</p>
                  <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                    <li>Converted Azure Pipelines to GitHub Workflows to streamline CI/CD processes[cite: 25].</li>
                    <li>Designed and implemented GitHub Actions pipelines to automate AWS tasks[cite: 27].</li>
                    <li>Implemented Chaos Engineering practices using Litmus and Kubernetes to validate system resilience[cite: 29].</li>
                  </ul>
                </li>
                <li className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  <div className="flex justify-between flex-wrap items-center mb-1">
                    <h3 className="text-lg font-bold">Instructional Assistant – Introduction to Cloud Computing</h3>
                    <span className="text-zinc-400 text-sm">Aug 2025 - Dec 2025</span>
                  </div>
                  <p className="italic text-zinc-400 mb-2">University of Houston</p>
                  <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                    <li>Assisted students in learning cloud computing fundamentals[cite: 37].</li>
                    <li>Supported hands-on labs with AWS, Azure, Docker, and Kubernetes[cite: 38].</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* Projects Section */}
            <section className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
              <h2 className="text-xl sm:text-2xl font-semibold border-b border-zinc-700 pb-2 mb-4">PROJECTS</h2>
              <ul className="space-y-6">
                <li className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  <h3 className="text-lg font-bold">Ployglot Compiler Workbench</h3>
                  <p className="italic text-zinc-400 text-sm mt-1">Streamlit, Python, Pycparser, Javalang, Esprima</p>
                  <p className="text-sm text-zinc-300 mt-2">Built an interactive web application that visualizes the full compilation pipeline for multiple languages including C, Java, and Python[cite: 54].</p>
                </li>
                <li className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  <h3 className="text-lg font-bold">Project Management System</h3>
                  <p className="italic text-zinc-400 text-sm mt-1">Django, MySQL, Bootstrap, Pandas, Matplotlib, AWS</p>
                  <p className="text-sm text-zinc-300 mt-2">Built a web-based platform for project and task management with features like work status tracking and due-date reminders[cite: 60].</p>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-1 space-y-6">

            {/* Education Section */}
            <section className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
              <h2 className="text-xl sm:text-2xl font-semibold border-b border-zinc-700 pb-2 mb-4">EDUCATION</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-bold">UNIVERSITY OF HOUSTON</h3>
                  <p className="text-zinc-400 text-sm">Master of Science in Engineering Data Science</p>
                  <p className="text-xs text-zinc-500">May 2026</p>
                </li>
                <li>
                  <h3 className="font-bold">KONERU LAKSHMAIAHN EDUCATION FOUNDATION</h3>
                  <p className="text-zinc-400 text-sm">Bachelor of Technology in Computer Science and Engineering</p>
                  <p className="text-xs text-zinc-500">Apr 2023</p>
                </li>
              </ul>
            </section>
            
            {/* Technical Skills Section */}
            <section className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
              <h2 className="text-xl sm:text-2xl font-semibold border-b border-zinc-700 pb-2 mb-4">TECHNICAL SKILLS</h2>
              <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                <li><span className="font-semibold">Languages:</span> Python, Java, C, SQL [cite: 12]</li>
                <li><span className="font-semibold">Web:</span> React.js, Vue.js, Django, Springboot [cite: 15]</li>
                <li><span className="font-semibold">Cloud/DevOps:</span> AWS, Azure, Kubernetes, Docker [cite: 19]</li>
                <li><span className="font-semibold">Databases:</span> MySQL, MongoDB [cite: 17]</li>
                <li><span className="font-semibold">Tools:</span> Git, JIRA, PowerBI, Tableau, Grafana [cite: 18]</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}