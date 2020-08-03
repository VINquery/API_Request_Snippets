import os
import xml.etree.ElementTree as ET
import requests

link = "http://www.recognition.ws/vinbarcode/v1?accesscode=ACCESS_CODE"
# ACCESS_CODE: Your access code.

path = "FILE_PATH"
# FILE_PATH: Path to the image of the barcode.

image = open(path, 'rb')

with open(path, 'rb') as img:
    imgName = os.path.basename(path)
    files = {'image': (imgName, img)}
    with requests.Session() as s:
        r = s.post(link, files = files)
        xml = ET.fromstring(r.text)
        output = "VIN Captured: " + xml[0].text
        print(output)
