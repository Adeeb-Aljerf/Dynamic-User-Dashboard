# Dynamic User Dashboard

A responsive Angular application that demonstrates modern web development practices including state management with NgRx, animations, and responsive design.

## Live Demo

[View the live application](https://aj-dynamic-user-dashboard.netlify.app/)

## Features

- User directory with pagination
- Detailed user profiles
- Responsive design for all device sizes
- State management with NgRx
- Smooth animations and transitions
- Image loading with fallback handling
- Search functionality

## Technology Stack

- Angular 19
- NgRx for state management
- Angular Material UI components
- RxJS for reactive programming
- CSS with responsive design principles

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/dynamic-user-dashboard.git
   cd dynamic-user-dashboard
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── animations/       # Animation definitions
│   ├── directives/       # Custom directives
│   ├── models/           # TypeScript interfaces
│   ├── services/         # API services
│   ├── store/            # NgRx store (actions, effects, reducers)
│   ├── user-details/     # User details component
│   ├── user-list/        # User listing component
│   └── app.component.*   # Root component
├── assets/               # Static assets
└── environments/         # Environment configurations
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing

Run `ng test` to execute the unit tests via Karma.

## Code Quality

This project follows Angular best practices and coding standards including:

- Proper component architecture
- Reactive state management
- Lazy loading where appropriate
- Accessibility considerations
- Responsive design principles

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ReqRes API](https://reqres.in/) for the test API
- Angular team for the excellent framework
