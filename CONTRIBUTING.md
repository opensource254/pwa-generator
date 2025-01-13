# Contributing to PWA Generator

We're excited you're interested in contributing to the PWA Generator project! We welcome contributions of all kinds, including bug fixes, feature enhancements, documentation improvements, and code reviews. This guide outlines the process for contributing effectively.

## Getting Started

1.  **Fork the Repository:**
    *   Visit the PWA Generator repository on GitHub.
    *   Click the "Fork" button to create your copy of the codebase.

2.  **Clone Your Fork:**
    *   Open your terminal and use `git clone` to clone your forked repository to your local machine. Replace `<username>` with your GitHub username:

    ```bash
    git clone [https://github.com/](https://github.com/)<username>/pwagenerator.git
    ```

3.  **Install Dependencies (using PNPM):**
    *   Navigate to your local project directory.
    *   Install the necessary dependencies using PNPM:

    ```bash
    pnpm install
    ```

4.  **Create a Branch:**
    *   Use `git checkout -b <branch_name>` to create a new branch for your changes.
    *   Use a descriptive branch name (e.g., `fix-typo-in-readme`, `add-icon-generation`).

    ```bash
    git checkout -b fix-typo-in-readme
    ```

## Making Changes

1.  **Work on Your Changes:**
    *   Make your modifications to the codebase.
    *   Follow the project's coding style guidelines (if any).

2.  **Linting and Formatting:**
    *   Before committing, ensure your code passes linting and formatting checks. Run the following command:

    ```bash
    pnpm run lint -- fix
    ```

    This command will automatically fix most linting and formatting issues. If there are any remaining errors, please address them manually.

3.  **Testing Your Changes:**
    *   Thoroughly test your changes to ensure they work as expected and don't introduce regressions.
    *   Consider adding unit tests if applicable.

4.  **Committing Your Changes:**
    *   Stage your changes using `git add <filename>` or `git add .` to stage all changes.
    *   Commit your changes with a clear and concise message using `git commit -m "<message>"`. Follow conventional commits if possible.

    ```bash
    git add .
    git commit -m "fix: Corrected typo in README"
    ```

5.  **Pushing Your Changes:**
    *   Push your changes to your forked repository:

    ```bash
    git push origin <branch_name>
    ```

## Creating a Pull Request (PR)

1.  **Open a Pull Request:**
    *   Visit your forked repository on GitHub and go to the "Pull requests" tab.
    *   Click "New pull request."
    *   Select your branch from the "compare" dropdown.
    *   Provide a clear title and description for your PR, explaining the changes you've made and the problem they solve.

2.  **Review and Discussion:**
    *   We'll review your PR and may provide feedback or request changes.
    *   Be responsive to feedback and willing to make adjustments as needed.

## Additional Guidelines

*   **Code Style:** Adhere to the project's coding style guidelines to maintain consistency.
*   **Documentation:** If your contribution changes functionality or the user interface, update the relevant documentation.
*   **Communication:** Actively participate in discussions and address questions or feedback promptly.
*   **Conventional Commits:** We encourage the use of conventional commits for more organized commit history.

## Thank You!

We appreciate your contribution to the PWA Generator project. Your participation helps make this tool better for everyone!
