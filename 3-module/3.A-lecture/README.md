# Test Suite for Elite Fleet Group Application

A comprehensive test suite to ensure robust functionality and reliable performance for the **Elite Fleet Group** application ([test.elitefleetgroup.engenious.io](https://test.elitefleetgroup.engenious.io)).

## Repository

**[Elite Fleet Group Application GitHub Repository](https://test.elitefleetgroup.engenious.io/)**  
Refer to the app’s README for detailed information about the application itself.

## Getting Started

### Prerequisites

Ensure the following tools are installed to set up and run the test suite locally:

- **VS Code** – Recommended for a streamlined development experience.
- **Git** – To manage and synchronize project versions.
- **Node.js** – Version 18 or higher, required for Playwright and dependency management.

### Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/engenious-inc/playwright-examples/tree/advance-playwright
   cd playwright examples
   ```

2. **Install dependecies**
   ```bash
   npm install
   ```
   3.VS code Recommended Plugins

- ESLint
- Prettier
- GitLens
- Jest
- npm or `bash .vscode/extensions.json `

4. **Setup Playwright**
   ```bash
   npx playwright install --with-deps chromium
   ```
5. **Setup Husky**
   ```bash
   npx husky install
   ```

### Running Tests

Run all tests with a single command:

```bash
npx playwright test
```

For additional testing options and configurations, refer to the scripts section in package.json.

### Additional Usage & Configuration

#### Test Execution Options

Run tests in different browsers or in headless mode. Configure specific test cases or suites to execute as needed.

### Customizing Test Parameters

Adjust parameters in playwright.config.js to configure settings such as timeouts, retries, and browser options.

### Troubleshooting

Confirm that all dependencies are installed and a compatible Node.js version is in use. For further assistance, see the Playwright documentation.

#### License

This project is licensed under the MIT License. See the LICENSE file for details.
