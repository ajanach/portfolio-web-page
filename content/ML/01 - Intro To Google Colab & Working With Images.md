---
title: "01 - Intro To Google Colab & Working With Images"
draft: false
---

# Intro
- The default programming in Google Colab is Python
- System command for Python are written: `!pip`
- `CTRP + ALT + P` for opening code snippets

## Important Code Snippets
- Mounting Google Drive in your VM
- Downloading files to your local file system
- Open files from your local file system
- Showing CV2 Images

## Mounting gDrive And Opening Image From It

```Python
# keep this modules in your notebook:
from google.colab import drive  
from PIL import Image  
from matplotlib import pyplot as plt
import cv2  
  
# mount on google drive  
drive.mount('/gdrive')  
  
# adding image path:  
image_path = '/gdrive/MyDrive/SDU/V1-materials/picture.jpg'  
  
# load image:  
image = Image.open(image_path)  
  
# print image height and width + image type:  
print(f"Image width and height: {image.size}, image type {image.mode}") 
```

## Display Image On Screen

```Python
# display the image on the screen:  
plt.imshow(image)  # with graph  
  
plt.xticks([])  # x-axis remove graph numbers  
plt.yticks([])  # y-axis remove graph number  
plt.imshow(image)  # show image without graph  
  
# image rotation:  
plt.imshow(image.rotate(45))  # my recommendation is to write everything inside plt.imshow() 

# saving the picture:
image.rotate(45).save('/gdrive/MyDrive/SDU/V1-materials/slika-rotirana.jpg') 
  
# convert image to grayscale:  
plt.imshow(image.convert('LA'))
```

## Working With `cv2` Module For Pictures

```Python
# move images from path to another path:  
computer = cv2.imread('/gdrive/MyDrive/SDU/V1-materiali/slika-rotirana.jpg')  
cv2.imwrite('/gdrive/MyDrive/SDU/V1-materials/image-rotated-cv2.jpg', computer)  
  
# loading butterfly image:  
butterfly_image = cv2.imread('/gdrive/MyDrive/SDU/V1-materiali/Leptir.jpg')  # we recommend using cv2  
  
# display picture:  
plt.imshow(butterfly_image)  
  
# view of the butterfly itself from the picture:  
butterfly = butterfly_image[1000:2650, 1700:4360]  
plt.imshow(butterfly)  
  
# height, width and dept  
v, s, d = butterfly.shape  
butterfly.shape  
  
# resize images:  
small_butterfly = cv2.resize(butterfly, (866, 550))  
plt.imshow(small_butterfly)  
# print(small_butterfly)  
  
# butterfly image in pixels  
butterfly_image[1000:1550, 5000:5866] = small_butterfly  
plt.imshow(butterfly_image)
```

# Downloading Picture On gDrive And Working On It

## Downloading Picture And Display Picture

We can use system command `!curl` to download image. 

`!curl -o /gdrive/MyDrive/SDU/V1-materijali/curl-slika.jpg https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg`

Where:
- `/gdrive/MyDrive/SDU/V1-materijali/curl-slika.jpg` is saving path
- `https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg` is download point

```Python
# keep this modules in your notebook:
from google.colab import drive  
from PIL import Image  
from matplotlib import pyplot as plt  
import cv2  
from google.colab.patches import cv2_imshow  
  
# download image to gDrive:
!curl -o /content/drive/MyDrive/SDU/V1-materijali/curl-slika.jpg https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg  
  
# load and display the image:  
image = cv2.imread('/content/drive/MyDrive/SDU/V1-materiali/curl-image.jpg')  
cv2_imshow(image)  
```

## Changing Certain Pixels To Desired Color, Resize And Display Picture
```Python
# height, width and depth:
v, s, d = image.shape  
print(f"Height: {v}; Width: {s}; Depth: {d}.") 

# pixels retrived:
px1 = image[100, 100]

# print pixels:
print(px1)

# changing certain pixels to the desired color:
image[130,130] = [255, 255, 255]
image[100:120, 105:110] = [200, 0, 180]

# display images
#cv2_imshow(picture)

# grayscale images:
image2 = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# resize images:
image2 = cv2.resize(image2, (int(s*2), int(v/2)))

# image display and image size:
print(image2.shape)
cv2_imshow(image2)
```

# Full Code 01

```Python
from google.colab import drive  
from PIL import Image  
from matplotlib import pyplot as plt  
import cv2  
  
# mount on google drive  
drive.mount('/content/drive')  
  
# adding image path:  
image_path = '/content/drive/MyDrive/SDU/V1-materials/picture.jpg'  
  
# load image:  
image = Image.open(image_path)  
  
# print image height and width + image type:  
print(f"Image width and height: {image.size}, image type {image.mode}")  
  
# display the image on the screen:  
plt.imshow(image) # with graph  
  
plt.xticks([]) # x-axis remove graph numbers  
plt.yticks([]) # y-axis remove graph number  
plt.imshow(image) # show image without graph  
  
# image rotation:  
plt.imshow(image.rotate(45)) # my recommendation is to write everything inside plt.imshow()  
image.rotate(45).save('/content/drive/MyDrive/SDU/V1-materials/slika-rotirana.jpg') # save the picture  
  
# convert image to grayscale:  
plt.imshow(image.convert('LA'))  
  
# move images from path to another path:  
computer = cv2.imread('/content/drive/MyDrive/SDU/V1-materiali/slika-rotirana.jpg')  
cv2.imwrite('/content/drive/MyDrive/SDU/V1-materials/image-rotated-cv2.jpg', computer)  
  
# loading butterfly image  
butterfly_image = cv2.imread('/content/drive/MyDrive/SDU/V1-materiali/Leptir.jpg') # we recommend using cv2  
plt.imshow(butterfly_image)  
  
# view of the butterfly itself from the picture:  
butterfly = butterfly_image[1000:2650, 1700:4360]  
plt.imshow(butterfly)  
  
v, s, d = butterfly.shape  
butterfly.shape  
  
# resize images:  
small_butterfly = cv2.resize(butterfly, (866, 550))  
plt.imshow(small_butterfly)  
# print(small_butterfly)  
  
# butterfly image in pixels  
butterfly_image[1000:1550, 5000:5866] = small_butterfly  
plt.imshow(butterfly_image)
```

# Full Code 02

```Python
from google.colab import drive  
from PIL import Image  
from matplotlib import pyplot as plt  
import cv2  
from google.colab.patches import cv2_imshow  
  
# download image to gDrive:
!curl -o /content/drive/MyDrive/SDU/V1-materijali/curl-slika.jpg https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg  
  
# load and display the image:  
image = cv2.imread('/content/drive/MyDrive/SDU/V1-materiali/curl-image.jpg')  
cv2_imshow(image)  
  
# height, width and depth:
v, s, d = image.shape  
print(f"Height: {v}; Width: {s}; Depth: {d}.")  
  
# pixels retrieved:  
px1 = image[100, 100]  
  
# print pixels:  
print(px1)  
  
# changing certain pixels to the desired color:  
image[130,130] = [255, 255, 255]  
image[100:120, 105:110] = [200, 0, 180]  
  
# display images:
#cv2_imshow(picture)  
  
# grayscale images:  
image2 = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  
  
# resize images:  
image2 = cv2.resize(image2, (int(s*2), int(v/2)))  
  
# image display and image size:  
print(image2.shape)  
cv2_imshow(image2)
```