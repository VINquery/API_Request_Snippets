using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Xml.Linq;
using System.Drawing;

namespace LPR
{
    class Program
    {
        static void Main(string[] args)
        {
            String url = "http://www.recognition.ws/lpr/v1?accesscode=YOUR_ACCESS_CODE";
            String path = "YOUR_FILE_PATH";
            WebClient client = new WebClient();
            Image barcode = Image.FromFile(path);
            byte[] response = client.UploadFile(url, path);
            String responsestring = client.Encoding.GetString(response);
            XElement root = XElement.Parse(responsestring);

            IEnumerable<XElement> test =
                from el in root.Elements("License_Number")
                where (string)el.Value != null
                select el;
            foreach (XElement el in test)
                Console.WriteLine("License Number: " + (string)el.Value);
        }
    }
}
