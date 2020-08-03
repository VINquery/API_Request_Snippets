package VINdecode;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;

public class vinDecode {
	public static void main(String[] args) {
		try {
			final URL link = new URL(
			"http://ws.vinquery.com/restxml.aspx?accesscode=YOUR_ACCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN");
			// YOUR_ACCESS_CODE: Your access code.
			// YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
			// YOUR_VIN: The vin you wish to decode.
			final HttpURLConnection con = (HttpURLConnection) link.openConnection();
			con.setRequestMethod("GET");

			parseXML(con);
			con.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void parseXML(HttpURLConnection con) {
		try {
			// XML stream is parsed, assuming LITE data type request.
			XMLInputFactory factory = XMLInputFactory.newInstance();
			XMLEventReader eventReader = factory.createXMLEventReader(new InputStreamReader(con.getInputStream()));
			// Parsing response for model year, make, and model.
			// This can be edited to parse for any information required.
			while (eventReader.hasNext()) {
				String temp, print = "";
				try {
					while (eventReader.hasNext()) {
						XMLEvent event = eventReader.nextEvent();
						if (event.isStartElement()) {
							StartElement start = event.asStartElement();
							if (start.getName().getLocalPart() == "Item") {
								Attribute key = start.getAttributeByName(new QName("Key"));
								Attribute value = start.getAttributeByName(new QName("Value"));
								temp = key.getValue();
								switch (temp) {
									case "Model Year":
										print = "Model Year: " + value.getValue();
										break;
									case "Make":
										print += "Make: " + value.getValue();
										break;
									case "Model":
										print += "Model: " + value.getValue();
										break;
								}
								break;
							}
						}
					}

					System.out.println(print);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
