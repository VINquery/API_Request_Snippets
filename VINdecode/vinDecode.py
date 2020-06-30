import json

import requests

# This solution is long-winded and not as concise vinDecode2.py.
# This approach parses the response as a string whereas the second
# converts the response into an ElementTree and uses built-in libraries
# to parse the information contained.

link = "http://ws.vinquery.com/restxml.aspx?accesscode=ACCESS_CODE&reportTypeYOUR_REPORT_TYPE3&vin=YOUR_VIN"
# YOUR_ACCESS_CODE: Your access code.
# YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
# YOUR_VIN: The vin you wish to decode.
response = requests.get(link)
output = response.content.decode('utf-8')
toPrint = {}
# The code below is for parsing the response. If parsing is not required, using print(output) will show the entire response.

# Here, we indicate the range of the substring we are searching for (between <Vehicle and <Item).
index1 = output.find("<Vehicle")
index2 = output.find("<Item")
# We then slice the string, returning the substring containing the items we want.
splitted = output[index1:index2]
# We are then splitting the substring at the white spaces.
toPrint = splitted.split()

# Iterating through items 2-5.
for i in [2, 3, 4, 5]:
    # Here, we split the substrings again at =.
    temp = toPrint[i].split("=")
    temp1 = temp[1]
    # Removing the first and last characters. (It is surrounded by "")
    temp1 = temp1[1:len(temp1) - 1]
    # In the off chance that a quotation mark still remains, it will be removed.
    # This happens occasionally if the end of the tag remains in the substring (>).
    if '"' in temp1:
        temp1 = temp1[0:len(temp1) - 1]
    print(temp[0] + ": " + temp1)
