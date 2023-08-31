package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Date;

public class DataEntryTest {

    private DataEntry dataEntry;

    @BeforeEach
    public void setUp() {
        dataEntry = new DataEntry();
    }

    @Test
    public void testGetEntryId() {
        int entryId = 123;
        dataEntry.setEntryId(entryId);

        assertEquals(entryId, dataEntry.getEntryId());
    }

    @Test
    public void testSetEntryId() {
        int entryId = 456;
        dataEntry.setEntryId(entryId);

        assertEquals(entryId, dataEntry.getEntryId());
    }

    @Test
    public void testGetStudyId() {
        int studyId = 789;
        dataEntry.setStudyId(studyId);

        assertEquals(studyId, dataEntry.getStudyId());
    }

    @Test
    public void testSetStudyId() {
        int studyId = 101;
        dataEntry.setStudyId(studyId);

        assertEquals(studyId, dataEntry.getStudyId());
    }

    @Test
    public void testGetSiteId() {
        int siteId = 111;
        dataEntry.setSiteId(siteId);

        assertEquals(siteId, dataEntry.getSiteId());
    }

    @Test
    public void testSetSiteId() {
        int siteId = 222;
        dataEntry.setSiteId(siteId);

        assertEquals(siteId, dataEntry.getSiteId());
    }

    @Test
    public void testGetDvspondesId() {
        int dvspondesId = 333;
        dataEntry.setDvspondesId(dvspondesId);

        assertEquals(dvspondesId, dataEntry.getDvspondesId());
    }

    @Test
    public void testSetDvspondesId() {
        int dvspondesId = 444;
        dataEntry.setDvspondesId(dvspondesId);

        assertEquals(dvspondesId, dataEntry.getDvspondesId());
    }

    @Test
    public void testGetUsubjid() {
        String usubjid = "US123";
        dataEntry.setUsubjid(usubjid);

        assertEquals(usubjid, dataEntry.getUsubjid());
    }

    @Test
    public void testSetUsubjid() {
        String usubjid = "US456";
        dataEntry.setUsubjid(usubjid);

        assertEquals(usubjid, dataEntry.getUsubjid());
    }

    @Test
    public void testGetDventc() {
        String dventc = "2023-09-01";
        dataEntry.setDventc(dventc);

        assertEquals(dventc, dataEntry.getDventc());
    }

    @Test
    public void testSetDventc() {
        String dventc = "2023-09-02";
        dataEntry.setDventc(dventc);

        assertEquals(dventc, dataEntry.getDventc());
    }
	
	@Test
	public void testGetDventcviz() {
	    String dventcviz = "Visualization";
	    dataEntry.setDventcviz(dventcviz);
	
	    assertEquals(dventcviz, dataEntry.getDventcviz());
	}
	
	@Test
	public void testSetDventcviz() {
	    String dventcviz = "Other Visualization";
	    dataEntry.setDventcviz(dventcviz);
	
	    assertEquals(dventcviz, dataEntry.getDventcviz());
	}
	
	@Test
	public void testGetDvsponsev() {
	    String dvsponsev = "Event Value";
	    dataEntry.setDvsponsev(dvsponsev);
	
	    assertEquals(dvsponsev, dataEntry.getDvsponsev());
	}
	
	@Test
	public void testSetDvsponsev() {
	    String dvsponsev = "Other Event Value";
	    dataEntry.setDvsponsev(dvsponsev);
	
	    assertEquals(dvsponsev, dataEntry.getDvsponsev());
	}
	
	@Test
	public void testGetImpor() {
	    int impor = 2;
	    dataEntry.setImpor(impor);
	
	    assertEquals(impor, dataEntry.getImpor());
	}
	
	@Test
	public void testSetImpor() {
	    int impor = 3;
	    dataEntry.setImpor(impor);
	
	    assertEquals(impor, dataEntry.getImpor());
	}
	
	@Test
	public void testGetAt() {
	    String at = "Some value";
	    dataEntry.setAt(at);
	
	    assertEquals(at, dataEntry.getAt());
	}
	
	@Test
	public void testSetAt() {
	    String at = "Another value";
	    dataEntry.setAt(at);
	
	    assertEquals(at, dataEntry.getAt());
	}
	
	@Test
	public void testGetAtDate() {
	    Date atDate = new Date();
	    dataEntry.setAtDate(atDate);
	
	    assertEquals(atDate, dataEntry.getAtDate());
	}
	
	@Test
	public void testSetAtDate() {
	    Date atDate = new Date();
	    dataEntry.setAtDate(atDate);
	
	    assertEquals(atDate, dataEntry.getAtDate());
	}
	
