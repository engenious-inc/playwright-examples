# GitHub Copilot Instructions for Project

## Overview
This instruction file provides guidelines for GitHub Copilot to generate code that adheres to our project standards.

## Coding Standards
- Use **TypeScript** for all test scripts.
- Prefer using **async/await** syntax over promises.
- Follow the project’s naming convention for variables and functions.
- Always add comments to explain complex logic.

## Test Specifications
- When writing Playwright tests, ensure that:
  - Tests should run on multiple browsers (Chrome, Firefox, WebKit).
  - Use **selectors** that are stable and maintainable.
  - Implement retry strategies for flaky tests.
  - Ensure tests adhere to the Single Responsibility Principle by focusing on one functionality per test.

## Example Test
Here's an example of the structure of a test:
- **Test Title**: User Login Test
- **Preconditions**: User is on the login page.
- **Steps**: Enter valid credentials and click on login.
- **Assertions**: Check if the user is redirected to the dashboard.
