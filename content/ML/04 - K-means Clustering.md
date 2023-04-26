
---
title: "04 - K-means Clustering"
draft: false
---

# Intro
In unsupervised machine learning, clustering is a popular technique used to group similar data points. One of the most widely used clustering algorithms is K-means. K-means is a centroid-based clustering algorithm that partitions data points into k distinct clusters. In this blog post, we will explore the K-means algorithm and its implementation in Python using the scikit-learn and yellowbrick libraries. We will cover how to train the model, predict clusters, find centroids, and visualize the results using scatter plots, silhouette visualizations, and K-elbow methods. We will also determine the best score for a range of n clusters. So, let's get started!

## K-means Important Links

- [https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html)
- [https://scikit-learn.org/stable/modules/generated/sklearn.metrics.silhouette_score.html](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.silhouette_score.html)
- [https://www.scikit-yb.org/en/latest/api/cluster/silhouette.html](https://www.scikit-yb.org/en/latest/api/cluster/silhouette.html)
- [https://www.scikit-yb.org/en/latest/api/cluster/elbow.html](https://www.scikit-yb.org/en/latest/api/cluster/elbow.html)

## Important Code Snippets
- Mounting Google Drive in your VM
- Downloading files to your local file system
- Open files from your local file system
- Showing CV2 Images

## Used Moules:

```Python
import numpy as np
from matplotlib import pyplot as plt
from sklearn.cluster import KMeans # k-means from sklearn.cluster.KMeans
from yellowbrick.cluster import SilhouetteVisualizer # for silhouette visualizer
from sklearn import metrics # for silhouette score  
from yellowbrick.cluster import KElbowVisualizer # for k-elbow  
```

## Train, Predict, Centroids, Visualizations (Scatter, Silhouette and K-elbow) On Generated Random Numbers

```Python
# generating random 50 dots from 1 to 500 in 2 dimensions
data = np.random.randint(1, 500, (50, 2)) # 50 rows with 2 collumns contains random integers between 1 and 500
data

# random_state - set.seed(42)
kmeans = KMeans(n_clusters=3, random_state=42, n_init="auto")

# function for training:
kmeans.fit(data)

# function for predicting:
group = kmeans.predict(data) 
print(kmeans.predict([[297, 103]])) # we can predict wanted value

# get coordinates of centroids: 
centroids = kmeans.cluster_centers_
print(centroids)

# graphical visual of data and centroids: 
plt.scatter(data[:, 0], data[:, 1], c=group) # all data from 1st to seconde collumn
plt.scatter(centroids[:, 0], centroids[:, 1], marker = "X", s = 200)
plt.show()

# silhouette visualizer:
visualizer = SilhouetteVisualizer(kmeans, colors='yellowbrick')
visualizer.fit(data)
visualizer.show() # silhouette coefficient (or score), it's best value is closer to 1

# Instantiate the KElbowVisualizer with the KMeans model and the range of cluster values to test || k=(range of n clusters) to test
# Used to determine the optimal number of clusters in the data
visualizer = KElbowVisualizer(kmeans, k=(4,12))
visualizer.fit(data)
visualizer.show
```

## Determin Best Score For Range Of N Cluster

```Python
import numpy as np  
from matplotlib import pyplot as plt  
from sklearn.cluster import KMeans # k-means from sklearn.cluster.KMeans  
from yellowbrick.cluster import SilhouetteVisualizer # for silhouette visualizer  
from sklearn import metrics # for silhouette score  
from yellowbrick.cluster import KElbowVisualizer # for k-elbow  
  
data = np.random.randint(1, 500, (50, 2)) # 50 rows with 2 collumns contains random integers between 1 and 500  
  
def get_best_score(input_cluster_from, input_cluster_to, input_data):  
  max_score = 0 # define max_score variable  
  cluster_number = 0 # define cluster_number variable  
  scores = [] # saving scores of each cluster number  
  cluster_number_loop = [] # saving cluster number by number from for loop  
  
  for i in range(input_cluster_from, input_cluster_to + 1): # plus 1 because last one number is excluded  
    print(f'Number of cluster: {i}')  
    kmeans = KMeans(n_clusters=i, random_state=42, n_init="auto")  
    kmeans.fit(input_data)  
    group = kmeans.fit_predict(input_data) # možemo predviđati i za našu željenu vrijednost  
    score = metrics.silhouette_score(input_data, group, metric='euclidean')  
    print(f'Solhouette score: {score:.3f}')  
    scores.append(score)  
    cluster_number_loop.append(i)  
  
    if score > max_score:  
      max_score = score  
      cluster_number = i  
  
  print(f'Best score is for {cluster_number} klastera and score is {max_score:.3f}')  
  plt.plot(cluster_number_loop, scores)  
  plt.show()  
  
get_best_score(2, 6, data)
```

## More Silhouette Visualizations

```Python
data = np.random.randint(1, 500, (50, 2)) # 50 rows with 2 collumns contains random integers between 1 and 500  
  
def more_silhouette_visualizations(input_cluster_from, input_cluster_to, input_data):  
  for i in range(input_cluster_from, input_cluster_to + 1):  
    kmeans = KMeans(n_clusters=i, random_state=42, n_init="auto")  
    visualizer = SilhouetteVisualizer(kmeans, colors='yellowbrick')  
    visualizer.fit(data)  
    group = kmeans.predict(data)   
    visualizer.show() # čitanje podataka i vizualizacija podatak iz to visualizera  
    print(metrics.silhouette_score(input_data, group))  
  
more_silhouette_visualizations(2, 6, data)
```