	@Test
	public void testGetDomain() {
	    String domain = "Some domain";
	    dataEntry.setDomain(domain);
	
	    assertEquals(domain, dataEntry.getDomain());
	}
	
	@Test
	public void testSetDomain() {
	    String domain = "Another domain";
	    dataEntry.setDomain(domain);
	
	    assertEquals(domain, dataEntry.getDomain());
	}
	
	@Test
    public void testGetDvseq() {
        int dvseq = 5;
        dataEntry.setDvseq(dvseq);

        assertEquals(dvseq, dataEntry.getDvseq());
    }

    @Test
    public void testSetDvseq() {
        int dvseq = 6;
        dataEntry.setDvseq(dvseq);

        assertEquals(dvseq, dataEntry.getDvseq());
    }

    @Test
    public void testGetDvrefid() {
        int dvrefid = 7;
        dataEntry.setDvrefid(dvrefid);

        assertEquals(dvrefid, dataEntry.getDvrefid());
    }

    @Test
    public void testSetDvrefid() {
        int dvrefid = 8;
        dataEntry.setDvrefid(dvrefid);

        assertEquals(dvrefid, dataEntry.getDvrefid());
    }

    @Test
    public void testGetDvendtc() {
        Date dvendtc = new Date();
        dataEntry.setDvendtc(dvendtc);

        assertEquals(dvendtc, dataEntry.getDvendtc());
    }

    @Test
    public void testSetDvendtc() {
        Date dvendtc = new Date();
        dataEntry.setDvendtc(dvendtc);

        assertEquals(dvendtc, dataEntry.getDvendtc());
    }

    @Test
    public void testGetDvcatid() {
        int dvcatid = 9;
        dataEntry.setDvcatid(dvcatid);

        assertEquals(dvcatid, dataEntry.getDvcatid());
    }

    @Test
    public void testSetDvcatid() {
        int dvcatid = 10;
        dataEntry.setDvcatid(dvcatid);

        assertEquals(dvcatid, dataEntry.getDvcatid());
    }

    @Test
    public void testGetDvdecodid() {
        int dvdecodid = 11;
        dataEntry.setDvdecodid(dvdecodid);

        assertEquals(dvdecodid, dataEntry.getDvdecodid());
    }

    @Test
    public void testSetDvdecodid() {
        int dvdecodid = 12;
        dataEntry.setDvdecodid(dvdecodid);

        assertEquals(dvdecodid, dataEntry.getDvdecodid());
    }

    @Test
    public void testGetAdv() {
        String adv = "Some advantage";
        dataEntry.setAdv(adv);

        assertEquals(adv, dataEntry.getAdv());
    }

    @Test
    public void testSetAdv() {
        String adv = "Another advantage";
        dataEntry.setAdv(adv);

        assertEquals(adv, dataEntry.getAdv());
    }

    @Test
    public void testGetNonadv() {
        String nonadv = "Some non-advantage";
        dataEntry.setNonadv(nonadv);

        assertEquals(nonadv, dataEntry.getNonadv());
    }

    @Test
    public void testSetNonadv() {
        String nonadv = "Another non-advantage";
        dataEntry.setNonadv(nonadv);

        assertEquals(nonadv, dataEntry.getNonadv());
    }

    @Test
    public void testGetDvsCat() {
        String dvsCat = "Some category";
        dataEntry.setDvsCat(dvsCat);

        assertEquals(dvsCat, dataEntry.getDvsCat());
    }

    @Test
    public void testSetDvsCat() {
        String dvsCat = "Another category";
        dataEntry.setDvsCat(dvsCat);

        assertEquals(dvsCat, dataEntry.getDvsCat());
    }

    @Test
    public void testGetDvstdtc() {
        Date dvstdtc = new Date();
        dataEntry.setDvstdtc(dvstdtc);

        assertEquals(dvstdtc, dataEntry.getDvstdtc());
    }

    @Test
    public void testSetDvstdtc() {
        Date dvstdtc = new Date();
        dataEntry.setDvstdtc(dvstdtc);

        assertEquals(dvstdtc, dataEntry.getDvstdtc());
    }

    @Test
    public void testGetUserId() {
        int userId = 13;
        dataEntry.setUserId(userId);

        assertEquals(userId, dataEntry.getUserId());
    }

    @Test
    public void testSetUserId() {
        int userId = 14;
        dataEntry.setUserId(userId);

        assertEquals(userId, dataEntry.getUserId());
    }
}
	
