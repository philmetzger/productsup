const About = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Senior Frontend Developer - Take-Home Challenge
        </h2>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            ⏱️ Time Allocation: 3-4 hours
          </h3>
          <p className="text-blue-800">
            This challenge evaluates your React architecture, Tailwind CSS
            proficiency, and ability to build scalable, maintainable features.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📋 Requirements
          </h3>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                1. Sorting Functionality
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Add sorting by Product Name (A-Z, Z-A)</li>
                <li>• Add sorting by Price (Low to High, High to Low)</li>
                <li>
                  • Make column headers clickable with visual indicators
                  (arrows/icons)
                </li>
                <li>
                  • Ensure sorting works seamlessly with category filtering
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                2. Pagination
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>
                  • Implement client-side pagination (10 products per page)
                </li>
                <li>• Add Previous/Next buttons and page number indicators</li>
                <li>
                  • Show current page, total pages, and items range (e.g.,
                  "Showing 1-10 of 15")
                </li>
                <li>
                  • Structure code to allow easy transition to server-side
                  pagination later
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                3. Responsive Layout
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Ensure table looks great on desktop (1024px+)</li>
                <li>
                  • On tablet (768px-1023px), optimize table spacing and layout
                </li>
                <li>
                  • On mobile (&lt;768px), convert table to card/grid layout
                </li>
                <li>
                  • Maintain all functionality (filter, sort, pagination) across
                  breakpoints
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💎 Evaluation Criteria
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Code Quality</h4>
              <p className="text-sm text-gray-700">
                Clean, readable, well-structured components with proper
                separation of concerns
              </p>
            </div>
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scalability</h4>
              <p className="text-sm text-gray-700">
                Architecture that's easy to extend, reusable hooks/components,
                future-proof design
              </p>
            </div>
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
              <p className="text-sm text-gray-700">
                Efficient rendering, proper React patterns, consideration for
                large datasets
              </p>
            </div>
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-semibold text-gray-900 mb-2">UI/UX Polish</h4>
              <p className="text-sm text-gray-700">
                Thoughtful Tailwind usage, smooth transitions, accessible
                markup, intuitive interactions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🚀 Bonus Points (Optional)
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 mt-1 shrink-0">⭐</span>
              <span>
                Extract reusable custom hooks (e.g., usePagination, useSort,
                useFilter)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 mt-1 shrink-0">⭐</span>
              <span>
                Add TypeScript types/interfaces for better type safety
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 mt-1 shrink-0">⭐</span>
              <span>Implement smooth loading states or skeleton screens</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 mt-1 shrink-0">⭐</span>
              <span>Add keyboard navigation support for accessibility</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            📝 Submission Guidelines
          </h3>
          <ul className="space-y-2 text-yellow-800 text-sm">
            <li>• Push your code to a GitHub repository</li>
            <li>
              • Include a README with setup instructions and any design
              decisions
            </li>
            <li>
              • Be prepared to explain your architecture choices in the live
              round
            </li>
            <li>
              • Document any trade-offs or areas you'd improve with more time
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
