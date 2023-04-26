---
title: "Exploring Olivetti Faces and Generating Numbers: A Data Analysis Journey"
draft: false
---

# Intro

In the world of data analysis, exploring diverse datasets and understanding their patterns and visual representations is crucial. In this blog post, we will embark on an exciting journey of analyzing the Olivetti Faces dataset, a collection of facial images, and delve into generating random numbers for further analysis. We will utilize Python and several powerful modules, such as `sklearn`, `numpy`, and `matplotlib`, to accomplish these tasks.

Olivetti Faces: Firstly, we will start by loading the Olivetti Faces dataset using the `fetch_openml` function. Since the data is initially in a pandas format, we will convert it into an array format using NumPy. The dataset consists of facial images, and we will display the first image as well as a subset of images using subplots. By visualizing these images, we can gain insights into the dataset's content and characteristics.

Generating Numbers: Next, we will shift our focus to generating random numbers. With the help of NumPy, we can easily generate arrays containing integers or floating-point numbers within specified ranges. We will explore different methods, such as generating random integers, uniform floating-point numbers, and two-dimensional coordinate systems. Through code examples and visualizations, we will observe the distribution and patterns of these generated numbers.

Data Visualization: To gain a better understanding of the generated numbers, we will utilize the versatile plotting capabilities of Matplotlib. We will plot the generated numbers, showcasing their distribution and relationships. By creating scatter plots and customizing the visualizations, we can uncover valuable insights and patterns hidden within the data.

Join us on this captivating journey as we explore the Olivetti Faces dataset, generate random numbers, and visualize our findings. By the end of this blog post, you will have gained valuable knowledge and practical experience in data analysis and visualization using Python. Let's dive in and unlock the potential of these intriguing datasets!

## Important Code Snippets
- Mounting Google Drive in your VM
- Downloading files to your local file system
- Open files from your local file system
- Showing CV2 Images

## Olivetti Faces

Modules used:
```Python
from sklearn import datasets
import numpy as np
from matplotlib import pyplot as plt
```

Everything downloaded from openML needs to be converted from pandas to an array:
```Python
# everything downloaded from openml should be converted from pandas format to array format  
# Fetch the Olivetti Faces dataset  
dataset = datasets.fetch_openml('olivetti_faces')  
data = np.array(dataset.data)  
target = np.array(dataset.target)
```

Image display and image display using subplot:
```Python
# Set the title for the plot
plt.title("Face pictures: ")

# Display the first image in the dataset
plt.imshow(data[0].reshape(64, 64), cmap="gray")

# Show the plot
plt.show()

# Initialize a counter for subplot positioning
i = 1

# Iterate over a subset of the data to display multiple images
for image in data[:100:5]:
    plt.subplot(4, 5, i) # Create a subplot with 4 rows, 5 columns, and position i
    plt.imshow(image.reshape(64, 64), cmap="gray")# Display the image and reshape it to a 64x64 format
    i += 1 # Increment the counter

# Show the plot with multiple subplots
plt.show()
```

## Generating numbers

```Python
# generating numbers
numbersInt = np.random.randint(10, 20, size=10) # from 10 to 20, 10 of them
# print(numbersInt)
  
numbersFloat = np.random.uniform(40, 100, 10)
# print(numbersFloat)
  
genNumbers01 = np.random.randint(5, 20, 20)
# print(genNumbers01)
  
coordinate system = np.random.randint(1, 100, (15, 2)) # numbers from 1 to 100, 15 of them in two dimensions
# print(coordinate system)
  
genNumbers02 = np.random.randint(1, 500, (50, 2))
# print(genNumbers02)
```

Data visualization:
```Python
# data visualization:
plt.title("Display of generated numbers")
plt.scatter(coordinateSystem[:, 0], coordinateSystem[:, 1], label="x y")
plt.legend()
plt.show()
  
genNumbers03 = np.random.randint(20, 250, (50, 5))
x = genNumbers03[:, 1]
y = genNumbers03[:, 3]
plt.scatter(x, y, label="x y")
plt.legend()
plt.show()
```

# Full Code

```Python
from sklearn import datasets  
import numpy as np  
from matplotlib import pyplot as plt  
  
# everything downloaded from openml should be converted from pandas format to array format  
# Fetch the Olivetti Faces dataset  
dataset = datasets.fetch_openml('olivetti_faces')  
data = np.array(dataset.data)  
target = np.array(dataset.target)  
  
plt.title("Face pictures: ") # Set the title for the plot  
plt.imshow(data[0].reshape(64, 64), cmap="gray") # Display the first image in the dataset  
plt.show() # Show the plot  
  
# Initialize a counter for subplot positioning  
i = 1  
  
# Iterate over a subset of the data to display multiple images  
for image in data[:100:5]:  
    plt.subplot(4, 5, i) # Create a subplot with 4 rows, 5 columns, and position i  
    plt.imshow(image.reshape(64, 64), cmap="gray")# Display the image and reshape it to a 64x64 format  
    i += 1 # Increment the counter  
  
# Show the plot with multiple subplots  
plt.show()  
  
# generating numbers  
numbersInt = np.random.randint(10, 20, size=10)  # from 10 to 20, 10 of them  
# print(numbersInt)  
  
numbersFloat = np.random.uniform(40, 100, 10)  
# print(numbersFloat)  
  
genNumbers01 = np.random.randint(5, 20, 20)  
# print(genNumbers01)  
  
coordinate_system = np.random.randint(1, 100, (15, 2))  # numbers from 1 to 100, 15 of them in two dimensions  
# print(coordinate system)  
  
genNumbers02 = np.random.randint(1, 500, (50, 2))  
# print(genNumbers02)  
  
# data visualization:  
plt.title("Display of generated numbers")  
plt.scatter(coordinate_system[:, 0], coordinate_system[:, 1], label="x y")  
plt.legend()  
plt.show()  
  
genNumbers03 = np.random.randint(20, 250, (50, 5))  
x = genNumbers03[:, 1]  
y = genNumbers03[:, 3]  
plt.scatter(x, y, label="x y")  
plt.legend()  
plt.show()
```