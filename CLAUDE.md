# Electric Forest 2025 Project Guidelines

## Build and Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style

### TypeScript & React
- Use TypeScript for type safety
- Function components with hooks (avoid class components)
- Prefer destructuring of props and state
- Use lazy loading for components when appropriate
- Use proper React hooks dependency arrays

### Formatting and Structure
- Keep components focused on a single responsibility
- Organize imports: React first, then external libs, then local imports
- Use consistent naming: PascalCase for components, camelCase for variables/functions
- Use optional chaining and nullish coalescing when appropriate
- Use async/await for asynchronous code

### State Management
- Use React's useState and useEffect for component state
- Avoid complex prop drilling - consider context for shared state
- Maintain immutability when updating state

### Tailwind CSS
- Use Tailwind utility classes for styling
- Follow the existing design system patterns
- Prefer Tailwind classes over custom CSS when possible

### Error Handling
- Use try/catch blocks for error handling in async operations
- Display user-friendly error messages
- Add proper loading states to async operations