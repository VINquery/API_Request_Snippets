import os
import xml.etree.ElementTree as ET
import requests

link = "http://www.recognition.ws/vinocr/v1?accesscode=YOUR_ACCESS_CODE"
path = "YOUR_FILE_DIRECTORY"


image = open(path, 'rb')

with open(path, 'rb') as img:
  imgName = os.path.basename(path)
  files = {'image': (imgName, img)}
  with requests.Session() as s:
    r = s.post(link, files = files)
    print(r.text)
    xml = ET.fromstring(r.text)
    output = "Captured VIN: " + xml[0].text
    print(output)
