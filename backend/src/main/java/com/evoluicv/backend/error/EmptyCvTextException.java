package com.evoluicv.backend.error;

public class EmptyCvTextException extends RuntimeException {
    public EmptyCvTextException(String message) {
        super(message);
    }
}
