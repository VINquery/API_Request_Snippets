import os
import xml.etree.ElementTree as ET
import requests

link = "http://www.recognition.ws/lpr/v1?accesscode=7fdc7ba0-6a5c-4122-a74c-31f5de9ef87c"
path = "C:/Users/sooph/Downloads/USCA-3778-6836f596-74f3-4720-bcaf-ae321a3bb052.jpg"

image = open(path, 'rb')

with open(path, 'rb') as img:
    imgName = os.path.basename(path)
    files = {'image': (imgName, img)}
    with requests.Session() as s:
        r = s.post(link, files = files)
        xml = ET.fromstring(r.text)
        output = "Captured License Plate: " + xml[0].text
        print(output)