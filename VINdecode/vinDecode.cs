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
            WebRequest request = WebRequest.Create(url);
            WebResponse response = request.GetResponse();

            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader stream = new StreamReader(dataStream);
                String responseString = stream.ReadToEnd();

                XElement root = XElement.Parse(responseString);

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
