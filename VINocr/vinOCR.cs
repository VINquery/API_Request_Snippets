using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Xml.Linq;
using System.Drawing;

namespace VINocr
{
    class Program
    {
        static void Main(string[] args)
        {
            String url = "http://www.recognition.ws/vinocr/v1?accesscode=YOUR_ACCESS_CODE";
            String path = "YOUR_FILE_PATH";
            WebClient client = new WebClient();
            Image barcode = Image.FromFile(path);
            byte[] response = client.UploadFile(url, path);
            String responsestring = client.Encoding.GetString(response);
            XElement root = XElement.Parse(responsestring);

            // Iterating for "VIN_Captured" item in the root tag.

            var el = root.Elements("VIN_Captured");
            Console.WriteLine("VIN Captured: " + (string) el.Value);

            // IEnumerable<XElement> test =
            //     from el in root.Elements("VIN_Captured")
            //     where (string) el.Value != null
            //     select el;
            // foreach (XElement el in test)
            //     Console.WriteLine("VIN captured: " + (string)el.Value);
        }
    }
}
