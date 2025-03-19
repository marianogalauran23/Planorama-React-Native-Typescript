# Planorama React Native TypeScript Setup Guide

This guide will walk you through the steps to set up and run the Planorama React Native TypeScript project.

## Prerequisites

- **Node.js and npm (Node Package Manager):** Ensure you have Node.js and npm installed on your system.
- **Git:** Git is required for cloning the repository.
- **VS Code (Visual Studio Code):** Recommended for development.
- **Expo Go App:** Download Expo Go from the App Store (iOS) or Google Play Store (Android). Both your development machine and mobile device must be on the same network.

## Setup Instructions

1.  **Create a Project Folder:**

    ```bash
    mkdir your_folder_name
    ```

    Replace `your_folder_name` with the desired name for your project directory.

2.  **Navigate to the Project Folder:**

    ```bash
    cd path/to/your_folder_name
    ```

    For example:

    ```bash
    cd C:/Users/MJAY/your_folder_name
    ```

3.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/marianogalauran23/Planorama-React-Native-Typescript](https://github.com/marianogalauran23/Planorama-React-Native-Typescript)
    ```

4.  **Open in VS Code:**

    Navigate into the newly cloned directory:

    ```bash
    cd Planorama-React-Native-Typescript
    ```

    Then, open the project in VS Code:

    ```bash
    code .
    ```

5.  **Install npm Packages:**

    Open the terminal in VS Code (Ctrl + Shift + `) and install the project dependencies:

    ```bash
    npm install
    ```

6.  **Run the Application:**

    Ensure your mobile device with the Expo Go app is connected to the same network as your development machine. Then, start the Expo development server:

    ```bash
    npx expo start
    ```

    This will generate a QR code in your terminal or browser. Scan the QR code with the Expo Go app on your mobile device to run the application.

## Troubleshooting

- If you encounter issues with `npm install`, ensure you have the correct version of Node.js and npm installed. You can check the versions using `node -v` and `npm -v`.
- If the Expo Go app fails to connect, ensure both your computer and mobile device are on the same Wi-Fi network.
- If any packages are missing, or there are type errors, ensure you have ran `npm install` in the project directory.

## Happy coding!
