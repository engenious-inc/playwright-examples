# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Playwright test automation framework for the Elite Fleet Group application, structured using the Page Object Model (POM) pattern. The framework follows SOLID principles, DRY approach, and modular design principles.

**Base URL**: `https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/`

## Essential Commands

### Test Execution
- `npm test` or `npx playwright test` - Run all tests
- `npm run test:debug` or `npx playwright test --debug` - Run tests in debug mode  
- `npm run test:headed` or `npx playwright test --headed` - Run tests in headed mode
- `npm run show-report` or `npx playwright show-report` - Show HTML test report

### Code Quality
- `npm run lint` - Run ESLint with zero warnings tolerance
- `npm run prettier` - Format code using Prettier
- `npm run prettier-check` - Check code formatting without making changes

### Setup Commands
- `npm install` - Install dependencies
- `npx playwright install --with-deps chromium` - Install Playwright browsers
- `npx husky install` - Setup Git hooks

## Architecture & Code Organization

### Page Object Model Structure
```
page-objects/
├── BasePage.ts              # Base class for all page objects
├── [PageName].ts            # Individual page objects (LoginPage, OurCarsPage, etc.)
└── components/              # Reusable UI components
    ├── BaseElement.ts       # Base class for all elements
    ├── ButtonElement.ts     # Button-specific functionality
    ├── InputElement.ts      # Input field functionality
    └── [ElementType].ts     # Other specialized elements
```

### Key Patterns
- **Base Classes**: All page objects extend `BasePage`, all elements extend `BaseElement`
- **Fixtures**: Custom Playwright fixtures in `fixtures/global.ts` provide dependency injection for page objects
- **Component-Based**: Complex UI elements are abstracted into component classes
- **Test Data**: Centralized in `data/` directory (e.g., `carData.ts`)

### Framework Principles
- **SOLID Compliance**: Single responsibility, dependency injection via fixtures
- **DRY Implementation**: Reusable components, centralized utilities, parameterized test data
- **Deterministic Data**: Uses seeded random data generation for consistent test execution
- **TypeScript Strict Mode**: Enforced explicit return types and strict typing

## Configuration Details

### Test Configuration (`playwright.config.ts`)
- **Test Directory**: `./tests`
- **Timeout**: 60 seconds per test, 10 seconds for assertions
- **Retries**: 0 (disabled)
- **Reporting**: HTML reports in `playwright-report/`
- **Browser**: Chromium only (Firefox/Safari commented out)
- **Failure Handling**: Video and trace on failure, screenshots on failure

### Code Quality Rules
- ESLint enforces explicit function return types
- No console logs allowed in production code
- Prettier for consistent formatting
- Husky pre-commit hooks ensure code quality

## Test Execution Environment
- **Primary Browser**: Desktop Chrome (Chromium)
- **Parallel Execution**: Fully parallel test execution
- **Failure Analysis**: Automatic video recording, traces, and screenshots on failures
- **Authentication**: Built-in credentials for test environment access

## Development Workflow
1. Create/modify page objects following existing patterns
2. Add reusable components when UI elements are complex
3. Use fixtures for dependency injection
4. Run linting and formatting before committing
5. Ensure all tests pass before creating pull requests

## Key Files to Understand
- `fixtures/global.ts` - Test fixtures and dependency injection setup
- `page-objects/BasePage.ts` - Foundation for all page objects  
- `page-objects/components/BaseElement.ts` - Foundation for all UI elements
- `playwright.config.ts` - Playwright configuration and environment settings