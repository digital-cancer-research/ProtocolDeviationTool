package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class StudyTest {

    private Study study;

    @BeforeEach
    public void setUp() {
        study = new Study();
    }

    @Test
    public void testGetStudyId() {
        int id = 123;
        study.setStudyId(id);

        assertEquals(id, study.getStudyId());
    }

    @Test
    public void testSetStudyId() {
        int id = 456;
        study.setStudyId(id);

        assertEquals(id, study.getStudyId());
    }

    @Test
    public void testGetStudyName() {
        String name = "TestStudy";
        study.setStudyName(name);

        assertEquals(name, study.getStudyName());
    }

    @Test
    public void testSetStudyName() {
        String name = "NewTestStudy";
        study.setStudyName(name);

        assertEquals(name, study.getStudyName());
    }
}
