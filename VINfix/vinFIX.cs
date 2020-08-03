using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Net;
using System.IO;
using System.Xml.Linq;

namespace VINfix
{
    class vinFIX
    {
        static void Main(string[] args)
        {
            String url = "https://www.recognition.ws/vinfix/v1?accesscode=YOUR_ACCESS_CODE&vin=YOUR_VIN";
            // YOUR_ACCESS_CODE: Your access code
            // YOUR_VIN: Your VIN to fix
            WebRequest request = WebRequest.Create(url);
            WebResponse response = request.GetResponse();
            
            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader stream = new StreamReader(dataStream);
                String responseString = stream.ReadToEnd();

                XElement root = XElement.Parse(responseString);

                Console.WriteLine("Algorithm 1:");

                // Iterating through el elements which are within the root tag, Algorithm1 tag, and Item tag.
                // Outputting their Key and Value attributes.
                IEnumerable<XElement> algorithmOne =
                    from el in root.Elements("Algorithm1").Elements("Item")
                    where (string) el.Attribute("Key") != null
                    select el;
                foreach (XElement el in algorithmOne)
                    Console.WriteLine((string) el.Attribute("Key") + ": " + (string) el.Attribute("Value"));

                Console.WriteLine("Algorithm 2:");
                // Same procedure as with algorithm one, but Algorithm1 -> Algorithm2 tag.
                IEnumerable<XElement> algorithmTwo =
                    from ex in root.Elements("Algorithm2").Elements("Item")
                    where (string) ex.Attribute("Key") != null
                    select ex;
                foreach (XElement ex in algorithmTwo)
                    Console.WriteLine((string) ex.Attribute("Key") + ": " + (string) ex.Attribute("Value"));

            }

            response.Close();

        }
    }
}
