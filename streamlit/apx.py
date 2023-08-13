import streamlit as st
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Generate dummy data
np.random.seed(42)
dates = pd.date_range(start="2023-01-01", periods=90, freq="D")
buying_prices = np.random.uniform(5, 15, 90)
selling_prices = buying_prices + np.random.uniform(-2, 2, 90)

data = {
    "Date": dates,
    "Buying Price": buying_prices,
    "Selling Price": selling_prices,
}
df = pd.DataFrame(data)

# Streamlit dashboard
st.title("Electricity Trading Dashboard")

# Display the dummy data
st.subheader("Dummy Electricity Price Data for 90 Days")
st.dataframe(df, use_container_width=True)

# Convert dates to strings for slider labels
date_strings = [date.strftime("%d %b %Y") for date in dates]

# Create number range sliders for date range selection
start_idx, end_idx = st.slider(
    "Select a Date Range",
    0, len(dates) - 1,
    (0, len(dates) - 1)
)

# Filter data based on selected date range
filtered_df = df.iloc[start_idx:end_idx + 1]

# Create line chart for Buying Price with slider
st.subheader("Price Trends")
st.write("Buying Price Trend")
st.area_chart(filtered_df.set_index("Date")["Buying Price"])

# Create line chart for Selling Price with slider
st.write("Selling Price Trend")
st.area_chart(filtered_df.set_index("Date")["Selling Price"])

# Calculate and display statistics
st.subheader("Statistics")
average_buying_price = filtered_df["Buying Price"].mean()
average_selling_price = filtered_df["Selling Price"].mean()
# st.write(f"Average Buying Price: {average_buying_price:.2f}")
# st.write(f"Average Selling Price: {average_selling_price:.2f}")

col1, col2 = st.columns(2)
col1.metric("Avg. Buying Price",average_buying_price , "-1.2%")
col2.metric("Avg. Selling Price", average_selling_price, "+2%")
# col3.metric("Humidity", "86%", "4%")
