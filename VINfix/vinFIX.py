import xml.etree.ElementTree as ET

import json

import requests

link = "http://www.recognition.ws/vinfix/v1?accesscode=YOUR_ACCESS_CODEvin=YOUR_VIN"
# YOUR_ACCESS_CODE: Your access code.
# YOUR_VIN: The incorrect vin needed for fixing.

response = requests.get(link)
xml = ET.fromstring(response.content.decode('UTF-8'))

suggestion = list(xml)
sug1 = xml[0]
sug1 = list(sug1)
print("Algorithm 1:")
for i in sug1:
    print(i.attrib['Key'] + ": " + i.attrib['Value'])
sug2 = xml[1]
sug2 = list(sug2)
print("Algorithm 2:")
for i in sug1:
    print(i.attrib['Key'] + ": " + i.attrib['Value'])