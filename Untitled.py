#!/usr/bin/env python
# coding: utf-8

# In[60]:


import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('IE.PNG',0)
template = cv2.imread('s2.PNG',0)
w, h = template.shape[::-1]


# In[61]:


res = cv2.matchTemplate(img, template, cv2.TM_CCOEFF_NORMED)
threshold = .8
loc = np.where(res >= threshold)
if len(loc[0]) == 0 and len(loc[1]) == 0:
    print('not foubd')
else:
    print('found')


# In[30]:




for pt in zip(*loc[::-1]):  # Switch collumns and rows
    cv2.rectangle(img, pt, (pt[0] + w, pt[1] + h), (0, 0, 255), 2)

cv2.imwrite('result.png', img)


# In[22]:


def find_image(im, tpl):
    im = np.atleast_3d(im)
    tpl = np.atleast_3d(tpl)
    H, W, D = im.shape[:3]
    h, w = tpl.shape[:2]

    # Integral image and template sum per channel
    sat = im.cumsum(1).cumsum(0)
    tplsum = np.array([tpl[:, :, i].sum() for i in range(D)])

    # Calculate lookup table for all the possible windows
    iA, iB, iC, iD = sat[:-h, :-w], sat[:-h, w:], sat[h:, :-w], sat[h:, w:] 
    lookup = iD - iB - iC + iA
    # Possible matches
    possible_match = np.where(np.logical_and.reduce([lookup[..., i] == tplsum[i] for i in range(D)]))

    # Find exact match
    for y, x in zip(*possible_match):
        if np.all(im[y+1:y+h+1, x+1:x+w+1] == tpl):
            return (y+1, x+1)

    raise Exception("Image not found")


# In[23]:


find_image(img, template)


# In[ ]:




