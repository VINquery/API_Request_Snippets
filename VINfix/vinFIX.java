package VINfix;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;

public class vinFIX {
    public static void main(String[] args) {
        try {
            final URL link = new URL("http://www.recognition.ws/vinfix/v1?accesscode=YourAccessCode&vin=YourVINToFix");
            // Replace YourAccessCode with the access code assigned.
            // Replace YourVINToFix with the incorrect VIN.
            // The webpage may appear to be blank. In this case, you may need to inspect the
            // page's source code to view the raw XML file.
            final HttpURLConnection con = (HttpURLConnection) link.openConnection();
            con.setRequestMethod("GET");
            parseXML(con);
            con.disconnect();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void parseXML(HttpURLConnection con) {
        // As there can be multiple suggestions for each algorithm, the program searches
        // for all suggestions from algorithm 1 and then moves on to the suggestions
        // from algorithm 2. Variable a represents whether the information is from
        // algorithm 1 or 2.
        try {
            XMLInputFactory factory = XMLInputFactory.newInstance();
            XMLEventReader eventReader = factory.createXMLEventReader(new InputStreamReader(con.getInputStream()));
            String out = "Algorithm 1: " + "\n";
            int count = 1;
            while (eventReader.hasNext()) {
                XMLEvent event = eventReader.nextEvent();
                boolean a = false;
                if (event.isStartElement()) {
                    StartElement start = event.asStartElement();
                    if (start.getName().getLocalPart() == "Algorithm1") {
                    } else if (start.getName().getLocalPart() == "Algorithm2" && a == false) {
                        a = true;
                        out += "Algorithm 2: " + "\n";
                        count = 1;
                    }
                    if (start.getName().getLocalPart() == "Item") {
                        if (a = false) {
                            out += "Suggestion " + count + ": " + start.getAttributeByName(new QName("Value")) + "\n";
                        } else if (a = true) {
                            out += "Suggestion " + count + ": " + start.getAttributeByName(new QName("Value")) + "\n";
                            count++;
                        }
                    }
                }
            }

            System.out.println(out);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}