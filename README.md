# cs913-dissertation-project

Code and necessary files for the dissertation proejct for Data Aanalytics MSc @Warwick Uni.

## Folder Structure

cs913-dissertation-project/
├── data/ # Contains project data
│ ├── processed/ # Preprocessed datasets
│ └── raw/ # Raw, unprocessed data
├── notebooks/ # Jupyter notebooks for preprocessing, analysis, and modeling
├── results/ # Results from analysis and models
│ ├── figs/ # Generated figures
│ └── models/ # Trained machine learning models
├── scripts/ # Scripts for data processing and analysis
│ ├── google_earth_engine/ # Scripts related to Google Earth Engine
│ └── r_scripts/ # R scripts for analysis
├── .gitignore # Git ignore file
├── msc_dissertation_report.pdf # MSc dissertation report
├── requirements.txt # Python dependencies for the project
└── README.md # Project README file

## Setup Instructions

### Prerequisites

- Python 3.11

### Steps to Activate Virtual Environment and Install Packages

1. **Create a virtual environment:**

   ```sh
   python -m venv venv
   ```

2. **Activate the virtual environment:**

   - On Windows:
     ```sh
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

3. **Install the required packages:**

   ```sh
   pip install -r requirements.txt
   ```

Now you are ready to run the project. Make sure to activate the virtual environment each time you work on the project.
