---
title: "08 - Logisitcal Regression"
draft: false
---

# Intro

## Modules Used

```Python
import numpy as np  
import matplotlib.pyplot as plt  
from sklearn.datasets import fetch_openml  
from sklearn.model_selection import train_test_split  
from sklearn.linear_model import LogisticRegression  
from sklearn.metrics import classification_report  
from sklearn.metrics import confusion_matrix # za matricu konfuzije
```

## Load Mnist Dataset Version 1 And Displaying First Image With Number

```Python
# load dataset  
dataset = fetch_openml('mnist_784', version = 1) # watchout to fetch correct version

# dataset specs  
dataset.keys() # all what dataset holds  
dataset.data.shape # 70000 slika i 784 značajaka - značajke: težina, visina, za slike bi to bili pixeli  
dataset.data  
dataset.target  
  
# again if we are using dataset from openml we need to convert it from pandas to numpy  
data = np.array(dataset.data)  
  
# display first picture  
first_number_image = data[0]  
first_number_image = first_number_image.reshape(28, 28)  
plt.imshow(first_number_image, cmap = 'gray')  
plt.show()  
  
# we can check if is it really about number 5  
dataset.target[0]  
```

## Define X and Y, Train Test Split, Train Model, Accuracy, Classification Report, Confusion Matrix

```Python
# data saved in x and targets are saved in y  
# defining x and y by using 1000 of samples  
x = np.array(dataset.data[0:1000]) / 255 # we are dividing by 255 to normalize  
  
# idemo normalizirati podatke, brže izvođenje, predprocesuiranje, biti će od 0 do 1  
y = np.array(dataset.target[0:1000])  
  
# edit data that we have binary classification  
y[np.where(y != '5')] = 0 # where is differend from 5 let be 0  
y[np.where(y == '5')] = 1 # where is equal to 5 let be 1  
y = y.astype(int)  
y  
  
# train test split  
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = 0.3, random_state = 42)  
X_train.shape # check  
  
# logistička regresija:  
model_logR = LogisticRegression()  
model_logR.fit(X_train, y_train)  
  
# accuracy:  
y_score_logR = model_logR.score(X_test, y_test)  
print(y_score_logR) # accuracy or score  
  
# classification report  
y_predict_logR = model_logR.predict(X_test)  
print(classification_report(y_test, y_predict_logR))  
  
# cofusion matrix  
print(confusion_matrix(y_test, y_predict_logR))  
```

## Display Wrong Classified Images

```Python
# display model  
misclassified_index = []  
for i in range(y_test.shape[0]):  
  if y_test[i] != y_predict_logR[i]:  
    misclassified_index.append(i)  
  
print(f"misclassified_index (images that are classified wrong): {misclassified_index}")  
  
# display wrong classified images  
for i, index in enumerate(misclassified_index[0:5]):  
  plt.subplot(1, 5, i+1)  
  plt.imshow(X_test[misclassified_index[i]].reshape(28, 28))  
  
# # Extra - we can display pictures in 2 rows by 7 collumns for first 14  
# for i, index in enumerate(misclassified_index[0:13]):  
#   plt.subplot(2, 7, i+1) # number of rows, collumns and position of picture  
#   plt.imshow(X_test[misclassified_index[i]].reshape(28, 28))
```

