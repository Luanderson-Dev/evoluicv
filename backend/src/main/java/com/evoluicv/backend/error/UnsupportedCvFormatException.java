package com.evoluicv.backend.error;

public class UnsupportedCvFormatException extends RuntimeException {
    public UnsupportedCvFormatException(String message) {
        super(message);
    }
}
