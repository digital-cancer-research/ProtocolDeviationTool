package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class DvspondesTest {

    private Dvspondes dvspondes;

    @BeforeEach
    public void setUp() {
        dvspondes = new Dvspondes();
    }

    @Test
    public void testGetDvspondesId() {
        int id = 123;
        dvspondes.setDvspondesId(id);

        assertEquals(id, dvspondes.getDvspondesId());
    }

    @Test
    public void testSetDvspondesId() {
        int id = 456;
        dvspondes.setDvspondesId(id);

        assertEquals(id, dvspondes.getDvspondesId());
    }

    @Test
    public void testGetDvspondesValue() {
        String value = "TestValue";
        dvspondes.setDvspondesValue(value);

        assertEquals(value, dvspondes.getDvspondesValue());
    }

    @Test
    public void testSetDvspondesValue() {
        String value = "NewTestValue";
        dvspondes.setDvspondesValue(value);

        assertEquals(value, dvspondes.getDvspondesValue());
    }
}
