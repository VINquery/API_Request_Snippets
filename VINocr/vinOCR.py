import xml.etree.ElementTree as ET

import requests

from PIL import Image
import os

link = "http://www.recognition.ws/vinocr/v1?accesscode=7fdc7ba0-6a5c-4122-a74c-31f5de9ef87c"
# YOUR_ACCESS_CODE: Your access code.
path = "C:/Users/sooph/Downloads/2751-0ab4bd62-d696-4fb5-83d8-3eee708732fc.jpg"


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