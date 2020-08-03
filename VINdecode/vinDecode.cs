using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Net;
using System.IO;
using System.Xml.Linq;

namespace VINdecode
{
    class vinDecode
    {
        static void Main(string[] args)
        {
            String url = "http://ws.vinquery.com/restxml.aspx?accesscode=YOUR_ACCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN";
            // YOUR_ACCESS_CODE: Your access code.
			      // YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
			      // YOUR_VIN: The vin you wish to decode.

            WebRequest request = WebRequest.Create(url);
            WebResponse response = request.GetResponse();

            // Getting and parsing the response.
            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader stream = new StreamReader(dataStream);
                String responseString = stream.ReadToEnd();

                XElement root = XElement.Parse(responseString);

                // Parsing:
                // Iterating over each instance of 'el' which is any element that is an 
                // Item tag with a Key attribute that is not null.
                // Where the Item tag is a child of the root tag, VIN tag, and Vehicle tag.
                IEnumerable<XElement> tests =
                    from el in root.Elements("VIN").Elements("Vehicle").Elements("Item")
                    where (string) el.Attribute("Key") != null
                    select el;
                foreach (XElement el in tests)
                    Console.WriteLine((string) el.Attribute("Key") + ": " + (string) el.Attribute("Value"));
            }
            
            response.Close();

        }
    }
}
