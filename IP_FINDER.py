import pytesseract
import cv2
import os
import io, sys
sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8')
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

#imPath = 'IE3.PNG';
cropFile = 'crop.PNG'
resizeFile = 'resize.PNG'
noiseRemoved = 'noiseRemoved.PNG'


def showImage(image):
    cv2.imshow("show image",cv2.imread(image))
    cv2.waitKey(0)

# Image Cropping section.
img = cv2.imread(sys.argv[1]);
#img = cv2.imread(imPath);
y = 0 ;
x = 30;
h = 55 ;
w = 300 ;
crop_img = img[y: y+h , x : x + w];
cv2.imwrite(cropFile, crop_img)
#showImage(cropFile)

# Image Resize section.
imS = cv2.resize(cv2.imread(cropFile), (560,100))
cv2.imwrite(resizeFile, imS)
#showImage(resizeFile)


# Image Noise removal section
gray = cv2.cvtColor(cv2.imread(resizeFile), cv2.COLOR_BGR2GRAY)
gray = cv2.bilateralFilter(gray, 11, 17, 17) #Blur to reduce noise
gray = cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
cv2.imwrite(noiseRemoved, gray)
#showImage(noiseRemoved)

# Image to text convertion section.
config='-l eng --oem 3 --psm 7'
pytesseract.pytesseract.tesseract_cmd = 'D:\\Tesseract-OCR\\tesseract.exe'
text = pytesseract.image_to_string(noiseRemoved , config = config)


# temp file delete section.
os.remove(noiseRemoved)
os.remove(cropFile)
os.remove(resizeFile)

#print(text)

ip = text.replace(".","")
ip = ip.replace(" ","")


if "41167" in ip: # http://192.168.41.167:60000/ac-conversion/
    print("true")
elif "50162" in ip: # http://192.168.50.162:60000/ac-conversion/
    print("true") 
elif "50163" in ip: # http://192.168.50.163:60000/ac-conversion/
    print("true")
elif "50174" in ip: # http://192.168.50.174:60000/ac-conversion/
    print("true")
elif "188145" in ip: # http://192.168.188.145:50000/ac-conversion/
    print("true")
elif "18837" in ip: # http://192.168.188.37:50000/ac-conversion/
    print("true")
elif "188150" in ip: # http://192.168.188.150:50000/ac-conversion/
    print("true")
else:
    print("false")    

