import xml.etree.ElementTree as ET

import requests

# If you are interested, vinDecode.py parses the response as a string, as opposed to
# converting the response to an ElementTree.
# This solution is far more concise.

link = "http://ws.vinquery.com/restxml.aspx?accesscode=ACCCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN"
# YOUR_ACCESS_CODE: Your access code.
# YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
# YOUR_VIN: The vin you wish to decode.
response = requests.get(link)
xml = ET.fromstring(response.content.decode('UTF-8'))

# xml[0][0].attrib['Attribute_Name']
# Searching for the attribute 'Attribute_Name' within the Vehicle tag which is within the VIN tag.
# Basically, searching for the attribute 'Attribute_Name' in all the Item tags.

output = "Model Year: " + xml[0][0].attrib['Model_Year'] + "\n"
output += "Make: " + xml[0][0].attrib['Make'] + "\n"
output += "Model: " + xml[0][0].attrib['Model'] + "\n"
output += "Trim Level: " + xml[0][0].attrib['Trim_Level']

print(output)
