import xml.etree.ElementTree as ET
import requests

url = "https://www.recognition.ws/vinfix/v1?accesscode=YOUR_ACCESS_CODE_vin=YOUR_VIN"
# YOUR_ACCESS_CODE: Your access code.
# YOUR_VIN: The incorrect vin needed for fixing.

response = requests.get(url)
xml = ET.fromstring(response.content.decode('UTF-8'))

# suggestion is split into alg1 (Algorithm 1) and alg2 (Algorithm 2).
suggestion = list(xml)
alg1 = xml[0]
alg1 = list(alg1)
print("Algorithm 1:")
# Iterate over each item within alg1
for i in alg1:
    print(i.attrib['Key'] + ": " + i.attrib['Value'])
alg2 = xml[1]
alg2 = list(alg2)
print("Algorithm 2:")
# Iterate over each item within alg2
for i in alg2:
    print(i.attrib['Key'] + ": " + i.attrib['Value'])