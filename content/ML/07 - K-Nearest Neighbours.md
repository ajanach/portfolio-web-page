---
title: "07 - K-Nearest Neighbours"
draft: false
---

# Intro
Are you interested in machine learning and classification? The K-Nearest Neighbours algorithm, or KNN for short, is a simple yet effective algorithm used for classification tasks. In this blog post, we'll dive into KNN's implementation in Python, specifically in the scikit-learn library. We'll cover the necessary modules used, mounting Google Drive in our virtual machine, training and testing the model, calculating its accuracy, making predictions, interpreting confusion matrix values, and using other metrics such as precision and recall. Whether you're a beginner or an experienced machine learning practitioner, this post will give you a solid understanding of KNN and how it can be used for classification tasks.

## Important Code Snippets
- Mounting Google Drive in your VM
- Downloading files to your local file system
- Open files from your local file system
- Showing CV2 Images

## Modules Used

```Python
from google.colab import drive # for mounting gDrive in our VM
from sklearn import datasets # for loading dataset
from sklearn.model_selection import train_test_split # for split train test  
from sklearn.neighbors import KNeighborsClassifier # K-Nearest neighbours KNN  
from sklearn.metrics import confusion_matrix # for confustion matrix
from sklearn.metrics import precision_score, recall_score, average_precision_score, f1_score  
from sklearn.metrics import classification_report  
import matplotlib.pyplot as plt
```

## Mounting gDrive In Our VM

```Python
# mounting gDrive in our VM  
drive.mount('/gdrive')
```

## Train, Accuracy, Prediction, Confusion Matrix For K-Nearest Neighbours

```Python
# load dataset  
iris = datasets.load_iris()   
iris.keys() # everything that dataset hold  
iris.target # classes  
iris.target_names # classes name  
iris.data # data  
iris.feature_names # features names  
  
x = iris.data  
y = iris.target  
  
# train test split  
# splitting x on 50% 50% and y on 50% 50%  
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = 0.5, random_state = 42) # X -> data and Y -> target  
  
# train model  
modelKNN = KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train) # n_neighbours which 3 neighbours model is looking  
  
modelKNN.classes_ # we can see what classes we have in there  
modelKNN.effective_metric_ # display what effectiv metric we use for calculating nearest neighbours  
  
# accuracy  
print(f"Accuracy: {modelKNN.score(X_test, y_test)}")  
  
# prediction  
y_predict_KNN = modelKNN.predict(X_test)  
  
classes = {0: 'setosa', 1: 'versicolor', 2: 'virginica'} # we give name to our classes  
print(f"For first flower from test set prediction is class: {classes[y_predict_KNN[0]]}, real class is: {classes[y_test[0]]}")  
  
# confusion matrix:  
print(f"Values from confusion matrix: \n{confusion_matrix(y_test, y_predict_KNN)}") # prouči output
```

## Interpret Confustion Matrix Values

**This is a Multi-Class Confusion Matrix** where rows are **PREDICTED** and where collumns are **ACTUAL**
For example:
```Shell
[[29  0  0]
 [ 0 23  0]
 [ 0  2 21]]
```

Interpretation:
```Shell
# setosa, versicolor, virginica
[[29  0  0] # setosa
 [ 0 23  0] # versicolor
 [ 0  2 21]] # virginica
```

- For setosa model predicted all of them
- For versicolor model predicted all of them
- For virginica model predicted 21 but missed 2 samples of versicolor

A confusion matrix is a table that is often used to describe the performance of a classification model on a set of test data for which the true values are known.

In this example, the confusion matrix has three rows and three columns representing the actual and predicted class labels. The rows represent the actual or ground truth classes, and the columns represent the predicted classes.

-   The first row and column are for the first class, where 29 samples were correctly predicted as the first class, and there were no false positives or false negatives.

-   The second row and column are for the second class, where 23 samples were correctly predicted as the second class, and there were no false positives or false negatives.

-   The third row and column are for the third class, where 21 samples were correctly predicted as the third class, and there were two false positives (samples that were predicted as the third class, but actually belong to the first or second class).

## Other Metrics And Classification Report

```Python
# other metrics:  
print(precision_score(y_test, y_predict_KNN, average = None)) # precision score  
print(recall_score(y_test, y_predict_KNN, average = None)) # recall score  
print(f1_score(y_test, y_predict_KNN, average = None)) # f1 score

print(classification_report(y_test, y_predict_KNN, target_names=iris.target_names)) # all that you need for metrics
```

### Precision and Recall

There is often a trade-off between precision and recall, meaning that optimizing one metric can negatively affect the other. For example, if a model becomes more conservative in its predictions and only predicts positive when it is very confident, it may increase its precision but lower its recall. On the other hand, if a model becomes more liberal in its predictions and predicts more positives, it may increase its recall but lower its precision.

### Confusion Matrix - Binary

In the context of binary classification, a confusion matrix is a table that is used to evaluate the performance of a classification model. The matrix displays the number of actual positive and negative samples, and the number of samples that are predicted as positive and negative by the model. The four values in the confusion matrix are:

-   True Positive (TP): the number of samples that are actually positive and are correctly predicted as positive by the model.
-   False Positive (FP): the number of samples that are actually negative but are incorrectly predicted as positive by the model.
-   True Negative (TN): the number of samples that are actually negative and are correctly predicted as negative by the model.
-   False Negative (FN): the number of samples that are actually positive but are incorrectly predicted as negative by the model.

The confusion matrix helps in evaluating the performance of a binary classification model by comparing the predicted output with the actual output. It provides a more detailed picture of the performance of a model than just looking at overall accuracy. The accuracy of a model can be misleading in situations where there is a class imbalance, and the majority class can have a high accuracy even when the model is not performing well on the minority class. In such situations, the precision and recall values can be more informative.

-   Precision: Precision measures the proportion of true positives among the total samples that the model has predicted as positive. It is calculated as TP / (TP + FP). A high precision indicates that the model is making fewer false positive predictions.
-   Recall: Recall measures the proportion of true positives among the actual positive samples. It is calculated as TP / (TP + FN). A high recall indicates that the model is correctly identifying more positive samples.

|              | Actual Positive | Actual Negative |
|:------------:|:---------------:|:---------------:|
|**Predicted Positive**| True Positive   | False Positive  |
|**Predicted Negative**| False Negative  | True Negative   |


## Extra - Finding Model With Best Accuracy

```Python
# Define empty lists to store model accuracies and number of neighbors  
differentModels = []  
numberOfNeighbours = []  
  
# Loop through a range of values for number of neighbors  
for i in range(1, 21):  
    # Create a KNN model with i neighbors and fit it to the training data  
    modelKNN = KNeighborsClassifier(n_neighbors=i).fit(X_train, y_train)  
  
    # Append the accuracy score and number of neighbors to their respective lists  
    differentModels.append(modelKNN.score(X_test, y_test))  
    numberOfNeighbours.append(i)  
  
# Plot the different accuracy scores for each number of neighbors  
plt.plot(range(1, 21), differentModels)  
plt.show()  
  
# Find the max accuracy and print the corresponding number of neighbors  
maxAccuracy = max(differentModels)  
print("Model with the highest accuracy:")  
for i in range(len(differentModels)):  
    if maxAccuracy == differentModels[i]:  
        print(f"Maximum accuracy: {maxAccuracy}, number of neighbors: {numberOfNeighbours[i]}")
```