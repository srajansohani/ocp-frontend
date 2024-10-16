import React from 'react'

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gray-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Master Your Coding Skills</h1>
          <p className="text-lg mb-8">Run code in the playground, solve challenging problems, and compete in coding contests.</p>
          <div className="flex space-x-4">
            
          </div>
        </div>
      </section>
      <section id="playground" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-600">Playground</h2>
          <p className="text-lg text-gray-700 mb-8">
            Write and run code in real time. Choose from multiple programming languages and test your solutions instantly.
          </p>
          <a href="/playground" className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-500">
            Start Coding
          </a>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-600">Solve Problems</h2>
          <p className="text-lg text-gray-700 mb-8">
            Practice your skills with coding problems ranging from easy to hard, and improve your problem-solving abilities.
          </p>
          <a href="/problems" className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-500">
            Solve Now
          </a>
        </div>
      </section>
      <section id="contests" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-white-600">Compete in Contests</h2>
          <p className="text-lg text-gray-600 mb-8">
            Challenge yourself by competing in real-time contests and see where you rank among fellow coders.
          </p>
          <a href="/contests" className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-500">
            Join a Contest
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; OCP(made by srajan)</p>
      </footer>
    </div>
  );
}

export default Home

