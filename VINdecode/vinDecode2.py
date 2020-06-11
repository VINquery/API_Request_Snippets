import xml.etree.ElementTree as ET

import requests

link = "http://ws.vinquery.com/restxml.aspx?accesscode=ACCCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN"
# YOUR_ACCESS_CODE: Your access code.
# YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
# YOUR_VIN: The vin you wish to decode.
response = requests.get(link)
xml = ET.fromstring(response.content.decode('UTF-8'))

output = "Model Year: " + xml[0][0].attrib['Model_Year'] + "\n"
output += "Make: " + xml[0][0].attrib['Make'] + "\n"
output += "Model: " + xml[0][0].attrib['Model'] + "\n"
output += "Trim Level: " + xml[0][0].attrib['Trim_Level']

print(output)