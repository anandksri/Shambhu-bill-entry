# Shambhu Ji RXL Bill Entry

A lightweight browser-based bill entry system for creating and calculating Shambhu Ji RXL-style entries.

## About

The project provides an item-wise bill entry interface with automatic calculations and formatted output. It is designed to make repetitive bill calculations easier and reduce manual calculation errors.

## Features

- Item-wise bill entry
- Expression-based input for quantities and rates
- Automatic calculation of totals
- Net weight and fine calculations
- Fine calculation based on Net Wt. × Tunch%
- Number formatting for bill-style output
- Browser-based interface with no build step required

## Calculation

The bill system supports expressions such as:

```text
1040
71*1.8
14*1.8+19*1.8
10*12.140+6*12.315
```

For fine calculation, the project uses the bill's convention of multiplying net weight by the tunch percentage. For example:

```text
Net Wt. = 370
Tunch = 74%
Fine = 370 × 74% = 273.8
```

## Tech Stack

- HTML5
- CSS3
- JavaScript

## Getting Started

Clone the repository:

```bash
git clone https://github.com/anandksri/Shambhu-bill-entry.git
cd Shambhu-bill-entry
```

Open `index.html` in a browser.

No package installation or build process is required.

## Project Structure

```text
index.html    Bill entry interface
style.css     Application styling
script.js     Calculations and bill logic
```

## Notes

This is a client-side utility intended to assist with bill preparation and calculations. Always verify generated values against the original bill before using them for accounting or financial records.

## Author

Anand Keshari
