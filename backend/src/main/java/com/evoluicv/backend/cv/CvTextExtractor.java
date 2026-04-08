package com.evoluicv.backend.cv;

import com.evoluicv.backend.error.EmptyCvTextException;
import com.evoluicv.backend.error.UnsupportedCvFormatException;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.InputStream;
import java.util.Set;

@Component
public class CvTextExtractor {

    private static final int MIN_TEXT_LENGTH = 200;

    private static final Set<String> SUPPORTED_CONTENT_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
    );

    public String extract(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new EmptyCvTextException("Arquivo do CV está vazio");
        }
        validateSupported(file.getContentType());

        String text;
        try (InputStream in = file.getInputStream()) {
            BodyContentHandler handler = new BodyContentHandler(-1);
            Metadata metadata = new Metadata();
            AutoDetectParser parser = new AutoDetectParser();
            parser.parse(in, handler, metadata, new ParseContext());
            text = handler.toString();
        } catch (IOException | SAXException | TikaException e) {
            throw new UnsupportedCvFormatException("Falha ao extrair texto do arquivo: " + e.getMessage());
        }

        String normalized = text == null ? "" : text.strip();
        if (normalized.length() < MIN_TEXT_LENGTH) {
            throw new EmptyCvTextException(
                    "Não foi possível extrair texto suficiente do arquivo. "
                            + "Verifique se o CV não é um PDF apenas com imagens (scan sem OCR).");
        }
        return normalized;
    }

    private void validateSupported(String contentType) {
        if (contentType == null || !SUPPORTED_CONTENT_TYPES.contains(contentType)) {
            throw new UnsupportedCvFormatException(
                    "Formato não suportado: " + contentType + ". Use PDF, DOCX ou TXT.");
        }
    }
}
