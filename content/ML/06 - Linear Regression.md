---
title: "06 - Linear Regression"
draft: false
---

# Intro

In this blog post titled "06 - Linear Regression," the author explores the concept of linear regression and how it can be applied to real-world data. The post begins by fetching a dataset and converting it from pandas to numpy. The author then selects the independent and dependent variables and converts them from imperial to metric units. Next, a scatter plot of the data is displayed, followed by the training of a linear regression model. The author prints out the coefficient and intercept of the linear regression line and predicts on given values, calculates residuals, and the mean squared error. Finally, the author removes outliers and displays a new scatter plot of the data without outliers, including a new linear regression line. This post is ideal for anyone looking to learn about linear regression and how it can be applied to real-world data.

## Important Code Snippets
- Mounting Google Drive in your VM
- Downloading files to your local file system
- Open files from your local file system
- Showing CV2 Images

## Modules used

```Python
from sklearn import datasets  
import numpy as np  
import matplotlib.pyplot as plt  
from sklearn.linear_model import LinearRegression # for linear regression  
from sklearn.metrics import mean_squared_error # for mean squared error
```

## Linear Regression, Coefficient, Intercept, Prediction And Score

```Python
# save dataset into variable  
dataset = datasets.fetch_openml('bodyfat')  
  
# we are using dataset from fetch_openml so we need to convert it from pandas to numpy  
data = np.array(dataset.data)  
data.shape  
  
weight = data[:, 2] # dependend variable  
height = data[:, 3] # independend variable  
  
# covert weight and height from imperial to metric  
weight *= 0.46  
height *= 2.54  
  
x = height  
y = weight  
  
# display data on graph  
plt.scatter(x, y)  
plt.xlabel('Height in cm')  
plt.ylabel('weight in kg')  
plt.xlim(150, 205) # set the limit of x-axis between 150 and 205 cm  
plt.ylim(50,130) # set the limit of y-axis between 50 and 130 kg  
plt.grid()  
plt.show()  
  
x.shape # outputs (252, )  
x = x.reshape(-1, 1) # array is reshaped to have a single column and the number of row is inferred from 1D array to 2D array  
x.shape # outputs (252, 1), so we got 2D array  
  
lin_reg = LinearRegression().fit(x, y) # train model of linear regression  
print(f"Coefficient of linear regression: {lin_reg.coef_}") # print coefficient of linear regression, and this is slope of the line  
print(f"Place where linear regression crossing x-os: {lin_reg.intercept_}") # represent place where the linear regression line crosses the x-axis  
  
y_prediction = lin_reg.predict(x) # predicting for x  
  
print(f"Score for linear regression: {lin_reg.score(x, y)}")
```

## Predicting on Given Value And Calculating Residual

```Python
# predicting for data on index 20  
height_21 = (x[20, 0]) # 20 is presenting 21 person  
real_weight_21=y[20]  
got_weight = round(y_prediction[20], 2) #round to 2 decimals  
print(f"21. person in dataset have height of {height_21} cm, real weight is {real_weight_21} kilograma, weight got by linear regression {got_weight} kg.")

# calculating residual and mean squared error:
residual_21 = round(abs(real_weight_21 - got_weight_21), 2)  
print(f"Residual for person 21. is: {residual_21} kg.")
print(f"Mean squared error for LR: {mean_squared_error(y, y_predict)}")

# predict for unknown value:  
lin_reg.predict([[180]])
```

## Display Scatter Plot

```Python
# scatter plot sa početnom vrijednošću pravca LR  
plt.scatter(x,y)  
plt.plot(x, y_prediction, 'r')  
plt.xlabel('height in cm')  
plt.ylabel('weight in kg')  
plt.xlim(150, 205) # we can use that limit or we can comment that  
plt.ylim(50, 130) # we can use that limit or we can comment that  
plt.grid()  
plt.show()
```

## Remove Outliers and Displaying New Scatter - Important Code

```Python
# removing outliers  
out_x = np.where(x < 150)  
out_y = np.where(y > 120)  
print("Outliers for x: ", out_x)  
print("Outlieri for y: ", out_y)  
  
out_indeks = [38,40,41]  
  
x_new = np.delete(x, out_indeks)  
x_new = x_new.reshape(-1,1)  
y_new = np.delete(y, out_indeks)  
  
reg_new = LinearRegression().fit(x_new, y_new)  
print(f"Score for new linear regression: {reg_new.score(x_new, y_new)}")  
  
y_pred_new = reg_new.predict(x_new)  
  
# displaying new graph for linear regression withouth outliers  
plt.scatter(x_new, y_new)  
plt.plot(x, y_prediction, 'g') # old line  
plt.plot(x_new, y_pred_new, 'r') # new line  
plt.xlabel('Heigh in cm')  
plt.ylabel('Weight in kg')  
plt.xlim(150, 205)  
plt.ylim(40, 130)  
plt.grid()  
plt.show()  
  
print(f"Mean squared error for new LR line: {mean_squared_error(y_new, y_pred_new)}")
```

