---
title: "05 - K-means Clustering Pixels & Hierarchy Clustering"
draft: false
---

# Intro
In machine learning, clustering is a technique that involves grouping similar data points into groups or clusters. There are several clustering algorithms available, but in this blog post, we will explore two popular techniques: K-means Clustering and Hierarchical Clustering.

## Important Code Snippets
- Mounting Google Drive in your VM
- Downloading files to your local file system
- Open files from your local file system
- Showing CV2 Images

## Used Modules

```Python
import numpy as np  
from matplotlib import pyplot as plt  
from matplotlib.image import imread # for read image from gDrive
from sklearn.cluster import KMeans # for k-means clustering
from scipy.spatial.distance import pdist 
from scipy.cluster.hierarchy import dendrogram, linkage, fcluster
```

We will use NumPy and Matplotlib for data processing and visualization, Sklearn for K-means clustering, and Scipy for hierarchical clustering.

## Group Image In 3 Clusters, By 3 Colors

We will start by exploring K-means clustering on an image. Here is the code that groups the image into three clusters, by three colors:

```Python
drive.mount('/gdrive') # mount gdrive  
  
image = imread("/gdrive/MyDrive/SDU/V5_materijali/konj1.jpg")  
image.shape  
  
# for image we need to create 3D vector:  
data = image.reshape(-1, 3)  
  
# defining model: (we want to show picture in 3 colors and that's why we use 3 clusters):  
kmeans = KMeans(n_clusters=3, random_state=42, n_init="auto")  
  
# model training:  
kmeans.fit(data)  
print(f"Coordinates of centroids: \n{kmeans.cluster_centers_}") # show coordinates of centroids  
  
segmentedImage = kmeans.cluster_centers_[kmeans.labels_] # for display, picture need to be in int or float from 0 to 1  
segmentedImage = segmentedImage / 255 # converting to float (first way)  
# segmentedImage = segmentedImage.astype(int) # converting to int (seconde-way)  
  
imageInColor = segmentedImage.reshape(image.shape) # reeshape image to image.shape like we are previous do  
plt.imshow(imageInColor)
```

In the first line of code, we mount the Google Drive, where we store the image. The `imread()` function is used to read the image into a NumPy array. The shape of the image is printed to the console. We then reshape the image into a 3D vector, where each pixel is represented as a point in 3D space (R, G, B). We define the K-means model with three clusters, and we train it on the data. The `cluster_centers_` attribute is used to obtain the coordinates of the centroids for each cluster. Finally, we create a new image by mapping each pixel to its nearest centroid and display it using the `imshow()` function.

## Group image By n Clusters, By n Colors

Now we will explore K-means clustering on the same image, but this time we will group it into different numbers of clusters, by different numbers of colors. Here is the code:

```Python
# Image in n wanted colors  
nColors = [10, 8, 6, 4, 2]  
segmentedImages = [] # saving segmented images in slice  
for color in nColors:  
    kmeans = KMeans(n_clusters=color, random_state=42, n_init="auto")  
    kmeans.fit(data)  
    segmentedImage = kmeans.cluster_centers_[kmeans.labels_]  
    segmentedImage = segmentedImage.astype(int)  
    slikaUBoji = segmentedImage.reshape(image.shape)  
    segmentedImages.append(slikaUBoji)  
  
# first we need to show display picture  
plt.subplot(2, 3, 1) # 2 rows, 3 columns in first position  
plt.imshow(image)  
plt.title("Original")  
  
# now we are displaying other 5 images  
i = 2 # postion of image  
color = 0  
for redak in segmentedImages:  
  plt.subplot(2, 3, i)  
  plt.imshow(redak)  
  plt.title(f"Color/cluster: {nColors[color]}")  
  i += 1  
  color += 1  
plt.show()
```

# Hierarcy Clustering

```Python
from google.colab import drive  
import numpy as np    
from matplotlib import pyplot as plt    
from matplotlib.image import imread # for read image from gDrive  
from sklearn.cluster import KMeans # for k-means clustering  
from scipy.spatial.distance import pdist # for hierarcy clustering  
from scipy.cluster.hierarchy import dendrogram, linkage, fcluster # for hierarcy clustering  
  
data = np.array([[2, 2], [15, 4], [2, 3], [4,5 ], [5, 5], [20,4], [22, 7], [17, 7], [20, 10], [3, 3]])  
  
# display data:  
# plt.scatter(podaci[:, 0], podaci[:, 1])  
# plt.show()  
  
# calculating distances:  
distances = pdist(data)  
distances.shape # we can see 45 of them  
  
# running hierarcy grouping:  
tree = linkage(distances)  
dendrogram = dendrogram(tree) # display dendrogram  
plt.show()  
  
from scipy.cluster.hierarchy import dendrogram  
# tree cutting:  
by_distance = fcluster(tree, 3, criterion = 'distance')  
cut_tree = dendrogram(linkage(by_distance.reshape(-1, 1), method='ward'))  
plt.show()  
  
# If u want to display scatter:  
plt.scatter(data[:, 0], data[:, 1], c = by_distance)  
plt.show()  
  
from scipy.cluster.hierarchy import dendrogram  
# tree cutting by number of clusters:  
by_number_clusters = fcluster(tree, 3, criterion = 'maxclust')  
cut_tree = dendrogram(linkage(by_number_clusters.reshape(-1, 1), method='ward'))  
plt.show()
```