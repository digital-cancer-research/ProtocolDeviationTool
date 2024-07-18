PRAGMA foreign_keys = ON;

CREATE TABLE role (
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL
);

CREATE TABLE team (
  team_id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_name TEXT NOT NULL,
  user_id INTEGER,
  date_created TEXT,
  FOREIGN KEY (user_id) REFERENCES user_account (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_account (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  role_id INTEGER,
  is_site BOOLEAN,
  is_sponsor BOOLEAN,
  date_created TEXT,
  FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE audit_trail (
  audit_trail_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  entity_changed TEXT,
  attribute_changed TEXT,
  change_from TEXT,
  change_to TEXT,
  date_time_edited TEXT,
  FOREIGN KEY (user_id) REFERENCES user_account (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_team (
  user_team_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  team_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES user_account (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE team_study_access (
  team_study_access_id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER,
  study_id TEXT,
  FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_study_access (
  user_study_access_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  study_id TEXT,
  FOREIGN KEY (user_id) REFERENCES user_account (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE data_entry (
  entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
  study_id TEXT NOT NULL,
  site_id TEXT NOT NULL,
  dvspondes_id INTEGER,
  usubjid TEXT,
  dventc TEXT,
  dventcviz TEXT,
  dvsponsev TEXT,
  impor INTEGER,
  at TEXT,
  at_date TIMESTAMP,
  domain TEXT,
  dvseq INTEGER,
  dvrefid INTEGER,
  dvendtc TIMESTAMP,
  dvcatid INTEGER,
  dvdecodid INTEGER,
  adv TEXT,
  nonadv TEXT,
  dvs_cat TEXT,
  dvstdtc TIMESTAMP,
  user_id INTEGER,
  is_edited BOOL,
  FOREIGN KEY (dvspondes_id) REFERENCES dvspondes (dvspondes_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE dvspondes (
  dvspondes_id INTEGER PRIMARY KEY AUTOINCREMENT,
  dvspondes_value TEXT NOT NULL
);

CREATE TABLE data_entry_category (
  data_entry_category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  entry_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES pd_category (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(entry_id) REFERENCES data_entry(entry_id) ON DELETE CASCADE
);

CREATE TABLE pd_category (
  category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  dvcat TEXT NOT NULL,
  dvdecod TEXT NOT NULL,
  dvterm TEXT NOT NULL
);

CREATE TABLE files (
  file_id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT,
  username TEXT,
  date_time_uploaded TEXT
);
  
  
CREATE TABLE file_data (
  file_data_id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_id INTEGER,
  entry_id INTEGER,
  FOREIGN KEY(file_id) REFERENCES files(file_id) ON DELETE CASCADE,
  FOREIGN KEY(entry_id) REFERENCES data_entry(entry_id) ON DELETE CASCADE
);

CREATE TABLE category_edit_audit (
  category_edit_audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  entry_id INTEGER,
  change_from TEXT,
  change_to TEXT,
  username TEXT,
  date_time_edited TEXT,
  FOREIGN KEY(username) REFERENCES user_account(username) ON DELETE CASCADE,
  FOREIGN KEY(entry_id) REFERENCES data_entry(entry_id) ON DELETE CASCADE
);

CREATE TABLE current_sites (
  site_id TEXT PRIMARY KEY
);

CREATE TABLE site_id_colour (
  site_id VARCHAR UNIQUE,
  colour VARCHAR(7)
);

CREATE TABLE study_id_colour (
  study_id VARCHAR UNIQUE,
  colour VARCHAR(7)
);

CREATE TABLE usubjid_colour (
  usubjid VARCHAR UNIQUE,
  colour VARCHAR(7)
);

CREATE TABLE dvcat_colour (
  dvcat VARCHAR UNIQUE,
  colour VARCHAR(7)
);

CREATE TABLE dvdecod_colour (
  dvdecod VARCHAR UNIQUE,
  colour VARCHAR(7)
);

CREATE TABLE dvterm_colour (
  dvterm VARCHAR UNIQUE,
  colour VARCHAR(7)
);


CREATE TABLE files_seq (next_val INTEGER);
INSERT INTO files_seq (next_val) VALUES (1);

CREATE TABLE file_data_seq (next_val INTEGER);
INSERT INTO file_data_seq (next_val) VALUES (1);

CREATE TABLE data_entry_seq (next_val INTEGER);
INSERT INTO data_entry_seq (next_val) VALUES (1);

CREATE TABLE dvspondes_seq (next_val INTEGER);
INSERT INTO dvspondes_seq (next_val) VALUES (1);

CREATE TABLE user_account_seq (next_val INTEGER);
INSERT INTO user_account_seq (next_val) VALUES (9);

CREATE TABLE category_edit_audit_seq (next_val INTEGER);
INSERT INTO category_edit_audit_seq (next_val) VALUES (1);

CREATE TABLE audit_trail_seq (next_val INTEGER);
INSERT INTO audit_trail_seq (next_val) VALUES (1);



-- Insert roles
INSERT INTO role (role_name) VALUES
  ('Admin'),
  ('User');

-- Insert users with roles
INSERT INTO user_account (username, role_id, is_site, is_sponsor) VALUES
  ('AdminWithAllRoles', 1, 1, 1),
  ('AdminWithSiteRole', 1, 1, 0),
  ('AdminWithSponsorRole', 1, 0, 1),
  ('AdminWithNoSpecialRoles', 1, 0, 0),
  ('UserWithAllRoles', 2, 1, 1),
  ('UserWithSiteRole', 2, 1, 0),
  ('UserWithSponsorRole', 2, 0, 1),
  ('UserWithNoSpecialRoles', 2, 0, 0);

-- Insert category data
INSERT INTO pd_category (dvcat, dvdecod, dvterm)
VALUES
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - PK COLLECTION', 'Protocol deviation where the subject''s PK sample was collected out of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - TREATMENT ADMINISTRATION', 'Protocol deviation where the subject was administered treatment outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - BIOMARKER COLLECTION OR EXPLORATORY ASSESSMENT', 'Protocol deviation where the subject''s biomarker sample collection or exploratory assessment was conducted outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - EFFICACY ASSESSMENT', 'Protocol deviation where the subject''s efficacy assessment was conducted outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - ECG', 'Protocol deviation where the subject''s ECG safety assessment was conducted outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - VITAL SIGNS', 'Protocol deviation where the subject''s vital signs assessment was conducted outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - BLOODS LOCAL', 'Protocol deviation where the subject''s local blood assessment was conducted outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - BLOODS CENTRAL', 'Protocol deviation where the subject''s central blood assessment was conducted outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OUT OF WINDOW - OTHER', 'Protocol deviation where the subject''s assessment was conducted outside of the protocol-specified time window'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT - PK COLLECTION', 'Protocol deviation where the subject''s PK collection assessment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT - TREATMENT ADMINISTRATION', 'Protocol deviation where the subject''s PK treatment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT - BIOMARKER COLLECTION OR EXPLORATORY ASSESSMENT', 'Protocol deviation where the subject''s BIOMARKER COLLECTION OR EXPLORATORY assessment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT - EFFICACY ASSESSMENT', 'Protocol deviation where the subject''s EFFICACY ASSESSMENT was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT - ECG', 'Protocol deviation where the subject''s ECG safety assessment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT- VITAL SIGNS', 'Protocol deviation where the subject''s Vital Signs assessment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT - BLOODS LOCAL', 'Protocol deviation where the subject''s local bloods assessment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESMENT - BLOODS CENTRAL', 'Protocol deviation where the subject''s central bloods assessment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'MISSED ASSESSMENT - OTHER', 'Protocol deviation where the subject''s protocol-specified study assessment was not performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'ASSESSMENT NOT PROPERLY PERFORMED', 'Protocol deviation where the subject''s protocol-specified study assessment was not properly performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'ASSESSMENT PERFORMED OUT OF ORDER', 'Protocol deviation where one or more of the subject''s protocol-specified study assessments were performed out of order'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'INCOMPLETE ASSESSMENT', 'Protocol deviation where the subject''s protocol-specified study assessment was not completely performed'),
  ('ASSESSMENT OR TIME POINT COMPLETION', 'OTHER ASSESSMENT OR TIME POINT WINDOW', 'Any other protocol deviation associated with a protocol-specified assessment or time point window'),
  ('ELIGIBILITY CRITERIA NOT MET', 'ELIGIBILITY CRITERIA NOT MET', 'Eligibility criteria not met'),
  ('EXCLUDED MEDICATION, VACCINE OR DEVICE', 'MEDICATION, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED', 'Protocol Deviation where the subject used a medication excluded by the protocol.'),
  ('EXCLUDED MEDICATION, VACCINE OR DEVICE', 'VACCINE, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED', 'Protocol Deviation where the subject was administered a vaccine excluded by the protocol.'),
  ('EXCLUDED MEDICATION, VACCINE OR DEVICE', 'DEVICE, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED', 'Protocol Deviation where the subject used a medical device excluded by the protocol.'),
  ('EXCLUDED MEDICATION, VACCINE OR DEVICE', 'OTHER EXCLUDED MEDICATION, VACCINE OR DEVICE DEVIATION', 'Protocol Deviation where the subject used any other medication, vaccine or device excluded by the protocol.'),
  ('FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL', 'SAE NOT REPORTED WITHIN THE EXPECTED TIME FRAME', 'A protocol deviation where a serious adverse event is not reported within the protocol-specified timeframe.'),
  ('FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL', 'AES OF SPECIAL INTEREST', 'Protocol deviation where a protocol defined adverse event of special interest was not reported per protocol.'),
  ('FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL', 'FAILURE TO CONFIRM CAUSALITY ASSESSMENT WITHIN THE EXPECTED TIME FRAME', 'A protocol deviation where causality assessment was not completed within the protocol-specified timeframe'),
  ('FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL', 'LIVER FUNCTION ABNORMALITIES PER PROTOCOL', 'A protocol deviation where a liver function abnormality was not reported per protocol.'),
  ('FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL', 'PREGNANCY', 'A protocol deviation where a pregnancy was not reported per protocol.'),
  ('FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL', 'OTHER', 'Any other protocol deviation associated with the failure to report safety events per protocol.'),
  ('INFORMED CONSENT', 'INFORMED CONSENT/ASSENT NOT SIGNED AND/OR DATED BY SUBJECT (PARENT/LEGAL REPRESENTATIVE, IF APPLICABLE)', 'Protocol deviation where the subject''s informed consent/assent was not signed and/or dated by the subject (parent/legal representative, if applicable)'),
  ('INFORMED CONSENT', 'INFORMED CONSENT/ASSENT NOT SIGNED AND/OR DATED BY APPROPRIATE SITE STAFF', 'Protocol deviation where the subject''s informed consent/assent was not signed and/or dated by appropriate site staff'),
  ('INFORMED CONSENT', 'INFORMED CONSENT/ASSENT NOT SIGNED PRIOR TO ANY STUDY PROCEDURE', 'Protocol deviation where the subject''s informed consent/assent was not signed prior to any study procedure'),
  ('INFORMED CONSENT', 'SIGNED INFORMED CONSENT/ASSENT NOT AVAILABLE ON SITE', 'Protocol deviation where the subject''s signed informed consent/assent was not available at the study site'),
  ('INFORMED CONSENT', 'WRONG INFORMED CONSENT/ASSENT VERSION SIGNED', 'Protocol deviation where the subject signed the wrong informed consent/assent version'),
  ('INFORMED CONSENT', 'OTHER INFORMED CONSENT/ASSENT DEVIATION', 'Any other protocol deviation related to the subject''s informed consent/assent'),
  ('NOT WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA', 'NOT DISCONTINUED FROM STUDY TREATMENT', 'Protocol Deviation where a subject was not discontinued from study treatment after meeting requirement of the withdrawal criteria'),
  ('NOT WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA', 'NOT WITHDRAWN FROM STUDY', 'Protocol Deviation where a subject was not withdrawn from the study after meeting requirement of the withdrawal criteria'),
  ('NOT WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA', 'OTHER DEVIATION OF NOT BEING WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA', 'Any other Protocol Deviation where a subject was not withdrawn from the study after meeting requirement of the withdrawal criteria'),
  ('STUDY PROCEDURE', 'ACTIVITY LEVEL ABOVE PROTOCOL SPECIFICATION', 'A protocol deviation where activity level was above protocol specification'),
  ('STUDY PROCEDURE', 'BIOLOGICAL SAMPLE SPECIMEN PROCEDURE', 'A protocol deviation in the protocol-specified biological sample specimen procedures.'),
  ('STUDY PROCEDURE', 'DECLINED PARTICIPATION IN STUDY PROCEDURE', 'A protocol deviation where subject declined participation in study procedure'),
  ('STUDY PROCEDURE', 'DIARY PROCEDURE', 'A protocol deviation in the protocol-specified diary procedures.'),
  ('STUDY PROCEDURE', 'DISCONTINUED PARTICIPATION IN STUDY PROCEDURE', 'A protocol deviation where subject discontinued participation in study procedure'),
  ('STUDY PROCEDURE', 'EQUIPMENT PROCEDURE', 'A protocol deviation in the protocol-specified equipment procedures.'),
  ('STUDY PROCEDURE', 'NON STUDY TREATMENT SUPPLY PROCEDURE', 'A protocol deviation in the protocol-specified non study treatment supply procedures.'),
  ('STUDY PROCEDURE', 'NONCOMPLIANCE WITH STUDY PROCEDURE', 'A protocol deviation where subject was not in compliance with at least one study procedure'),
  ('STUDY PROCEDURE', 'POST STUDY TREATMENT OBSERVATION NOT DONE', 'A protocol deviation where the protocol-specified post study treatment observation was not done.'),
  ('STUDY PROCEDURE', 'RANDOMIZATION PROCEDURE (E.G. SUBJECT ASSIGNED TO WRONG STRATUM, SUBJECT RANDOMIZED OUT OF ORDER)', 'A protocol deviation in the randomization procedure (e.g., subject assigned to wrong stratum, subject randomized out of order).'),
  ('STUDY PROCEDURE', 'STUDY BLINDING/UNBLINDING PROCEDURE', 'A protocol deviation in any protocol-specified study blinding or unblinding  procedure.'),
  ('STUDY PROCEDURE', 'OTHER DEVIATION FROM STUDY PROCEDURE', 'A protocol deviation in any other protocol-specified study procedure.'),
  ('VISIT COMPLETION', 'MISSED VISIT/PHONE CONTACT', 'Protocol deviation where the subject''s protocol-specified visit or phone contact was missed'),
  ('VISIT COMPLETION', 'OUT OF WINDOW - VISIT/PHONE CONTACT', 'Protocol deviation where the subject''s protocol-specified visit or phone contact was conducted outside of the time window specified in the protocol'),
  ('VISIT COMPLETION', 'OTHER VISIT WINDOW DEVIATION', 'Any other protocol deviation associated with a protocol-specified visit window'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'EXPIRED STUDY TREATMENT ADMINISTERED', 'Protocol Deviation where a subject was administered expired study treatment'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'STUDY TREATMENT ADMINISTERED WHILE CONTRAINDICATION', 'Protocol Deviation where a subject was administered study treatment even though there was a contraindication to receiving the study treatment.'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'STUDY TREATMENT NOT ADMINISTERED PER PROTOCOL', 'Protocol Deviation where a subject was not administered study treatment per protocol requirements.'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'STUDY TREATMENT NOT AVAILABLE AT SITE FOR ADMINISTRATION', 'Protocol Deviation where the study treatment was not available on site for administration to the subject.'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'STUDY TREATMENT NOT PREPARED AS PER PROTOCOL (E.G. RECONSTITUTION)', 'Protocol Deviation where the study treatment was not prepared following the directions in the protocol.'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'USE OF STUDY TREATMENT IMPACTED BY TEMPERATURE EXCURSION - NOT REPORTED/APPROVED/DISAPPROVED FOR FURTHER USE', 'Protocol Deviation where study medication was used even though the study treatment was maintained outside the temperature range allowed by the protocol.'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'WRONG STUDY TREATMENT OR ASSIGNMENT ADMINISTERED', 'Protocol Deviation where the wrong study treatment was administered to the subject.'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'OTHER DEVIATION RELATED TO WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', 'Any other Protocol Deviation where a subject was administered the wrong study treatment, wrong study treatment administration and/or wrong dose.'),
  ('SITE LEVEL ERROR', 'ERRORS IN DELEGATION LOG COMPLETION', 'Protocol deviation due to error in delegation log completion'),
  ('SITE LEVEL ERROR', 'ERRORS IN SITE FILE COMPLETION', 'Protocol deviation due to error in site file completion'),
  ('SITE LEVEL ERROR', 'ERRORS IN DOCUMENTATION FOR TRAINING', 'Protocol deviation due to other errors with documentation for training'),
  ('SITE LEVEL ERROR', 'OTHER SITE LEVEL DOCUMENTATION ERRORS', 'Protocol deviation due to other site level documentation errors');
  

 -- Insert dvcat colours
INSERT INTO dvcat_colour (dvcat, colour)
VALUES
  ('ASSESSMENT OR TIME POINT COMPLETION', '#FF5733'),
  ('ELIGIBILITY CRITERIA NOT MET', '#33FF57'),
  ('EXCLUDED MEDICATION, VACCINE OR DEVICE', '#5733FF'),
  ('FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL', '#FFA500'),
  ('INFORMED CONSENT', '#800080'),
  ('NOT WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA', '#FFFF00'),
  ('STUDY PROCEDURE', '#008080'),
  ('VISIT COMPLETION', '#FF00FF'),
  ('WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', '#0000FF'),
  ('SITE LEVEL ERROR', '#FFD700');

 -- Insert dvdecod colours
INSERT INTO dvdecod_colour (dvdecod, colour)
VALUES
  ('OUT OF WINDOW - PK COLLECTION', '#4285F4'),
  ('OUT OF WINDOW - TREATMENT ADMINISTRATION', '#0F9D58'),
  ('OUT OF WINDOW - BIOMARKER COLLECTION OR EXPLORATORY ASSESSMENT', '#F4B400'),
  ('OUT OF WINDOW - EFFICACY ASSESSMENT', '#DB4437'),
  ('OUT OF WINDOW - ECG', '#3F51B5'),
  ('OUT OF WINDOW - VITAL SIGNS', '#E91E63'),
  ('OUT OF WINDOW - BLOODS LOCAL', '#9C27B0'),
  ('OUT OF WINDOW - BLOODS CENTRAL', '#673AB7'),
  ('OUT OF WINDOW - OTHER', '#3F51B5'),
  ('MISSED ASSESMENT - PK COLLECTION', '#2196F3'),
  ('MISSED ASSESMENT - TREATMENT ADMINISTRATION', '#03A9F4'),
  ('MISSED ASSESMENT - BIOMARKER COLLECTION OR EXPLORATORY ASSESSMENT', '#00BCD4'),
  ('MISSED ASSESMENT - EFFICACY ASSESSMENT', '#009688'),
  ('MISSED ASSESMENT - ECG', '#4CAF50'),
  ('MISSED ASSESMENT- VITAL SIGNS', '#8BC34A'),
  ('MISSED ASSESMENT - BLOODS LOCAL', '#CDDC39'),
  ('MISSED ASSESMENT - BLOODS CENTRAL', '#FFEB3B'),
  ('MISSED ASSESSMENT - OTHER', '#FFC107'),
  ('ASSESSMENT NOT PROPERLY PERFORMED', '#FF9800'),
  ('ASSESSMENT PERFORMED OUT OF ORDER', '#FF5722'),
  ('INCOMPLETE ASSESSMENT', '#795548'),
  ('OTHER ASSESSMENT OR TIME POINT WINDOW', '#607D8B'),
  ('ELIGIBILITY CRITERIA NOT MET', '#F44336'),
  ('MEDICATION, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED', '#E91E63'),
  ('VACCINE, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED', '#9C27B0'),
  ('DEVICE, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED', '#673AB7'),
  ('OTHER EXCLUDED MEDICATION, VACCINE OR DEVICE DEVIATION', '#3F51B5'),
  ('SAE NOT REPORTED WITHIN THE EXPECTED TIME FRAME', '#2196F3'),
  ('AES OF SPECIAL INTEREST', '#03A9F4'),
  ('FAILURE TO CONFIRM CAUSALITY ASSESSMENT WITHIN THE EXPECTED TIME FRAME', '#00BCD4'),
  ('LIVER FUNCTION ABNORMALITIES PER PROTOCOL', '#009688'),
  ('PREGNANCY', '#4CAF50'),
  ('OTHER', '#8BC34A'),
  ('INFORMED CONSENT/ASSENT NOT SIGNED AND/OR DATED BY SUBJECT (PARENT/LEGAL REPRESENTATIVE, IF APPLICABLE)', '#CDDC39'),
  ('INFORMED CONSENT/ASSENT NOT SIGNED AND/OR DATED BY APPROPRIATE SITE STAFF', '#FFEB3B'),
  ('INFORMED CONSENT/ASSENT NOT SIGNED PRIOR TO ANY STUDY PROCEDURE', '#FFC107'),
  ('SIGNED INFORMED CONSENT/ASSENT NOT AVAILABLE ON SITE', '#FF9800'),
  ('WRONG INFORMED CONSENT/ASSENT VERSION SIGNED', '#FF5722'),
  ('OTHER INFORMED CONSENT/ASSENT DEVIATION', '#795548'),
  ('NOT DISCONTINUED FROM STUDY TREATMENT', '#607D8B'),
  ('NOT WITHDRAWN FROM STUDY', '#F44336'),
  ('OTHER DEVIATION OF NOT BEING WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA', '#E91E63'),
  ('ACTIVITY LEVEL ABOVE PROTOCOL SPECIFICATION', '#9C27B0'),
  ('BIOLOGICAL SAMPLE SPECIMEN PROCEDURE', '#673AB7'),
  ('DECLINED PARTICIPATION IN STUDY PROCEDURE', '#3F51B5'),
  ('DIARY PROCEDURE', '#2196F3'),
  ('DISCONTINUED PARTICIPATION IN STUDY PROCEDURE', '#03A9F4'),
  ('EQUIPMENT PROCEDURE', '#00BCD4'),
  ('NON STUDY TREATMENT SUPPLY PROCEDURE', '#009688'),
  ('NONCOMPLIANCE WITH STUDY PROCEDURE', '#4CAF50'),
  ('POST STUDY TREATMENT OBSERVATION NOT DONE', '#8BC34A'),
  ('RANDOMIZATION PROCEDURE (E.G. SUBJECT ASSIGNED TO WRONG STRATUM, SUBJECT RANDOMIZED OUT OF ORDER)', '#CDDC39'),
  ('STUDY BLINDING/UNBLINDING PROCEDURE', '#FFEB3B'),
  ('OTHER DEVIATION FROM STUDY PROCEDURE', '#FFC107'),
  ('MISSED VISIT/PHONE CONTACT', '#FF9800'),
  ('OUT OF WINDOW - VISIT/PHONE CONTACT', '#FF5722'),
  ('OTHER VISIT WINDOW DEVIATION', '#795548'),
  ('EXPIRED STUDY TREATMENT ADMINISTERED', '#607D8B'),
  ('STUDY TREATMENT ADMINISTERED WHILE CONTRAINDICATION', '#F44336'),
  ('STUDY TREATMENT NOT ADMINISTERED PER PROTOCOL', '#E91E63'),
  ('STUDY TREATMENT NOT AVAILABLE AT SITE FOR ADMINISTRATION', '#9C27B0'),
  ('STUDY TREATMENT NOT PREPARED AS PER PROTOCOL (E.G. RECONSTITUTION)', '#673AB7'),
  ('USE OF STUDY TREATMENT IMPACTED BY TEMPERATURE EXCURSION - NOT REPORTED/APPROVED/DISAPPROVED FOR FURTHER USE', '#3F51B5'),
  ('WRONG STUDY TREATMENT OR ASSIGNMENT ADMINISTERED', '#2196F3'),
  ('OTHER DEVIATION RELATED TO WRONG STUDY TREATMENT/ADMINISTRATION/DOSE', '#03A9F4'),
  ('ERRORS IN DELEGATION LOG COMPLETION', '#00BCD4'),
  ('ERRORS IN SITE FILE COMPLETION', '#009688'),
  ('ERRORS IN DOCUMENTATION FOR TRAINING', '#4CAF50'),
  ('OTHER SITE LEVEL DOCUMENTATION ERRORS', '#8BC34A');

 -- Insert dvterm colours
INSERT INTO dvterm_colour (dvterm, colour)
VALUES
  ('Protocol deviation where the subject''s PK sample was collected out of the protocol-specified time window', '#4285F4'),
  ('Protocol deviation where the subject was administered treatment outside of the protocol-specified time window', '#0F9D58'),
  ('Protocol deviation where the subject''s biomarker sample collection or exploratory assessment was conducted outside of the protocol-specified time window', '#F4B400'),
  ('Protocol deviation where the subject''s efficacy assessment was conducted outside of the protocol-specified time window', '#DB4437'),
  ('Protocol deviation where the subject''s ECG safety assessment was conducted outside of the protocol-specified time window', '#3F51B5'),
  ('Protocol deviation where the subject''s vital signs assessment was conducted outside of the protocol-specified time window', '#E91E63'),
  ('Protocol deviation where the subject''s local blood assessment was conducted outside of the protocol-specified time window', '#9C27B0'),
  ('Protocol deviation where the subject''s central blood assessment was conducted outside of the protocol-specified time window', '#673AB7'),
  ('Protocol deviation where the subject''s assessment was conducted outside of the protocol-specified time window', '#3F51B5'),
  ('Protocol deviation where the subject''s PK collection assessment was not performed', '#2196F3'),
  ('Protocol deviation where the subject''s PK treatment was not performed', '#03A9F4'),
  ('Protocol deviation where the subject''s BIOMARKER COLLECTION OR EXPLORATORY assessment was not performed', '#00BCD4'),
  ('Protocol deviation where the subject''s EFFICACY ASSESSMENT was not performed', '#009688'),
  ('Protocol deviation where the subject''s ECG safety assessment was not performed', '#4CAF50'),
  ('Protocol deviation where the subject''s Vital Signs assessment was not performed', '#8BC34A'),
  ('Protocol deviation where the subject''s local bloods assessment was not performed', '#CDDC39'),
  ('Protocol deviation where the subject''s central bloods assessment was not performed', '#FFEB3B'),
  ('Protocol deviation where the subject''s protocol-specified study assessment was not performed', '#FFC107'),
  ('Protocol deviation where the subject''s protocol-specified study assessment was not properly performed', '#FF9800'),
  ('Protocol deviation where one or more of the subject''s protocol-specified study assessments were performed out of order', '#FF5722'),
  ('Protocol deviation where the subject''s protocol-specified study assessment was not completely performed', '#795548'),
  ('Any other protocol deviation associated with a protocol-specified assessment or time point window', '#607D8B'),
  ('Eligibility criteria not met', '#F44336'),
  ('Protocol Deviation where the subject used a medication excluded by the protocol.', '#E91E63'),
  ('Protocol Deviation where the subject was administered a vaccine excluded by the protocol.', '#9C27B0'),
  ('Protocol Deviation where the subject used a medical device excluded by the protocol.', '#673AB7'),
  ('Protocol Deviation where the subject used any other medication, vaccine or device excluded by the protocol.', '#3F51B5'),
  ('A protocol deviation where a serious adverse event is not reported within the protocol-specified timeframe.', '#2196F3'),
  ('Protocol deviation where a protocol defined adverse event of special interest was not reported per protocol.', '#03A9F4'),
  ('A protocol deviation where causality assessment was not completed within the protocol-specified timeframe.', '#00BCD4'),
  ('A protocol deviation where a liver function abnormality was not reported per protocol.', '#009688'),
  ('A protocol deviation where a pregnancy was not reported per protocol.', '#4CAF50'),
  ('Any other protocol deviation associated with the failure to report safety events per protocol.', '#8BC34A'),
  ('Protocol deviation where the subject''s informed consent/assent was not signed and/or dated by the subject (parent/legal representative, if applicable).', '#CDDC39'),
  ('Protocol deviation where the subject''s informed consent/assent was not signed and/or dated by appropriate site staff.', '#FFEB3B'),
  ('Protocol deviation where the subject''s informed consent/assent was not signed prior to any study procedure.', '#FFC107'),
  ('Protocol deviation where the subject''s signed informed consent/assent was not available at the study site.', '#FF9800'),
  ('Protocol deviation where the subject signed the wrong informed consent/assent version.', '#FF5722'),
  ('Any other protocol deviation related to the subject''s informed consent/assent.', '#795548'),
  ('Protocol Deviation where a subject was not discontinued from study treatment after meeting requirement of the withdrawal criteria.', '#607D8B'),
  ('Protocol Deviation where a subject was not withdrawn from the study after meeting requirement of the withdrawal criteria.', '#F44336'),
  ('Any other Protocol Deviation where a subject was not withdrawn from the study after meeting requirement of the withdrawal criteria.', '#E91E63'),
  ('Protocol Deviation where activity level was above protocol specification', '#9C27B0'),
  ('Protocol Deviation in the protocol-specified biological sample specimen procedures', '#673AB7'),
  ('Protocol Deviation where subject declined participation in study procedure', '#3F51B5'),
  ('Protocol Deviation in the protocol-specified diary procedures', '#2196F3'),
  ('Protocol Deviation where subject discontinued participation in study procedure', '#03A9F4'),
  ('Protocol Deviation in the protocol-specified equipment procedures', '#00BCD4'),
  ('Protocol Deviation in the protocol-specified non study treatment supply procedures', '#009688'),
  ('Protocol Deviation where subject was not in compliance with at least one study procedure', '#4CAF50'),
  ('Protocol Deviation where the protocol-specified post study treatment observation was not done', '#8BC34A'),
  ('Protocol Deviation in the randomization procedure (e.g., subject assigned to wrong stratum, subject randomized out of order)', '#CDDC39'),
  ('Protocol Deviation in any protocol-specified study blinding or unblinding procedure', '#FFEB3B'),
  ('Protocol Deviation in any other protocol-specified study procedure', '#FFC107'),
  ('Protocol deviation where the subject''s protocol-specified visit or phone contact was missed', '#FF9800'),
  ('Protocol deviation where the subject''s protocol-specified visit or phone contact was conducted outside of the time window specified in the protocol', '#FF5722'),
  ('Any other protocol deviation associated with a protocol-specified visit window', '#795548'),
  ('Protocol Deviation where a subject was administered expired study treatment', '#607D8B'),
  ('Protocol Deviation where a subject was administered study treatment even though there was a contraindication to receiving the study treatment', '#F44336'),
  ('Protocol Deviation where a subject was not administered study treatment per protocol requirements', '#E91E63'),
  ('Protocol Deviation where the study treatment was not available on site for administration to the subject', '#9C27B0'),
  ('Protocol Deviation where the study treatment was not prepared following the directions in the protocol', '#673AB7'),
  ('Protocol Deviation where study medication was used even though the study treatment was maintained outside the temperature range allowed by the protocol', '#3F51B5'),
  ('Protocol Deviation where the wrong study treatment was administered to the subject', '#2196F3'),
  ('Any other Protocol Deviation where a subject was administered the wrong study treatment, wrong study treatment administration and/or wrong dose', '#03A9F4'),
  ('Protocol deviation due to error in delegation log completion', '#00BCD4'),
  ('Protocol deviation due to error in site file completion', '#009688'),
  ('Protocol deviation due to other errors with documentation for training', '#4CAF50'),
  ('Protocol deviation due to other site level documentation errors', '#8BC34A');
