# Secret Santa

Welcome to the Secret Santa project! This application helps organize a Secret Santa gift exchange by randomly assigning secret children to participants, with the option to avoid assigning the same secret child as last year.

## Features

- **CSV Upload**: Upload a CSV file containing the list of participants.
- **Previous Assignments**: Optionally upload a CSV file of last year's assignments to avoid repeating the same secret child.
- **Random Assignment**: Randomly assigns secret children to participants.
- **Download Results**: Download the new assignments as a CSV file.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Lucide Icons**: A set of beautiful icons for React.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/secret-santa.git
   cd secret-santa
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:5173` to see the application in action.

## Usage

1. **Upload Participants List**: Click on "Choose File" to upload a CSV file containing the list of participants. The CSV should have columns for names and emails.

2. **Upload Previous Assignments (Optional)**: If you want to avoid assigning the same secret child as last year, upload the previous assignments CSV.

3. **Assign Secret Santas**: Click the "Assign Secret Santas" button to generate the new assignments.

4. **Download Results**: Once the assignments are generated, download the results as a CSV file.

## File Structure

- **src/components**: Contains reusable React components.
- **src/utils**: Contains utility functions for CSV processing and assignment logic.
- **src**: Main application files including `App.tsx` and styling files.

## Acknowledgments

- Thanks to the contributors of [Lucide Icons](https://lucide.dev/) for providing beautiful icons.
- Special thanks to the developers of [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/) for their amazing tools.
