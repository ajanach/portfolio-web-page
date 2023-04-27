---
title: "09 - Extras"
draft: false
---

# Examples of Clustering in Real Life

1.  **Market Segmentation**: Companies can use clustering techniques to group customers based on their purchasing behavior or preferences. By segmenting customers into different groups, companies can tailor their marketing strategies to target each group more effectively.

2.  **Image Segmentation**: Clustering can be used in image processing to segment images into different regions based on similarities in color, texture, or other features. This can be useful in various applications, such as object recognition, medical imaging, and remote sensing.

3.  **Recommendation Systems**: Clustering can be used to group similar items or products based on customer preferences, ratings, or purchase history. This information can then be used to recommend products or services to customers who are likely to be interested in them.

4.  **Genomic Analysis**: Clustering techniques are widely used in bioinformatics to group genes or proteins based on their expression patterns or other characteristics. This can help researchers identify genes or proteins that are involved in specific biological processes or diseases, and develop targeted therapies or treatments.

# Examples Of Linear Regression in Real Life

1.  Sales Forecasting: Linear Regression is widely used in business to predict future sales based on historical data. It helps companies to plan inventory and resources, make informed decisions, and avoid overstocking or understocking.

2.  Medical Research: Linear Regression is used to study the relationship between two or more variables in medical research. For example, it can be used to analyze the effect of a particular drug on a disease or the impact of lifestyle changes on health outcomes.

3.  Real Estate: Linear Regression is used to predict the price of a property based on its characteristics, such as location, size, number of rooms, and other amenities. This information can be used by buyers and sellers to make informed decisions about buying and selling properties.

4.  Weather Forecasting: Linear Regression is used in weather forecasting to predict temperature, humidity, precipitation, and other weather variables. It helps weather forecasters to provide accurate and timely information to the public and help them make informed decisions.

# Working With Images

```Python
import cv2  
from google.colab.patches import cv2_imshow  
from google.colab import drive  
  
# mount gDrive in VM  
drive.mount('/gdrive')  
  
# downloading the image to the desired path in gDrive  
!curl -o /gdrive/MyDrive/SDU/test/flower-2.jpg https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg  
  
# load and display the image:  
image = cv2.imread("/gdrive/MyDrive/SDU/test/flower-2.jpg")  
cv2_imshow(image)  
  
# image height, width and depth:  
v, s, d = image.shape  
print(f"Image height, width and depth: {image.shape}")  
  
# get pixels:  
px = image[150, 130]  
print(f"Retrieved pixels: {px}")  
  
# blue, green and red - RGB mode  
image[150, 130] = image[0, 0, 0]  
image[100:115, 100:110] = [0, 255, 255]  
# cv2_imshow(image)  
  
# resizing the image and converting the image to grayscale  
image_new = image  
image_new = cv2.resize(image_new, (int(s*2), int(v/3)))  
image_new = cv2.cvtColor(image_new, cv2.COLOR_BGR2GRAY)  
  
print(f"Height, width and depth of new image: {image_new.shape}")  
cv2_imshow(image_new)
```

## K-means And Images

Displaying picture segmented into 3 images by 3 clusters:

```Python
# K-means for original image  
# defining model: (we want to show picture in 3 colors and that's why we use 3 clusters):  
kmeans = KMeans(n_clusters=3, random_state=42, n_init="auto")  
  
# model training:  
data = image.reshape(-1, 3)  
kmeans.fit(data)  
print(f"Coordinates of centroids: \n{kmeans.cluster_centers_}")  # show coordinates of centroids  
  
segmentedImage = kmeans.cluster_centers_[  
    kmeans.labels_]  # for display, picture need to be in int or float from 0 to 1  
segmentedImage = segmentedImage / 255  # converting to float (first way)  
# segmentedImage = segmentedImage.astype(int) # converting to int (seconde-way)  
  
imageInColor = segmentedImage.reshape(image.shape)  # reeshape image to image.shape like we are previous do  
plt.imshow(imageInColor)
```

# Multivariat Linear Regression

Reidual and using 150 of data, and predicting for 11th house and calculating residual.

```Python
from sklearn import datasets    
import numpy as np    
import matplotlib.pyplot as plt    
from sklearn.linear_model import LinearRegression # for linear regression  from sklearn.metrics import mean_squared_error # for mean squared error  
  
# save dataset into variable  dataset = datasets.fetch_openml('house_sales', version = 3)  
print(dataset.keys())  
print(dataset.feature_names)  
print(dataset.target_names)  
  
# we are using dataset from fetch_openml so we need to convert it from pandas to numpy  data = np.array(dataset.data)    
  
price = np.array(dataset.target[:150]) # dependend  
number_bedrooms = data[:150, 0] # independend  
number_bathrooms = data[:150, 1] # independend  
number_sqft_living = data[:150, 2] # independend  
number_sqft_lot = data[:150, 3] # independend  
  
X = np.array([number_bedrooms, number_bathrooms, number_sqft_living, number_sqft_lot]).T  
y = price  
  
lin_reg = LinearRegression().fit(X, y) # train model of linear regression  
  
# make predictions using the testing set  
y_pred = lin_reg.predict(X)  
  
print(f"Score for linear regression: {lin_reg.score(X, y)}")  
  
# predicting for data on index 20  price_11 = (y[11]) # 20 is presenting 21 person    got_price = round(y_pred[11], 2) #round to 2 decimals  residual_11 = round(abs(price_11 - got_price), 2)    
print(f"Residual is: {residual_11}.")
```

Linear Regression coefficient, predicting for 11th house price and calculating residual, but here is used whole dataset.
Coefficient of determination is: 0.50 (given with lin_reg.score(X, y))
Residual for 11th house is: 139140 which is higher than using 150 samples of data. 
Model is not better.

And here is an example of custom predicting, using custom data.

```Python
from sklearn import datasets    
import numpy as np    
import matplotlib.pyplot as plt    
from sklearn.linear_model import LinearRegression # for linear regression  from sklearn.metrics import mean_squared_error # for mean squared error  
  
# save dataset into variable  dataset = datasets.fetch_openml('house_sales', version = 3)  
print(dataset.keys())  
print(dataset.feature_names)  
print(dataset.target_names)  
  
# we are using dataset from fetch_openml so we need to convert it from pandas to numpy  data = np.array(dataset.data)    
  
price = np.array(dataset.target) # dependend  
number_bedrooms = data[:, 0] # independend  
number_bathrooms = data[:, 1] # independend  
number_sqft_living = data[:, 2] # independend  
number_sqft_lot = data[:, 3] # independend  
  
X = np.array([number_bedrooms, number_bathrooms, number_sqft_living, number_sqft_lot]).T  
y = price  
  
lin_reg = LinearRegression().fit(X, y) # train model of linear regression  
  
# make predictions using the testing set  
y_pred = lin_reg.predict(X)  
  
print(f"Score for linear regression: {lin_reg.score(X, y)}")  
print(f"Coefficient of linear regression: {lin_reg.coef_}") # print coefficient of linear regression, and this is slope of the line    
# predicting for 11th house  
price_11 = (y[11])  
got_price = round(y_pred[11], 2)  
residual_11 = round(abs(price_11 - got_price), 2)    
print(f"Residual is: {residual_11}.")  
  
# custom prediction:  
custom_data = np.array([4, 3, 4500, 6500]).reshape(1, -1)  
custom_prediction = lin_reg.predict(custom_data) # predicting for x  print(f"Cusom prediction: {custom_prediction}")
```
