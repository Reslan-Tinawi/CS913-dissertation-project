# Project Title: cs913-dissertation-project

## Project Overview

Code and necessary files for the dissertation project for Data Analytics MSc @Warwick Uni. The project aims to analyze olive yield prediction using meteorological, climatic, and drought data.

## Repository Structure

The repository is organized as follows:

```
cs913-dissertation-project/
├── data/                        # Contains project data
│   ├── processed/               # Preprocessed datasets
│   └── raw/                     # Raw, unprocessed data
├── notebooks/                   # Jupyter notebooks for preprocessing, analysis, and modeling
├── results/                     # Results from analysis and models
│   ├── figs/                    # Generated figures
│   └── models/                  # Trained machine learning models
├── scripts/                     # Scripts for data processing and analysis
│   ├── google_earth_engine/     # Scripts related to Google Earth Engine
│   └── r_scripts/               # R scripts for analysis
├── .gitignore                   # Git ignore file
├── msc_dissertation_report.pdf  # MSc dissertation report
├── requirements.txt             # Python dependencies for the project
└── README.md                    # Project README file
```

### Detailed Description of Each Component

- **data/**: This directory contains all the datasets used in the project.

  - **raw/**: Unprocessed, original data files as obtained from various sources.
  - **processed/**: Preprocessed datasets ready for analysis.

- **notebooks/**: This folder contains Jupyter notebooks used for data preprocessing, exploratory data analysis, and model training.

- **results/**: Stores the outputs of the analysis.

  - **figs/**: Generated figures such as plots, charts, and visualizations.
  - **models/**: Contains saved versions of the trained machine learning models.

- **scripts/**: Directory for storing code scripts used for processing and analysis.

  - **google_earth_engine/**: Scripts specifically for handling data retrieval and processing via Google Earth Engine.
  - **r_scripts/**: R scripts used for additional analyses that require the R programming language.

- **.gitignore**: Specifies files and folders that Git should ignore, such as temporary files or data not to be included in version control.

- **msc_dissertation_report.pdf**: The final report of the dissertation, detailing methodology, results, and conclusions.

- **requirements.txt**: Lists all Python dependencies required to run the project. Use `pip install -r requirements.txt` to install them.

- **README.md**: This file, providing an overview of the repository and its contents.

## Getting Started

### Prerequisites

- Python 3.11

### Installation

Clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd cs913-dissertation-project
pip install -r requirements.txt
```

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

### Usage

1. **Data Preparation**: Start with the Jupyter notebooks in `notebooks/` for data preprocessing.
2. **Model Training**: Use the relevant notebooks to train models using the datasets.
3. **Results**: View generated figures and saved models in the `results/` directory.

## Contact

For any questions, please contact reslan3121@gmail.com
