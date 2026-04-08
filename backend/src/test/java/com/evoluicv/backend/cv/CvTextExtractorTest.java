package com.evoluicv.backend.cv;

import com.evoluicv.backend.error.EmptyCvTextException;
import com.evoluicv.backend.error.UnsupportedCvFormatException;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CvTextExtractorTest {

    private final CvTextExtractor extractor = new CvTextExtractor();

    private static final String LONG_TEXT = """
            João Silva — Engenheiro de Software sênior com experiência em backend Java e Spring,
            atuando em fintechs e plataformas de alta escala. Liderou refatoração de microsserviços
            reduzindo latência média em 35% e custos de infraestrutura em 20%. Experiência com
            Kafka, PostgreSQL, Docker e Kubernetes. Formação: Bacharelado em Ciência da Computação.
            """;

    @Test
    void extraiTextoDeArquivoTxt() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "cv.txt",
                "text/plain",
                LONG_TEXT.getBytes(StandardCharsets.UTF_8)
        );

        String result = extractor.extract(file);

        assertThat(result).contains("Engenheiro de Software");
    }

    @Test
    void rejeitaArquivoComFormatoNaoSuportado() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "cv.rtf",
                "application/rtf",
                LONG_TEXT.getBytes(StandardCharsets.UTF_8)
        );

        assertThatThrownBy(() -> extractor.extract(file))
                .isInstanceOf(UnsupportedCvFormatException.class);
    }

    @Test
    void rejeitaArquivoVazio() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "cv.txt",
                "text/plain",
                new byte[0]
        );

        assertThatThrownBy(() -> extractor.extract(file))
                .isInstanceOf(EmptyCvTextException.class);
    }

    @Test
    void rejeitaTextoMuitoCurto() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "cv.txt",
                "text/plain",
                "texto curto".getBytes(StandardCharsets.UTF_8)
        );

        assertThatThrownBy(() -> extractor.extract(file))
                .isInstanceOf(EmptyCvTextException.class);
    }
}
