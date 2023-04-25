---
title: "02 - Working On Iris Dataset"
draft: false
---

Used modules:
```Python
from sklearn.datasets import load_iris # dataset
import statistics # calculation of mean values
from sklearn.model_selection import train_test_split # split sets
import numpy as np # searching for unique values and their number
from matplotlib import pyplot as plt # data display
```

Loading the dataset into a variable:
```Python
iris = load_iris() # load dataset into variable
print(iris.keys()) # display all dataset keys

target = iris.target
data = iris.data # u var pohranjujemo podatke za svaki cvijet
```

Calculation of mean, maximum and minimum values:
```Python
# calculation of mean value, maximum value and minimum value:
print(f"Mean value of the first column: {statistics.mean(data[:, 0])}")
print(f"Maximum value in second column: {max(data[:, 1])}")
print(f"Minimum value in the fourth column: {min(data[:, 3])}")
```

Data retrieval:
```Python
# retrieve data:  
print(f"Display data about the first flower and its type:\n {data[0], target[0], iris.target_names[0]}")  
print(f"Display data about 2nd and 5th flower:\n {data[[1, 4][:]]}")  
  
# Training set and test set:  
train_x1 = data[::2, ]  # all columns, every other row  
train_y1 = target[::2]  
test_x1 = data[1::2, ]  # every other line starting from the second element  
test_y1 = target[1::2]  
  
train_x2 = data[::3, ]  # every third be for training  
train_y2 = target[::3]  
test_x2 = data[9::4, ]  # every third, starting from the ninth  
test_y2 = target[9::3]
```

Displaying the dimensionality of the data in the list using the `shape` function:
```Python
# Display the data prepared in the variable and the test set and the training set:  
print(f"Number of data in training set for x2: {train_x2.shape[0]}")  
print(f"Number of data in test set x2: {test_x2.shape[0]}")  
print(f"Total data (flowers) in set iris: {len(data)}")
```

## Division of the set into training and testing
```Python
X_train, x_test, Y_train, y_test = train_test_split(data, target, test_size=0.33, random_state=42)  
print(f"Number of data in training set X: {X_train.shape[0]}")  
print(f"Number of data in test set x: {x_test.shape[0]}")  
print(f"Number of data in test set Y: {Y_train.shape[0]}")  
print(f"Number of data in test set y: {y_test.shape[0]}")
```

## Display unique data
```Python
# values -eq target_names and counts -eq to how many:
values, counts = np.unique(Y_train, return_counts=True)  
print(values, counts)```

## Display of data on a graph
Pie chart:
```Python
# display pie chart:
target_names = iris.target_names  
plt.title("pie plot example")  
plt.pie(counts, labels=target_names, colors=['c', 'g', 'y'], autopct = '%1.2f%%')  
plt.show()
```

Graph:
```Python
# display plot for first 20 flowers for every collumn:  
plt.title("Plot: ")  
for i in range(0, data.shape[1]):  
     plt.plot(data[:19:3, i], label=iris.feature_names[i]) # from 0 to 19, step 3 and for every collumn  
plt.legend(loc=('upper right'))  
plt.show()
```