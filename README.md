# React PDF Question Answering App

This project is a full-stack application that allows users to upload PDF documents and ask questions regarding the content of these documents. The backend processes these documents and utilizes natural language processing to provide answers to the questions posed by the users.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ChewangGyalpuBhutia/AiPdfFrontend.git 
    cd react-pdf-question-answering-app
    ```

2. **Set up the backend:**

    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3. **Set up the frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

1. **Start the backend server:**

    ```bash
    cd backend
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    uvicorn main:app --reload
    ```

2. **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm start
    ```

3. **Open your browser and navigate to:**

    ```
    http://localhost:3000
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Project Structure
