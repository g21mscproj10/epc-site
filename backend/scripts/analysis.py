from cmath import nan
from libcst import Integer
from numpy import NaN
import pandas as pd
import datetime
import numpy as np 

metrics = [
    "energy-rating",
    "energy-efficiency",
    "environment-impact",
    "energy-consumption",
    "co2-emissions",
    "lighting-cost",
    "heating-cost",
    "hot-water-cost",
]

current_metrics = [
    "current-energy-rating",
    "current-energy-efficiency",
    "environment-impact-current",
    "energy-consumption-current",
    "co2-emissions-current",
    "lighting-cost-current",  # CO2-emissions had a column for emissions/floor area
    "heating-cost-current",
    "hot-water-cost-current",
]

potential_metrics = [
    "potential-energy-rating",
    "potential-energy-efficiency",
    "environment-impact-potential",
    "energy-consumption-potential",
    "co2-emissions-potential",
    "lighting-cost-potential",
    "heating-cost-potential",
    "hot-water-cost-potential",
]

house_rating_metrics = [
    "lighting-energy-eff",
    "lighting-env-eff",
    "walls-energy-eff",
    "walls-env-eff",
    "windows-energy-eff",
    "windows-env-eff",
    "hot-water-energy-eff",
    "hot-water-env-eff",
    "floor-energy-eff",
    "floor-env-eff",
    "roof-energy-eff",
    "roof-env-eff",
    "mainheat-energy-eff",
    "mainheat-env-eff",
    "mainheatc-energy-eff",
    "mainheatc-env-eff",
    "sheating-energy-eff",
    "sheating-env-eff",
]

rating_number = {
    "": NaN,
    "N/A": NaN,
    "NO DATA!": NaN,
    "Very Poor": 1,
    "Poor": 2,
    "Average": 3,
    "Good": 4,
    "Very Good": 5,
}

empty_string = {
    "": NaN,
}

def metrics_to_numeric(dataframe, metrics):
    """
    Convert the columns with column name in metrics in the Pandas
    dataframe to numerical values.
    """
    for metric in metrics:
        dataframe[metric] = pd.to_numeric(dataframe[metric], errors="coerce")


def generate_differences(dataframe, metrics, currents, potentials):
    """
    Generate columns based on the differences between currents and potentials
    """
    for metric, current, potential in zip(metrics, currents, potentials):
        label = "difference-" + metric
        dataframe[label] = dataframe[potential] - dataframe[current]


def generate_normalised_data(dataframe, currents, normalise):
    """
    Generate columns based on normalising the currents by the normalise column
    """
    for current in currents:
        label = current + "-per-" + normalise
        dataframe[label] = dataframe[current] / dataframe[normalise]


def convert_to_rating(dataframe, house_rating_metrics):
    for house_rating in house_rating_metrics:
        fixed_metric = house_rating.upper().replace("-", "_") #DELETE THIS FOR NON BIGQUERY
        dataframe[fixed_metric].replace(rating_number, inplace=True)

def convert_from_SAP(sap_rating):
    if sap_rating in range(21):
        return 'G'
    elif sap_rating in range(39):
        return 'F'
    elif sap_rating in range(55):
        return 'E'
    elif sap_rating in range(69):
        return 'D'
    elif sap_rating in range(81):
        return 'C'
    elif sap_rating in range(92):
        return 'B'
    else:
        return 'A'

def verify_number(data):
    if data:
        return data

    return None

def timeseries_data(dataframe):
    convert_to_rating(dataframe, house_rating_metrics)
    dataframe.sort_values("ADDRESS")
    differences = []
    for i, house in dataframe.iterrows():
        address = house["ADDRESS"]
        if i + 1 < len(dataframe):
            other_house_address = dataframe.iloc[i+1, dataframe.columns.get_loc("ADDRESS")]
            if other_house_address == address:
                year_diff_neg = int(pd.to_datetime(house["INSPECTION_DATE"]).year) - int(pd.to_datetime(dataframe.iloc[i+1, dataframe.columns.get_loc("INSPECTION_DATE")]).year)
                difference = 0
                if year_diff_neg < 0:
                    difference = dataframe.iloc[i+1, dataframe.columns.get_loc("WALLS_ENERGY_EFF")] - house["WALLS_ENERGY_EFF"]
                else:
                    difference = house["WALLS_ENERGY_EFF"] - dataframe.iloc[i+1, dataframe.columns.get_loc("WALLS_ENERGY_EFF")]
                year_diff = abs(year_diff_neg)
                if year_diff > 0 and difference > 0: #EPC sometimes gives negative over time
                    if difference / year_diff > 0 or difference / year_diff < 0:
                        differences.append(difference / year_diff)
    print(differences)
    print(sum(differences))
    return sum(differences)/len(differences) #Return average
