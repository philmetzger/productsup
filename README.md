````markdown
# Senior Frontend Developer - Take-Home Challenge

## 🎯 Overview

Welcome to the ProductsUp take-home challenge! This exercise is designed to evaluate your React architecture skills, Tailwind CSS proficiency, and ability to build scalable, maintainable features.

**Time Allocation:** 3-4 hours

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/philmetzger/productsup
cd productsup

# Install dependencies
npm install

# Start development server
npm run dev
```
````

The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📋 Challenge Requirements

### 1. Sorting Functionality ✅

Enhance the Products table with sorting capabilities:

- [ ] Add sorting by **Product Name** (A-Z, Z-A)
- [ ] Add sorting by **Price** (Low to High, High to Low)
- [ ] Make column headers clickable with visual indicators (arrows/icons)
- [ ] Ensure sorting works seamlessly with the existing category filter
- [ ] Maintain sort state when switching between categories

**Bonus:** Consider multi-column sorting or using lucide-react icons for visual feedback

---

### 2. Pagination 📄

Implement client-side pagination for the product list:

- [ ] Display **10 products per page**
- [ ] Add Previous/Next navigation buttons
- [ ] Show page numbers with current page highlighted
- [ ] Display items range (e.g., "Showing 1-10 of 15 products")
- [ ] Reset to page 1 when filters or sorting changes
- [ ] Structure code to allow easy transition to **server-side pagination** later

**Architecture Note:** Consider creating a reusable `usePagination` hook

---

### 3. Responsive Layout 📱

Make the product table responsive across all devices:

- [ ] **Desktop (1024px+)**: Full table layout (current implementation)
- [ ] **Tablet (768px-1023px)**: Optimized table with adjusted spacing
- [ ] **Mobile (<768px)**: Convert to **card or grid layout**
- [ ] Maintain all functionality (filter, sort, pagination) across breakpoints
- [ ] Ensure touch-friendly tap targets on mobile

**Tailwind Tip:** Use responsive utilities like `hidden`, `block`, `md:table`, `grid`, etc.

---

## 💎 Evaluation Criteria

Your submission will be evaluated on:

### Code Quality (30%)

- Clean, readable component structure
- Proper separation of concerns
- Consistent naming conventions
- Well-organized file structure

### Scalability (25%)

- Easy to extend and maintain
- Reusable components and hooks
- Future-proof architecture
- Clear abstractions

### Performance (20%)

- Efficient rendering patterns
- Proper React optimization (useMemo, useCallback if needed)
- Consideration for large datasets
- Minimal unnecessary re-renders

### UI/UX Polish (25%)

- Thoughtful Tailwind class usage
- Smooth transitions and interactions
- Accessible markup (semantic HTML, ARIA labels)
- Intuitive user experience

---

## 🌟 Bonus Points (Optional)

Impress us with:

- ⭐ **Custom Hooks** - Extract reusable logic (e.g., `usePagination`, `useSort`, `useFilter`)
- ⭐ **TypeScript** - Add types/interfaces for better type safety
- ⭐ **Loading States** - Implement skeleton screens or loading indicators
- ⭐ **Accessibility** - Keyboard navigation, screen reader support
- ⭐ **Animations** - Subtle transitions using Tailwind or CSS
- ⭐ **Error Boundaries** - Graceful error handling
- ⭐ **URL State** - Persist filter/sort/page state in URL params

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
├── index.css            # Tailwind imports
└── components/          # (You may create this)
    ├── Header.jsx
    ├── Sidebar.jsx
    ├── Footer.jsx
    ├── ProductsPage.jsx
    └── ...
```

**Note:** Feel free to restructure as you see fit. We want to see YOUR architectural decisions.

---

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Tailwind CSS v4** - Styling (using @tailwindcss/vite)
- **Vite** - Build tool
- **Lucide React** - Icon library (optional)
- **React Router** - Available if needed (currently using state-based routing)

---

## 📝 Submission Guidelines

### What to Submit

1. **GitHub Repository**

   - Push your completed code to a public GitHub repo
   - Include this README with any updates/notes

2. **README Updates** (Add a section below)

   - Document your architectural decisions
   - Explain any trade-offs you made
   - List what you'd improve with more time
   - Note any assumptions you made

3. **Code Comments**
   - Add comments for complex logic
   - Explain non-obvious decisions

### Example README Section to Add:

```markdown
## 🏗️ My Implementation Notes

### Architecture Decisions

- Created generic custom `usePagination` hook to encapsulate pagination logic
- Created genertic custom `useMultiSort` hook to easily allow sorting my multiple columns
- Restructured the app into logical directories for a cleaner structure
- Tried to create as many components as possible in order to create short be easy to test components
- Created some buildingblocks (reusable components). Sort of like a design system
- tests are located close to the files they are testing in a directory called `__tests__`
- No need for list virtualization since we only show 10 products per page

### Trade-offs

- Implemented client-side pagination due to time constraints. However I update the url with the query params to make it easier to go to server side sorting
- Used simple category filter instead of multi-select to focus on core requirements
- Skeleton and empty states are implemented for key views, but the app assumes the local data “just works” and does not show rich error messages or retries, which would be needed in a production environment.
- State is managed with React component state and custom hooks (e.g. sorting and pagination) instead of a global store like Context, Redux or Zustand. This is simpler for a small app but would be harder to scale to very complex shared state.

### What I'd Improve

- Add more unit tests for hooks and utilities, plus integration tests for the main user flows (sorting, filtering, pagination, and switching layouts).
- Replace the static JSON data with real API calls and add proper loading and error handling. Sort/filter on server
- Add search functionality
- Create more buildingblocks such as `<Text />`, `<Badge />`, etc. This would ensure a consistent UI/design

### AI assistance
- I used Cursor with GPT-5.1 first in plan mode and then agent mode for most tasks
- Every file was reviewed by me to confirm its logic
- I would create directories to restructure the app in order to help agent mode decide where to put files

### Time Breakdown

- Sorting: 1 hour
- Pagination: 1 hours
- Responsive layout: 1 hour
- Polish & refactoring: 1 hour
```

---

## ❓ FAQ

**Q: Can I use additional libraries?**  
A: Stick to what's provided. We want to see your core React and Tailwind skills.

**Q: Should I add TypeScript?**  
A: Optional but appreciated. The codebase is JavaScript by default.

**Q: Can I refactor the existing code?**  
A: Absolutely! We want to see your architectural decisions.

**Q: What if I don't finish everything?**  
A: Focus on quality over quantity. It's better to have 2 well-implemented features than 3 rushed ones.

**Q: Can I use React Router for navigation?**  
A: It's available in package.json, but the current state-based approach is fine for this challenge.

**Q: Can I use agentic AI tools (e.g., GitHub Copilot, ChatGPT, Cursor, etc.)?**  
A: Yes — you’re allowed (and even encouraged) to use agentic AI tools if they help you move faster or structure your work more effectively.
However, please be transparent:

- Clearly note **where** and **why** you used AI assistance (e.g., to refactor code, generate utility hooks, or optimize Tailwind classes).
- We’re not grading whether you used AI — we’re assessing your **ability to understand, adapt, and explain** the code you produce.

---

## 🙏 Thank You!

We appreciate you taking the time to complete this challenge. We're excited to see your approach and discuss it with you in the follow-up round.

Good luck! 🚀
