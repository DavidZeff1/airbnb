"use client";

export default function Footer() {
  const emailProviders = [
    {
      name: "Gmail",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=dpzeff@email.com&su=Contact%20from%20Website",
    },
    {
      name: "Yahoo Mail",
      url: "https://compose.mail.yahoo.com/?to=dpzeff@email.com&subject=Contact%20from%20Website",
    },
    {
      name: "Copy Email",
      url: "copy",
    },
  ];

  const handleEmailClick = (provider: (typeof emailProviders)[0]) => {
    if (provider.url === "copy") {
      navigator.clipboard.writeText("dpzeff@email.com");
      alert("Email copied to clipboard!");
    } else {
      window.open(provider.url, "_blank");
    }
  };

  return (
    <footer className="bg-gray-100 p-6 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* 📢 Section 1: Disclaimer */}
        <div>
          <h4 className="font-semibold mb-2">Disclaimer</h4>
          <p>
            This app is a clone of Airbnb, created for educational purposes
            only. All listings, bookings, and payments are simulated. No real
            transactions take place, and no user data is stored.
            &quot;PlacePal&quot; is not affiliated with Airbnb.
          </p>
        </div>

        {/* 👤 Section 2: About Me */}
        <div>
          <h4 className="font-semibold mb-2">About the Developer</h4>
          <p>
            Built by David Zeff, a computer science graduate passionate about
            full stack development, UI/UX, and clean code. Always learning,
            always building.
          </p>
        </div>

        {/* 🔗 Section 3: Connect + Logo (side by side in a row) */}
        <div className="flex flex-row justify-between items-start gap-6">
          {/* 🔗 Connect */}
          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 relative group">
                <img src="/icons/email.png" alt="Email" className="w-4 h-4" />
                <span className="hover:underline cursor-pointer">Email Me</span>

                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  {emailProviders.map((provider, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmailClick(provider)}
                      className="w-full text-left px-4 py-1 hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900"
                    >
                      {provider.name}
                    </button>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2">
                <img src="/icons/github.png" alt="GitHub" className="w-4 h-4" />
                <a
                  href="https://github.com/DavidZeff1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="/icons/linkedin.png"
                  alt="LinkedIn"
                  className="w-4 h-4"
                />
                <a
                  href="https://www.linkedin.com/in/david-zeff-computerscience141592/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </li>

              <li className="flex items-center gap-2">
                <img
                  src="/icons/briefcase.png"
                  alt="Portfolio"
                  className="w-4 h-4"
                />
                <a
                  href="https://davidzeff1.github.io/ResumeWebsite/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* 🏠 Logo (next to links) */}
          <div className="self-start">
            <img
              src="/logos/placePalLogo.png"
              alt="PlacePal Logo"
              className="w-50 h-auto"
            />
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-6 text-gray-500">
        &copy; {new Date().getFullYear()} PlacePal — By David Zeff
      </div>
    </footer>
  );
}
