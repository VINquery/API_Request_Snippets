package VINbarcode;

import java.io.File;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;


import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;

public class vinBarcode {
    public static void main(String[] args) {
        // Insert file path of the image of the vin as well as your access code in
        // "FILE_PATH" and "YOUR_ACCESS_CODE" respectively.
        // The webpage may appear to be blank. In this case, you may need to inspect the
        // page's source code to view information.
        final String filePath = "FILE_PATH";
        final String urlString = "http://www.recognition.ws/vinbarcode/v1?accesscode=ACCESS_CODE";
        try {
            final URL link = new URL(urlString);
            final HttpURLConnection con = (HttpURLConnection) link.openConnection();
            postImage(con, filePath);
            parseXML(con);
            con.disconnect();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void postImage(HttpURLConnection con, String filePath) {
        String charSet = "UTF-8";
        File binaryFile = new File(filePath);
        String boundary = "--";
        String CRLF = "\r\n";
        try {
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

            OutputStream output = con.getOutputStream();
            PrintWriter pw = new PrintWriter(new OutputStreamWriter(output, charSet));
            pw.append("--" + boundary).append(CRLF);
            pw.append("Content-Disposition: form-data; name \"file\"; filename=\"" + binaryFile.getName() + "\"")
                    .append(CRLF);
            pw.append("Content-Type: image/gif").append(CRLF);
            pw.append(CRLF).flush();
            
            Files.copy(binaryFile.toPath(), output);
            output.flush();

            pw.append(CRLF).append("--" + boundary + "--").flush();

            pw.close();
            output.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void parseXML(HttpURLConnection con) {
        try {
            XMLInputFactory factory = XMLInputFactory.newInstance();
            XMLEventReader eventReader = factory.createXMLEventReader(new InputStreamReader(con.getInputStream()));

            while (eventReader.hasNext()) {
                String print = "VIN Captured: ";
                while (eventReader.hasNext()) {
                    XMLEvent event = eventReader.nextEvent();
                    if (event.isStartElement()) {
                        StartElement start = event.asStartElement();
                        if (start.getName().getLocalPart() == "VIN_Captured") {
                            print += eventReader.nextEvent().asCharacters();
                        }
                    }
                }
                System.out.println(print);
            }
        }
        catch (Exception e)  {
            e.printStackTrace();
        }
    }
}