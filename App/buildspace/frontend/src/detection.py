import ast
import cv2
import sys
import os
import urllib.request
import requests
from PIL import Image
import urllib.request
import numpy as np
import json

    
def detection_object(url):

    url_response = urllib.request.urlopen(url)
    img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
    img = cv2.imdecode(img_array, -1)
    #img = cv2.imread(image)
    c = [0, 0]
    with open('coco.names', 'r') as f:
        classes = f.read().splitlines()
    
    net = cv2.dnn.readNetFromDarknet('yolov4.cfg', 'yolov4.weights')
    
    model = cv2.dnn_DetectionModel(net)
    model.setInputParams(scale=1 / 255, size=(416, 416), swapRB=True)
    classIds, scores, boxes = model.detect(img, confThreshold=0.6, nmsThreshold=0.4)
    
    for (classId, score, box) in zip(classIds, scores, boxes):
        cv2.rectangle(img, (box[0], box[1]), (box[0] + box[2], box[1] + box[3]),
                  color=(0, 255, 0), thickness=2)
        
        if classes[classId]== 'dog':
            c[0] +=1
        elif classes[classId]=='cat':
            c[1] +=1
        


        text = '%s: %.2f' % (classes[classId], score)
        cv2.putText(img, text, (box[0], box[1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 1,
                    color=(0, 255, 0), thickness=2)
    return c

data_input = 'https://media.istockphoto.com/photos/group-of-various-breeds-of-cats-sitting-next-to-each-other-looking-at-picture-id1278389859?k=20&m=1278389859&s=612x612&w=0&h=SAC0uiXC8Qc-4FmQTYZYzLs5H7DbErAnq-8EmLOZwJ4='
output = detection_object(data_input)
print(output)


    
    
