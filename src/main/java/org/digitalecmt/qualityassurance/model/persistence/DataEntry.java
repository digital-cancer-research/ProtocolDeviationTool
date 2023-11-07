package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "data_entry")
public class DataEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id", columnDefinition = "serial")
    private int entryId;

    @Column(name = "study_id", nullable = false)
    private String studyId;

    @Column(name = "site_id", nullable = false)
    private String siteId;

    @Column(name = "dvspondes_id")
    private Integer dvspondesId;

    @Column(name = "usubjid")
    private String usubjid;

    @Column(name = "dventc")
    private String dventc;

    @Column(name = "dventcviz")
    private String dventcviz;

    @Column(name = "dvsponsev")
    private String dvsponsev;

    @Column(name = "impor")
    private int impor;

    @Column(name = "at")
    private String at;

    @Column(name = "at_date")
    private Date atDate;

    @Column(name = "domain")
    private String domain;

    @Column(name = "dvseq")
    private int dvseq;

    @Column(name = "dvrefid")
    private int dvrefid;

    @Column(name = "dvendtc")
    private Date dvendtc;

    @Column(name = "dvcatid")
    private int dvcatid;

    @Column(name = "dvdecodid")
    private int dvdecodid;

    @Column(name = "adv")
    private String adv;

    @Column(name = "nonadv")
    private String nonadv;

    @Column(name = "dvs_cat")
    private String dvsCat;

    @Column(name = "dvstdtc")
    private Date dvstdtc;

    @Column(name = "user_id")
    private int userId;
    
    @Column(name = "category_id")
    private Integer categoryId;

    // Getters and Setters

    public int getEntryId() {
        return entryId;
    }

    public void setEntryId(int entryId) {
        this.entryId = entryId;
    }

    public String getStudyId() {
        return studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public Integer getDvspondesId() {
        return dvspondesId;
    }

    public void setDvspondesId(Integer dvspondesId) {
        this.dvspondesId = dvspondesId;
    }

    public String getUsubjid() {
        return usubjid;
    }

    public void setUsubjid(String usubjid) {
        this.usubjid = usubjid;
    }

    public String getDventc() {
        return dventc;
    }

    public void setDventc(String dventc) {
        this.dventc = dventc;
    }

    public String getDventcviz() {
        return dventcviz;
    }

    public void setDventcviz(String dventcviz) {
        this.dventcviz = dventcviz;
    }

    public String getDvsponsev() {
        return dvsponsev;
    }

    public void setDvsponsev(String dvsponsev) {
        this.dvsponsev = dvsponsev;
    }

    public int getImpor() {
        return impor;
    }

    public void setImpor(int impor) {
        this.impor = impor;
    }

    public String getAt() {
        return at;
    }

    public void setAt(String at) {
        this.at = at;
    }

    public Date getAtDate() {
        return atDate;
    }

    public void setAtDate(Date atDate) {
        this.atDate = atDate;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public int getDvseq() {
        return dvseq;
    }

    public void setDvseq(int dvseq) {
        this.dvseq = dvseq;
    }

    public int getDvrefid() {
        return dvrefid;
    }

    public void setDvrefid(int dvrefid) {
        this.dvrefid = dvrefid;
    }

    public Date getDvendtc() {
        return dvendtc;
    }

    public void setDvendtc(Date dvendtc) {
        this.dvendtc = dvendtc;
    }

    public int getDvcatid() {
        return dvcatid;
    }

    public void setDvcatid(int dvcatid) {
        this.dvcatid = dvcatid;
    }

    public int getDvdecodid() {
        return dvdecodid;
    }

    public void setDvdecodid(int dvdecodid) {
        this.dvdecodid = dvdecodid;
    }

    public String getAdv() {
        return adv;
    }

    public void setAdv(String adv) {
        this.adv = adv;
    }

    public String getNonadv() {
        return nonadv;
    }

    public void setNonadv(String nonadv) {
        this.nonadv = nonadv;
    }

    public String getDvsCat() {
        return dvsCat;
    }

    public void setDvsCat(String dvsCat) {
        this.dvsCat = dvsCat;
    }

    public Date getDvstdtc() {
        return dvstdtc;
    }

    public void setDvstdtc(Date dvstdtc) {
        this.dvstdtc = dvstdtc;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
}

