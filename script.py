import sys
import cv2
import numpy as np

threshold = .8
symbol_list = ['IE_EXPLORER.png','IE_HOME.png','IE_RIGHT_PANEL.png','IE_BACK_BUTTON.png']


isImageFound = False
for symbol in symbol_list:
    img = cv2.imread(sys.argv[1],0)
    template = cv2.imread(symbol,0)
    #w, h = template.shape[::-1]
    res = cv2.matchTemplate(img, template, cv2.TM_CCOEFF_NORMED)
    loc = np.where(res >= threshold)
    if len(loc[0]) == 0 and len(loc[1]) == 0:
        continue
    else:
        isImageFound = True
        break
if isImageFound:
    print("Image found")
else:
    print("Image not found") 
    
    
    

# 
# for pt in zip(*loc[::-1]):  
#     cv2.rectangle(img, pt, (pt[0] + w, pt[1] + h), (0, 0, 255), 2)
#  
# cv2.imwrite('result.png', img)
#  
#  
#  
#  
# def find_image(im, tpl):
#     im = np.atleast_3d(im)
#     tpl = np.atleast_3d(tpl)
#     H, W, D = im.shape[:3]
#     h, w = tpl.shape[:2]
#  
#     sat = im.cumsum(1).cumsum(0)
#     tplsum = np.array([tpl[:, :, i].sum() for i in range(D)])
#  
#     iA, iB, iC, iD = sat[:-h, :-w], sat[:-h, w:], sat[h:, :-w], sat[h:, w:] 
#     lookup = iD - iB - iC + iA
#     possible_match = np.where(np.logical_and.reduce([lookup[..., i] == tplsum[i] for i in range(D)]))
#  
#     for y, x in zip(*possible_match):
#         if np.all(im[y+1:y+h+1, x+1:x+w+1] == tpl):
#             return (y+1, x+1)
#  
#  
#  
#  
#  
# find_image(img, template)
# 


